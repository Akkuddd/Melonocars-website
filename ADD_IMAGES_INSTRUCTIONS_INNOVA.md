# Instructions to Add Images for Toyota Innova 2.5 G

## Vehicle Added:
- **Make:** Toyota
- **Model:** Innova 2.5 G
- **Year:** 2012
- **Price:** ₹4,99,000 (499000)
- **Transmission:** Manual
- **Fuel:** Diesel
- **Registration:** Valid
- **Features:** Good Condition, 80% Tyre, Neat & Clean Interior
- **Contact:** 7034452142 (Call or WhatsApp)

## Image Order (Cover photo is 2nd image):
1. Rear three-quarter view (white Innova from rear-left side)
2. **COVER PHOTO:** Side profile shot (white Innova full side view) - **Must be first in photos array**
3. Interior passenger side view (low angle, manual gear stick visible)
4. Front view with "FOR SALE 4,99,000" overlay
5. Interior rear view (captain's chairs and third row)
6. Front-left side view

## To Add Images:

### Method 1: Save Images and Update JSON
1. Save the 6 images to your computer:
   - `innova-1-rear-quarter.jpg` - Rear three-quarter view
   - `innova-2-cover.jpg` - **Side profile shot (COVER PHOTO - must be first!)**
   - `innova-3-interior-passenger.jpg` - Interior passenger side view
   - `innova-4-front-sale.jpg` - Front view with FOR SALE overlay
   - `innova-5-interior-rear.jpg` - Interior rear view
   - `innova-6-front-left.jpg` - Front-left side view

2. Copy these images to `public/uploads/` folder

3. Update `data/vehicles.json` - Find Toyota Innova 2.5 G vehicle (id: 1736285200000) and add photos array. **IMPORTANT: Put the 2nd image (cover photo) FIRST:**
```json
"photos": [
  "innova-2-cover.jpg",
  "innova-1-rear-quarter.jpg",
  "innova-3-interior-passenger.jpg",
  "innova-4-front-sale.jpg",
  "innova-5-interior-rear.jpg",
  "innova-6-front-left.jpg"
]
```

### Method 2: Using Admin Page
1. Go to `http://localhost:3000/admin.html`
2. Upload images with the 2nd image (side profile) uploaded first
3. Or use Instagram URLs if available

## Note:
The vehicle has been added with ID: 1736285200000
The 2nd image (side profile shot) must be the FIRST image in the photos array to appear as the cover photo.

