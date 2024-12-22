import { User } from '../models/user.model.js';
import { UserType } from '../models/usertype.model.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const addUser = async (req, res) => {
    try {
        const { name, email, phone, address, userType } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ msg: 'Email Exists' })

        if (!name || !email || !phone || !address) {
            return res.status(400).json({ msg: 'Please fill all fields including userType' });
        }

        const userTypeExists = await UserType.findOne({ userType: userType });
        if (!userTypeExists) return res.status(400).json({ msg: 'Invalid User Type' });

        // Ensure all files are provided as in model it is required:true

        if (!req.files || !req.files.aadharCard || !req.files.panCard || !req.files.profilePic) {
            return res.status(400).json({ msg: 'Please upload all required documents' });
        }

        const { aadharCard, panCard, profilePic } = req.files;


        // In userController.js, add these logs:
        console.log("Received files:", req.files);
        console.log("Aadhar path:", aadharCard[0].path);
        console.log("Pan path:", panCard[0].path);
        console.log("Profile path:", profilePic[0].path);

        // Before cloudinary upload
        console.log("Attempting to upload aadhar to cloudinary from path:", aadharCard[0].path);
        console.log("Aadhar upload result:", aadharUpload);

        // upload files on cloudinary

        const aadharUpload = await uploadOnCloudinary(aadharCard[0].path)
        const panUpload = await uploadOnCloudinary(panCard[0].path)
        const profileUpload = await uploadOnCloudinary(profilePic[0].path)

        if (!aadharUpload || !panUpload || !profileUpload) {
            return res.status(500).json({ msg: "File upload failed" });
        }

        const newUser = new User({
            name, email, phone, address,
            userType: userTypeExists._id,
            aadharCard: aadharUpload.url,
            panCard: panUpload.url,
            profilePic: profileUpload.url
        })
        await newUser.save();

        return res.status(201).json({ msg: `User created successfully` })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('userType', 'userType');
        res.status(200).json(users);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });

    }
}

const getAllTypes = async (req, res) => {
    try {
        const userTypes = await UserType.find();
        res.status(200).json(userTypes)
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const addUserType = async (req, res) => {
    try {
        const { userType } = req.body;
        const userTypeExists = await UserType.findOne({ userType: userType });

        if (userTypeExists) {
            return res.status(400).json({ msg: 'User Type Already Exists' });
        }

        const newType = new UserType({ userType: userType })
        await newType.save();
        return res.status(200).json({ msg: 'User Type Addedd Successfully' })

    } catch (error) {
        console.log('error', error)
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
}

const userController = { addUser, getAllUsers, getAllTypes, addUserType };

export { userController };
