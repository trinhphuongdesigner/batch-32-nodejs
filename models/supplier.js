const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const SupplierSchema = new Schema({
  name: { type: String, required: true },
  description: String,
});

const Supplier = model('Supplier', SupplierSchema);
module.exports = Supplier;