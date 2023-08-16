const yup = require('yup');

const productSchema = yup.object({
  body: yup.object({
    price: yup.number(),
    name: yup.string().max(20),
  }),
});

const checkIdSchema = yup.object({
  params: yup.object({
    id: yup.number(),
  }),
});

module.exports = {
  productSchema,
  checkIdSchema,
}