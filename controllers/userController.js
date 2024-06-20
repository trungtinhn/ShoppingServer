const User = require('../models/User');
const userController = {
    registerEmailPassword: async (req, res) =>  {
        try {
            const newUser = new User(req.body);
            await newUser.save();
            res.status(200).send('User registered successfully');
        } catch (error) {
            res.status(400).send(error);
        }
    },
    getUserTypeByMaND :async (req, res) => {
        try {
          const { MaND } = req.params;
          const user = await User.findOne({ MaND });
          if (user) {
            return res.status(200).json(user);
          } else {
            return res.status(404).json({ message: 'User not found' });
          }
        } catch (error) {
          return res.status(500).json({ message: error.message });
        }
    },
    updateUser: async (req, res) => {
      try {
          const { MaND } = req.params;
          const updatedUser = await User.findOneAndUpdate({ MaND }, req.body, { new: true });
          if (updatedUser) {
              return res.status(200).json(updatedUser);
          } else {
              return res.status(404).json({ message: 'User not found' });
          }
      } catch (error) {
          return res.status(500).json({ message: error.message });
      }
  },
  deleteUser: async (req, res) => {
      try {
          const { MaND } = req.params;
          const deletedUser = await User.findOneAndDelete({ MaND });
          if (deletedUser) {
              return res.status(200).json({ message: 'User deleted successfully' });
          } else {
              return res.status(404).json({ message: 'User not found' });
          }
      } catch (error) {
          return res.status(500).json({ message: error.message });
      }
  },
  getAllUsers: async (req, res) => {
      try {
          const users = await User.find();
          return res.status(200).json(users);
      } catch (error) {
          return res.status(500).json({ message: error.message });
      }
  },
  getCurrentUserData: async (req, res) => {
    try {
        const { MaND } = req.params;
        console.log(MaND)
        const user = await User.find({MaND: MaND});
        if (user) {
            return res.status(200).json(user);
        } else {
            return res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
}

module.exports = userController