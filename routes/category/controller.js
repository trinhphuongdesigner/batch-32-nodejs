const fs = require('fs');
const yup = require('yup');
const { default: mongoose } = require('mongoose');

let data = require('../../data/categories.json');
const { writeFileSync, generationID, fuzzySearch } = require('../../utils');
const Category = require('../../models/category');

// mongoose.connect('mongodb://localhost:27017/node-32-database');
mongoose.connect('mongodb://127.0.0.1:27017/node-32-database');

async function getAll(req, res, next) {
  try {
    const payload = await Category.find({
      isDeleted: false,
    });

    res.send(200, {
      payload,
      message: "Lấy dánh sách thành công"
    });
  } catch (error) {
    res.send(400, {
      error,
      message: "Lấy dánh sách không thành công"
    });
  }
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
async function getDetail(req, res, next) {
  try {
    const  { id } = req.params;
    const payload = await Category.findOne({
      _id: id,
      isDeleted: false,
    });

    res.send(200, {
      payload,
      message: "Xem chi tiết thành công"
    });
  } catch (error) {
    res.send(400, {
      error,
      message: "Xem chi tiết không thành công"
    });
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
  try {
  const { id } = req.params;
    // const payload = await Category.findByIdAndUpdate(
    //   id,
    //   // {$set:{isDeleted : true}},
    //   { isDeleted : true },
    //   { new: true },
    // );
    const payload = await Category.findOneAndUpdate(
      { 
        _id: id,
        isDeleted: false,
      },
      // {$set:{isDeleted : true}},
      { isDeleted : true },
      { new: true },
    );

    if (payload) {
      return res.send(200, {
        payload,
        message: "Xóa thành công"
      });
    }

    return res.send(200, {
      message: "Không tìm thấy danh mục"
    });
  } catch (error) {
    res.send(400, {
      error,
      message: "Xóa không thành công"
    });
  }
};

module.exports = {
  getAll,
  create,
  search,
  getDetail,
  update,
  deleteFunc,
};
