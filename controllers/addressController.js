const Address = require('../models/Address');

const addressController = {
    addAddress: async (req, res) => {
        try {
            const newAddress = new Address(req.body);
            console.log(req.body);
            await newAddress.save();
            res.status(200).json('Created new address successfully!');
        } catch (error) {
            res.status(500).json({ message: 'Failed to create new address!', error });
        }
    },
    updateAddress: async (req, res) => {
        try {
            const updatedAddress = await Address.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedAddress);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update address!', error });
        }
    },
    deleteAddress: async (req, res) => {
        try {
            await Address.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted address successfully!');
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete address!', error });
        }
    },
    getAllAddresses: async (req, res) => {
        try {
            const addresses = await Address.find();
            res.status(200).json(addresses);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get addresses!', error });
        }
    },
    getAddressById: async (req, res) => {
        try {
            const address = await Address.findById(req.params.id);
            if (!address) {
                return res.status(404).json('Address not found!');
            }
            res.status(200).json(address);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get address!', error });
        }
    },
    getAddressByMaND: async (req, res) => {
        try {
            const address = await Address.find({ MaND: req.params.MaND });
            if (!address) {
                return res.status(404).json('Address not found!');
            }
            res.status(200).json(address);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get address!', error });
        }
    },

};

module.exports = addressController;
