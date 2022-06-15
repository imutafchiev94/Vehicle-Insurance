const cloudinary = require('cloudinary').v2;
const cloudinaryConfig = require('../config/cloudinaryConfig');

cloudinary.config(cloudinaryConfig);

async function getDashboardImage() {
    return {imageUrl: cloudinary.url('Vehicle_Insuranace')};
}

module.exports = {
    getDashboardImage
}