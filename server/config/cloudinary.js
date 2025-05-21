const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

// Verify credentials are present
if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
    console.error('Missing Cloudinary credentials');
    process.exit(1);
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Create storage configuration
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'portfolio/projects', // Add projects folder
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [{
            width: 800, // Larger size for project images
            height: 600,
            crop: 'fill',
            quality: 'auto'
        }],
        public_id: (req, file) => `project_${Date.now()}`
    }
});

module.exports = { cloudinary, storage };