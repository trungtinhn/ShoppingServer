const mongoose = require('mongoose');

const PermissionSchema = new mongoose.Schema({
  category: { type: Boolean, required: true },
  promotion: { type: Boolean, required: true },
  product: { type: Boolean, required: true },
  order: { type: Boolean, required: true },
  user: { type: Boolean, required: true }
});

module.exports = mongoose.model('Permission', PermissionSchema);
