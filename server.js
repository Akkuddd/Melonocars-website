const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs').promises;
const { OpenAI } = require('openai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));


// Initialize OpenAI
let openai;
if (process.env.OPENAI_API_KEY) {
    openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });
} else {
    console.warn('OPENAI_API_KEY is missing. Chatbot features will be disabled.');
}

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'public', 'uploads');
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error);

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        cb(null, uploadsDir);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        cb(null, uniqueName);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Vehicle data storage (in production, use a database)
const vehiclesFile = path.join(__dirname, 'data', 'vehicles.json');

async function getVehicles() {
    try {
        const data = await fs.readFile(vehiclesFile, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

async function saveVehicles(vehicles) {
    try {
        await fs.mkdir(path.dirname(vehiclesFile), { recursive: true });
        await fs.writeFile(vehiclesFile, JSON.stringify(vehicles, null, 2));
    } catch (error) {
        console.error('Error saving vehicles:', error);
    }
}

// API Routes

// Chat API
app.post('/api/chat', async (req, res) => {
    try {
        const { messages } = req.body;

        if (!messages || !Array.isArray(messages)) {
            return res.status(400).json({ error: 'Invalid messages format' });
        }

        if (!process.env.OPENAI_API_KEY) {
            return res.json({
                message: 'Chat service is not configured. Please set OPENAI_API_KEY in your environment variables.'
            });
        }

        const systemMessage = {
            role: 'system',
            content: 'You are a helpful assistant for Melono Cars, a company that sells pre-owned quality cars and bikes. Help customers with inquiries about vehicles, pricing, buying, selling, and general information about the company. Be friendly, professional, and knowledgeable.'
        };

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [systemMessage, ...messages.map(msg => ({
                role: msg.role,
                content: msg.content
            }))],
            max_tokens: 500
        });

        const reply = response.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
        res.json({ message: reply });
    } catch (error) {
        console.error('Chat API error:', error);
        res.status(500).json({ error: 'Failed to get chat response' });
    }
});

// Get vehicles
app.get('/api/vehicles', async (req, res) => {
    try {
        const { type, minPrice, maxPrice, limit } = req.query;
        let vehicles = await getVehicles();

        // Sort by newest first
        vehicles.sort((a, b) => {
            const dateA = new Date(a.createdAt || 0);
            const dateB = new Date(b.createdAt || 0);
            return dateB - dateA;
        });

        // Apply filters
        if (type) {
            vehicles = vehicles.filter(v => v.type === type);
        }
        if (minPrice) {
            vehicles = vehicles.filter(v => v.price >= parseFloat(minPrice));
        }
        if (maxPrice) {
            vehicles = vehicles.filter(v => v.price <= parseFloat(maxPrice));
        }

        // Apply limit
        if (limit) {
            vehicles = vehicles.slice(0, parseInt(limit));
        }

        res.json(vehicles);
    } catch (error) {
        console.error('Get vehicles error:', error);
        res.status(500).json({ error: 'Failed to fetch vehicles' });
    }
});

// Get single vehicle
app.get('/api/vehicles/:id', async (req, res) => {
    try {
        const vehicles = await getVehicles();
        const vehicle = vehicles.find(v => v.id === req.params.id);

        if (!vehicle) {
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        res.json(vehicle);
    } catch (error) {
        console.error('Get vehicle error:', error);
        res.status(500).json({ error: 'Failed to fetch vehicle' });
    }
});

// Helper function to download image from URL
async function downloadImageFromUrl(url, filename) {
    try {
        const https = require('https');
        const http = require('http');
        const { URL } = require('url');
        const fsSync = require('fs');

        const fileUrl = new URL(url);
        const protocol = fileUrl.protocol === 'https:' ? https : http;

        return new Promise((resolve, reject) => {
            protocol.get(url, (response) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Failed to download image: ${response.statusCode}`));
                    return;
                }

                const filePath = path.join(uploadsDir, filename);
                const fileStream = fsSync.createWriteStream(filePath);

                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve(filename);
                });
                fileStream.on('error', reject);
            }).on('error', reject);
        });
    } catch (error) {
        console.error('Error downloading image:', error);
        throw error;
    }
}

// Add vehicle
app.post('/api/vehicles', upload.array('files', 10), async (req, res) => {
    try {
        const { make, model, year, price, type, condition, mileage, description, imageUrls } = req.body;

        // Get uploaded file names
        let photos = req.files ? req.files.map(file => file.filename) : [];

        // Download images from URLs if provided
        if (imageUrls) {
            try {
                const urls = JSON.parse(imageUrls);
                for (let i = 0; i < urls.length && photos.length < 10; i++) {
                    const url = urls[i];
                    if (url && url.trim()) {
                        try {
                            const filename = `${Date.now()}-${i}-${url.split('/').pop().split('?')[0] || 'image.jpg'}`;
                            await downloadImageFromUrl(url, filename);
                            photos.push(filename);
                        } catch (err) {
                            console.error(`Failed to download image from ${url}:`, err);
                            // Continue with other images
                        }
                    }
                }
            } catch (err) {
                console.error('Error parsing imageUrls:', err);
            }
        }

        const vehicles = await getVehicles();

        const newVehicle = {
            id: Date.now().toString(),
            make,
            model,
            year: parseInt(year),
            price: parseFloat(price),
            type,
            condition,
            mileage: mileage ? parseInt(mileage) : undefined,
            description: description || '',
            photos,
            createdAt: new Date().toISOString()
        };

        vehicles.push(newVehicle);
        await saveVehicles(vehicles);

        res.status(201).json(newVehicle);
    } catch (error) {
        console.error('Add vehicle error:', error);
        res.status(500).json({ error: 'Failed to add vehicle' });
    }
});

// Upload files endpoint (for separate file uploads)
app.post('/api/upload', upload.array('files', 10), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }

        const files = req.files.map(file => file.filename);
        res.json({ files });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ error: 'Failed to upload files' });
    }
});

// Start server
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Make sure to set OPENAI_API_KEY in your .env file for chatbot functionality');
    });
}

module.exports = app;

