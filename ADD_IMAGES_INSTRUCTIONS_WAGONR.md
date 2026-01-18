# Instructions to Add Images for Maruti Suzuki WagonR ZXI AGS

## Vehicle Added:
- **Make:** Maruti Suzuki
- **Model:** WagonR ZXI AGS
- **Year:** 2019
- **Price:** ₹4,60,000 (460000)
- **Mileage:** 1,36,000 km (136000)
- **Transmission:** Automatic (AGS)
- **Fuel:** Petrol
- **Ownership:** 2
- **Color:** Silver
- **Features:** Neat & Clean Interior
- **Contact:** 7034452142 (Call or WhatsApp)

## Image Order (Cover photo is 2nd image):
1. Interior driver's side view
2. **COVER PHOTO:** Front view with "FOR SALE 4,60,000" overlay (silver WagonR facing camera)
3. Side profile view
4. Rear view with "WAGONR" badge
5. Interior dashboard view from rear seat

## To Add Images:

### Method 1: Save Images and Update JSON
1. Save the 5 images to your computer:
   - `wagonr-1-interior-driver.jpg` - Interior driver's side view
   - `wagonr-2-cover.jpg` - **Front view with FOR SALE overlay (COVER PHOTO - must be first in photos array)**
   - `wagonr-3-side.jpg` - Side profile view
   - `wagonr-4-rear.jpg` - Rear view
   - `wagonr-5-interior-dashboard.jpg` - Interior dashboard view

2. Copy these images to `public/uploads/` folder

3. Update `data/vehicles.json` - find WagonR vehicle (id: 1736285000000) and add photos array. **IMPORTANT: Put the 2nd image (cover photo) FIRST:**
```json
"photos": [
  "wagonr-2-cover.jpg",
  "wagonr-1-interior-driver.jpg",
  "wagonr-3-side.jpg",
  "wagonr-4-rear.jpg",
  "wagonr-5-interior-dashboard.jpg"
]
```

### Method 2: Using Admin Page
1. Go to `http://localhost:3000/admin.html`
2. Upload images with the 2nd image (front view with FOR SALE) uploaded first
3. Or use Instagram URLs if available

## Note:
The vehicle has been added with ID: 1736285000000
The 2nd image (front view with "FOR SALE 4,60,000") must be the FIRST image in the photos array to appear as the cover photo.

