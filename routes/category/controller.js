const fs = require('fs');
const yup = require('yup');
const { default: mongoose } = require('mongoose');

let data = require('../../data/categories.json');
const { writeFileSync, generationID, fuzzySearch } = require('../../utils');
const Category = require('../../models/category');

// mongoose.connect('mongodb://localhost:27017/node-32-database');
mongoose.connect('mongodb://127.0.0.1:27017/node-32-database');

function getAll(req, res, next) {
  res.send(data);
};

async function create(req, res, next) {
  try {
    const { name, description } = req.body;

  const newCategory = new Category({
    name,
    description,
  });

  const payload = await newCategory.save();

  res.send(200, {
    payload,
    message: "Tạo thành công"
  });
  } catch (error) {
    console.log('««««« error »»»»»', error);

    res.send(400, {
      error,
      message: "Tạo không thành công"
    });
  }
};

function search(req, res, next) {
  const { name } = req.query;

  const filter = data.filter((item) => fuzzySearch(name).test(item.name))
  res.send(filter);
};

// Get one by id
function getDetail(req, res, next) {
  try {
    const { id } = req.params;
    let result = data.find((x) => x.id == id);

    if (result) {
      return res.send({ code: 200, payload: result });
    }
    return res.send(404, { message: "Not found" });
  } catch (error) {
    res.send(400, { message: "Bad request" })
  }
};

function update(req, res, next) {
  try {
    const { id } = req.params;

    const patchData = req.body;

    let found = data.find((x) => x.id == id);

    if (found) {
      for (let propertyName in patchData) {
        found[propertyName] = patchData[propertyName];
      }
      res.send(200, { message: 'Updated' });
    }
    res.send({ ok: false, message: 'Updated fail' });
  } catch (error) {
    res.send(400, { message: "Bad request" })
  }
};

async function deleteFunc(req, res, next) {
  const { id } = req.params;
  data = data.filter((x) => x.id.toString() !== id.toString());

  await writeFileSync('data/categories.json', data);

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
