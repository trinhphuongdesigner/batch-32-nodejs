var express = require('express');
var router = express.Router();

const { validateSchema } = require('../../utils');
const {
  getAll,
  create,
  search,
  getDetail,
  update,
  deleteFunc,
} = require('./controller');
const { updateProductSchema } = require('./validation');

// router.get('/', getAll);
// router.post('/', create);

router.route('/')
  .get(getAll)
  .post(create);

router.get('/search', search);

// router.get('/:id', getDetail);
// router.patch('/:id', validateSchema(updateProductSchema), update);
// router.delete('/:id', deleteFunc);

router.route('/:id')
  .get(getDetail)
  .patch(validateSchema(updateProductSchema), update)
  .delete(deleteFunc);

module.exports = router;
