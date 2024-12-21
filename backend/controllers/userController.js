import { User } from '../models/user.model.js';
import { UserType } from '../models/usertype.model.js';

const addUser = async (req, res) => {
    try {
        const { name, email, phone, address, userType } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ msg: 'Email Already Exists' });
        }


        if (!name || !email || !phone || !address) {
            return res.status(400).json({ msg: 'Please fill all fields' });
        }


        let userTypeExists = await UserType.findOne({ type: userType });


        if (!userTypeExists) {
            userTypeExists = new UserType({
                type: userType || 'Student',
            });
            await userTypeExists.save();
        }

        // Create a new user
        const user = new User({
            name,
            email,
            phone,
            address,
            userType: userTypeExists._id,
        });

        await user.save();

        res.status(201).json({ msg: 'User Added Successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Internal Server Error' });
    }
};

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().populate('userType');
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

const userController = { addUser, getAllUsers, getAllTypes };

export { userController };
