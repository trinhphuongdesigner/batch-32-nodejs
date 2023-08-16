var express = require('express');
var router = express.Router();
const yup = require('yup');

const { validateSchema } = require('../../utils');
const {
  getAll,
  create,
  search,
  getDetail,
  update,
  deleteFunc,
} = require('./controller');

router.get('/', getAll);

router.post('/', create);

router.get('/search', search);

router.get('/:id', getDetail);

const updateProductSchema = yup.object({
  params: yup.object({
    id: yup.number(),
  }),
  body: yup.object({
    price: yup.number(),
    name: yup.string(),
  }),
});

router.patch('/:id', validateSchema(updateProductSchema), update);

router.delete('/:id', deleteFunc);

module.exports = router;
