var express = require('express');
var router = express.Router();
const fs = require('fs');
const yup = require('yup');

const data = require('../data/products.json');
const { writeFileSync, generationID, validateSchema } = require('../utils');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(data);
});

router.post('/', async function (req, res, next) {
  const { name, price } = req.body;

  const newP = { name, price, id: generationID() };
  if (data?.length > 0) {
    await writeFileSync('data/products.json', [...data, newP]);
  } else {
    await writeFileSync('data/products.json', [newP]);
  }

  // const data2 = await fs.open('data/products.json');
  squadJSON = JSON.parse(fs.readFileSync('data/products.json', 'utf8'));

  res.send(200, {
    payload: squadJSON,
    message: "Tạo thành công"
  });
});

router.get('/search', function (req, res, next) {
  const { price } = req.query;
  const filter = data.filter((item) => item.price >= price)
  res.send(filter);
});

// Get one by id
router.get('/:id', function (req, res, next) {
  const { id } = req.params;

  const validationSchema = yup.number();

  validationSchema
    .validate(id)
    .then(() => {
      let result = data.find((x) => x.id == id);

      if (result) {
        return res.send({ code: 200, payload: result });
      }
      return res.send(404, { message: "Not found" });
    })
    .catch((err) => res.send(400, { message: "Bad request" })
    );
});
// router.get('/:id', function (req, res, next) {
//   const { id } = req.params;

//   const validationSchema = yup.object().shape({
//     id: yup.number(),
//   });

//   validationSchema
//     .validate({ id })
//     .then(() => {
//       let result = data.find((x) => x.id == id);

//       if (result) {
//         return res.send({ code: 200, payload: result });
//       }
//       return res.send(404, { message: "Not found" });
//     })
//     .catch((err) => res.send(400, { message: "Bad request" })
//     );
// });

// PHÁ
// router.patch('/:id', function (req, res, next) {
//   const { id } = req.params;

//   const patchData = req.body;
//   const validationSchemaId = yup.number();

//   const validationSchemaBody = yup.object().shape({
//     price: yup.number(),
//     name: yup.string(),
//   });

//   validationSchemaId
//     .validate(id)
//     .then(() => {
//       validationSchemaBody
//         .validate(req.body)
//         .then(() => {
//           let found = data.find((x) => x.id == id);

//           if (found) {
//             for (let propertyName in patchData) {
//               found[propertyName] = patchData[propertyName];
//             }
//             res.send({ ok: true, message: 'Updated' });
//           }
//           res.send({ ok: false, message: 'Updated fail' });
//         })
//         .catch((err) => {
//           console.log('««««« err »»»»»', err);
//           res.send(400, { message: "Body sai" })
//         });
//     })
//     .catch((err) => res.send(400, { message: "ID sai" }))
// });
const updateProductSchema = yup.object({
  params: yup.object({
    id: yup.number(),
  }),
  body: yup.object({
    price: yup.number(),
    name: yup.string(),
  }),
});

router.patch('/:id', validateSchema(updateProductSchema), function (req, res, next) {
  try {
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
  } catch (error) {
    res.send({ ok: false, message: 'Updated fail' });
  }
});

router.delete('/:id', function (req, res, next) {
  const { id } = req.params;
  data = data.filter((x) => x.id.toString() !== id.toString());

  console.log('««««« data »»»»»', data);

  res.send({ ok: true, message: 'Deleted' });
});

module.exports = router;
