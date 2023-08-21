const fs = require('fs');
const yup = require('yup');

let data = require('../../data/products.json');
const { writeFileSync, generationID } = require('../../utils');

function getAll (req, res, next) {
  res.send(data);
};

async function create (req, res, next) {
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
};

function search (req, res, next) {
  const { price } = req.query;
  const filter = data.filter((item) => item.price >= price)
  res.send(filter);
};

// Get one by id
function getDetail (req, res, next) {
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
};

function update (req, res, next) {
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
};

async function deleteFunc (req, res, next) {
  const { id } = req.params;
  data = data.filter((x) => x.id.toString() !== id.toString());

  await writeFileSync('data/products.json', data);

  res.send({ ok: true, message: 'Deleted' });
};

module.exports = {
  getAll,
  create,
  search,
  getDetail,
  update,
  deleteFunc,
};
