import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            console.error("No file path provided.");
            return null;
        }
        if (!fs.existsSync(localFilePath)) {
            console.error(`File does not exist at path: ${localFilePath}`);
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto', // Automatically detects the resource type (image, video, etc.)
        });

        console.log(`File uploaded to Cloudinary successfully: ${response.url}`);
        return response;
    } catch (error) {
        console.error("Error uploading file to Cloudinary:", error.message);
        // Remove the locally saved temporary file as the upload operation failed
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        return null;
    }
}

export { uploadOnCloudinary };
