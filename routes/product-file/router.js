var express = require('express');
var router = express.Router();

const { validateSchema, checkIdSchema } = require('../../utils');
const {
  getAll,
  create,
  search,
  getDetail,
  update,
  deleteFunc,
} = require('./controller');
const { productSchema } = require('./validation');

// router.get('/', getAll);
// router.post('/', create);

router.route('/')
  .get(getAll)
  .post(validateSchema(productSchema), create);

router.get('/search', search);

// router.get('/:id', getDetail);
// router.patch('/:id', validateSchema(productSchema), update);
// router.delete('/:id', deleteFunc);

router.route('/:id')
  .get(validateSchema(checkIdSchema), getDetail)
  .patch(validateSchema(checkIdSchema), validateSchema(productSchema), update)
  .delete(validateSchema(checkIdSchema), deleteFunc);

module.exports = router;
