import { User } from '../models/user.model.js';
import { UserType } from '../models/usertype.model.js';

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

        const newUser = new User({ name, email, phone, address, userType: userTypeExists._id })
        await newUser.save();

        return res.status(201).json({ msg: `User created successfully` })

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('userType','userType');
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
