const yup = require('yup');

const updateProductSchema = yup.object({
  params: yup.object({
    id: yup.number(),
  }),
  body: yup.object({
    price: yup.number(),
    name: yup.string(),
  }),
});

module.exports = {
  updateProductSchema,
}