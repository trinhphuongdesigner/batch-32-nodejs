var express = require('express');
var router = express.Router();

let data = [
  { id: 1, name: 'iPhone 14 Pro Max', price: 1500 },
  { id: 2, name: 'iPhone 13 Pro Max', price: 1200 },
  { id: 3, name: 'iPhone 12 Pro Max', price: 1000 },
  { id: 4, name: 'iPhone 11 Pro Max', price: 800 },
  { id: 9, name: 'iPhone X', price: 500 },
];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send(data);
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
