var express = require('express');
var router = express.Router();

const data = require('../data/products.json');
const { writeFileSync, generationID } = require('../utils');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(data);
});

router.post('/', async function(req, res, next) {
  const { name, price } = req.body;

  const newP = { name, price, id: generationID() };
  if (data?.length > 0) {
    await writeFileSync('data/products.json', [ ...data, newP]);
  } else {
    await writeFileSync('data/products.json', [newP]);
  }

  res.send(200, {
    payload: newP,
    message: "Tạo thành công"
  });
});

router.get('/search', function(req, res, next) {
  const { price } = req.query;
  const filter = data.filter((item) => item.price >= price)
  res.send(filter);
});

// Get one by id
router.get('/:id', function (req, res, next) {
  const { id } = req.params;

  let result = data.find((x) => x.id == id);

  if (result) {
    return res.send({ code: 200, payload: result });
  }

    return res.send(401, { message: "Not found" });
});

router.patch('/:id', function (req, res, next) {
  const { id } = req.params;
  const patchData = req.body;

  let found = data.find((x) => x.id == id);

  if (found) {
    for (let propertyName in patchData) {
      found[propertyName] = patchData[propertyName];
    }
    res.send({ ok: true, message: 'Updated' });
  }
  res.send({ ok: false, message: 'Updated fail' });
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  data = data.filter((x) => x.id.toString() !== id.toString());

  console.log('««««« data »»»»»', data);

  res.send({ ok: true, message: 'Deleted' });
});

module.exports = router;
