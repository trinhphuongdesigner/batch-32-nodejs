const yup = require('yup');

const productSchema = yup.object({
  body: yup.object({
    price: yup.number(),
    name: yup.string().max(20),
  }),
});

module.exports = {
  productSchema,
}