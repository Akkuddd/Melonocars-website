# Melono Cars Website

A modern HTML website for Melono Cars - a pre-owned quality cars and bikes dealership.

## Features

- **Homepage**: Hero section with featured vehicles and company highlights
- **Browse Vehicles**: Browse and filter through available vehicles (cars/bikes, price range)
- **Sell Your Vehicle**: Submit your vehicle for sale with multiple photo uploads
- **About Us**: Learn about Melono Cars mission, values, and services
- **Contact**: Contact form and business information
- **AI Chatbot**: 24/7 AI-powered customer support using OpenAI API
- **Black & White Theme**: Elegant monochrome design

## Technology Stack

- **Frontend**: Plain HTML, CSS, and JavaScript
- **Backend**: Express.js (Node.js)
- **AI Chatbot**: OpenAI API
- **File Upload**: Multer
- **Styling**: Custom CSS with black/white theme

## Getting Started

### Prerequisites

- Node.js 14+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory:
```
OPENAI_API_KEY=your_openai_api_key_here
PORT=3000
```

3. Create necessary directories:
```bash
mkdir -p public/uploads
mkdir -p data
```

4. Start the server:
```bash
npm start
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── index.html          # Homepage
├── browse.html         # Browse vehicles page
├── sell.html           # Sell vehicle page
├── about.html          # About us page
├── contact.html        # Contact page
├── styles.css          # All CSS styling
├── script.js           # Chatbot JavaScript
├── server.js           # Express.js backend server
├── package.json        # Dependencies
├── public/
│   └── uploads/        # Vehicle photo uploads
└── data/
    └── vehicles.json   # Vehicle data storage
```

## API Endpoints

- `POST /api/chat` - AI chatbot endpoint
- `GET /api/vehicles` - Get all vehicles (with filters)
- `GET /api/vehicles/:id` - Get single vehicle
- `POST /api/vehicles` - Add new vehicle with photos
- `POST /api/upload` - Upload photos

## Usage

### Adding a Vehicle

1. Navigate to the "Sell Your Vehicle" page
2. Fill in the vehicle details (make, model, year, price, etc.)
3. Upload photos (up to 10 images)
4. Submit the form

### Using the Chatbot

1. Click the chat icon in the bottom-right corner
2. Ask questions about vehicles, pricing, or services
3. The AI assistant will provide helpful responses

## Configuration

- **OpenAI API Key**: Required for chatbot functionality. Get your key from [OpenAI](https://platform.openai.com/)
- **Upload Directory**: Vehicle photos are stored in `public/uploads/`
- **Data Storage**: Vehicles are stored in `data/vehicles.json`

## Building for Production

1. Set environment variables
2. Start the server with `npm start`
3. Configure your web server (nginx, Apache, etc.) to serve static files and proxy API requests

## Notes

- Photo uploads are stored locally in `public/uploads/`
- Vehicle data is stored in JSON format (can be upgraded to a database)
- The AI chatbot requires an OpenAI API key
- All styling follows a black and white color theme
- The website is fully responsive for mobile, tablet, and desktop

## License

Copyright © 2024 Melono Cars. All rights reserved.

