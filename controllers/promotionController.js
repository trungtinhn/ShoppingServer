const Promotion = require('../models/Promotion');

const promotionController = {
    addPromotion: async (req, res) => {
        try {
            const newPromotion = new Promotion(req.body);
            await newPromotion.save();
            res.status(200).json('Created new promotion successfully!');
        } catch (error) {
            res.status(500).json({ message: 'Failed to create new promotion!', error });
        }
    },
    updatePromotion: async (req, res) => {
        try {
            const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
            res.status(200).json(updatedPromotion);
        } catch (error) {
            res.status(500).json({ message: 'Failed to update promotion!', error });
        }
    },
    deletePromotion: async (req, res) => {
        try {
            await Promotion.findByIdAndDelete(req.params.id);
            res.status(200).json('Deleted promotion successfully!');
        } catch (error) {
            res.status(500).json({ message: 'Failed to delete promotion!', error });
        }
    },
    getAllPromotions: async (req, res) => {
        try {
            const promotions = await Promotion.find();
            res.status(200).json(promotions);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get promotions!', error });
        }
    },
    getPromotionById: async (req, res) => {
        try {
            const promotion = await Promotion.findById(req.params.id);
            if (!promotion) {
                return res.status(404).json('Promotion not found!');
            }
            res.status(200).json(promotion);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get promotion!', error });
        }
    },
    getPromotionCurrent: async (req, res) => {
        try {
            const promotion = await Promotion.find({ NgayBatDau: { $lte: new Date() }, NgayKetThuc: { $gte: new Date() }, SoLuotConLai: { $gt: 0 } });
            if (!promotion) {
                return res.status(404).json('Promotion not found!');
            }
            res.status(200).json(promotion);
        } catch (error) {
            res.status(500).json({ message: 'Failed to get promotion!', error });
        }
    },
    checkPromotion: async (req, res) => {
        try{
            const { id } = req.params;
            const promotion = await Promotion.findOne({
                _id: id,
                NgayBatDau: { $lte: new Date() },
                NgayKetThuc: { $gte: new Date() },
                SoLuotConLai: { $gt: 0 }
            });
            if (!promotion) {
                return res.status(404).json('Promotion not found or not valid!');
            }
            res.status(200).json(promotion);
        }catch(error){
            res.status(500).json({ message: 'Failed to get promotion!', error });
        }
        
    }
};

module.exports = promotionController;
