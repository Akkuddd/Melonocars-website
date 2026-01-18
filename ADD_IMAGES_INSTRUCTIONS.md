# Instructions to Add Images for Chevrolet Tavera Turbo

## Vehicle Added:
- **Make:** Chevrolet
- **Model:** Tavera Turbo
- **Year:** 2006
- **Price:** ₹1,10,000
- **Details:** Manual Transmission, Diesel, New Taxes, Power Steering, Fancy Number, Cashmere Color, Good Condition, Neat & Clean Interior

## To Add Images:

### Method 1: Using Admin Page (Recommended)
1. Go to `http://localhost:3000/admin.html`
2. The vehicle is already added to the database
3. You need to manually add the images

### Method 2: Direct Image Upload
1. Save the 3 images you have:
   - Image 1: Side profile (silver Tavera with sunburst)
   - Image 2: Front view with "FOR SALE 1,10,000" overlay (USE THIS AS COVER PHOTO)
   - Image 3: Rear three-quarter view (silver Tavera going uphill)
2. Rename them:
   - `tavera-1-side.jpg` (or .png)
   - `tavera-2-cover.jpg` (or .png) - **This should be first in the photos array**
   - `tavera-3-rear.jpg` (or .png)
3. Copy these images to `public/uploads/` folder
4. Update the vehicle in `data/vehicles.json` to include photo filenames

### Method 3: Update JSON Directly
Edit `data/vehicles.json` and add the photo filenames to the photos array. Make sure the second image (with "FOR SALE") is first in the array.

Example:
```json
"photos": [
  "tavera-2-cover.jpg",
  "tavera-1-side.jpg",
  "tavera-3-rear.jpg"
]
```

## Note:
The vehicle has been added with ID: 1736284800000. You can update it using the admin interface or by editing the JSON file directly.

