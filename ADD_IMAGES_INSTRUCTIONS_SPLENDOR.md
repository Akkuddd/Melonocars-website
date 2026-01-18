# Instructions to Add Images for Hero Honda Splendor

## Vehicle Added:
- **Make:** Hero Honda
- **Model:** Splendor
- **Year:** 1998
- **Type:** Bike
- **Ownership:** 2
- **Fitness:** Valid Upto 2028
- **Insurance:** Valid Upto 2026
- **Features:** Fully Restored, New Paint, Extra Added (Bar Handle, Mud Guard, Unde Bell), Good Condition, Neat & Clean
- **Contact:** 7034452142 (Call or WhatsApp)

## Image Order (Cover photo is 2nd image):
1. Three-quarter front view (black Splendor with red/white graphics)
2. **COVER PHOTO:** Angled view with front wheel turned (black Splendor with red/white/grey graphics, white bar handle) - **Must be first in photos array**
3. Side view with "FOR SALE" overlay (black Splendor with yellow headlight, red suspension)

## To Add Images:

### Method 1: Save Images and Update JSON
1. Save the 3 images to your computer:
   - `splendor-1-front-quarter.jpg` - Three-quarter front view
   - `splendor-2-cover.jpg` - **Angled view with front wheel turned (COVER PHOTO - must be first!)**
   - `splendor-3-side-sale.jpg` - Side view with FOR SALE overlay

2. Copy these images to `public/uploads/` folder

3. Update `data/vehicles.json` - Find Hero Honda Splendor vehicle (id: 1736285100000) and add photos array. **IMPORTANT: Put the 2nd image (cover photo) FIRST:**
```json
"photos": [
  "splendor-2-cover.jpg",
  "splendor-1-front-quarter.jpg",
  "splendor-3-side-sale.jpg"
]
```

### Method 2: Using Admin Page
1. Go to `http://localhost:3000/admin.html`
2. Upload images with the 2nd image (angled view) uploaded first
3. Or use Instagram URLs if available

## Note:
The vehicle has been added with ID: 1736285100000
The 2nd image (angled view with front wheel turned) must be the FIRST image in the photos array to appear as the cover photo.

**Price:** Please add the price when available - currently set to 0 in the database. You can update it using the admin page or by editing the JSON file directly.

