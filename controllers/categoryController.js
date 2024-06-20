const Category = require('../models/Category');

const categoryController = {
  addCategory: async (req, res) => {
    try {
      const newCategory = new Category(req.body);
      const saveCategory = await newCategory.save();
      res.status(201).json(saveCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create new category!', error: error.message });
    }
  },

  updateCategory: async (req, res) => {
    try {
      const updateCategory = await Category.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      if (!updateCategory) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      res.status(200).json(updateCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update category!', error: error.message });
    }
  },

  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByIdAndDelete(req.params.id);

      if (!category) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      res.status(200).json({ message: 'Delete category successfully!' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete category!', error: error.message });
    }
  },

  getCategory: async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get categories!', error: error.message });
    }
  },
  updateProductAmountInCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { productAmount } = req.body;

      const updatedCategory = await Category.findByIdAndUpdate(
        id,
        { $set: { numProduct: productAmount } },
        { new: true }
      );

      if (!updatedCategory) {
        return res.status(404).json({ message: 'Category not found!' });
      }

      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: 'Failed to update product amount!', error: error.message });
    }
  },
};

module.exports = categoryController;
