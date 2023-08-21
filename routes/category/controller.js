const { fuzzySearch } = require('../../utils');
const { Category } = require('../../models');

async function getAll(req, res, next) {
  try {
    const payload = await Category.find({ isDeleted: false });

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

async function search(req, res, next) {
  try {
    const { name } = req.query;
    const conditionFind = { isDeleted: false };

    if (name) {
      conditionFind.name = fuzzySearch(name);
    }

    const payload = await Category.find(conditionFind);

    res.send(200, {
      payload,
      message: "Tìm kiếm thành công"
    });
  } catch (error) {
    res.send(400, {
      error,
      message: "Tìm kiếm không thành công"
    });
  }
};

// Get one by id
async function getDetail(req, res, next) {
  try {
    const { id } = req.params;
    const payload = await Category.findOne({
      _id: id,
      isDeleted: false,
    });

    if (!payload) {
      return res.send(400, {
        message: "Không tìm thấy"
      });
    }

    return res.send(200, {
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

async function update(req, res, next) {
  try {
    const { id } = req.params;

    const payload = await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { ...req.body },
      { new: true },
    );

    if (payload) {
      return res.send(200, {
        payload,
        message: "Cập nhập thành công"
      });
    }
    return res.send(404, { message: "Không tìm thấy" });
  } catch (error) {
    console.log('««««« error »»»»»', error);
    res.send(400, {
      error,
      message: "Cập nhập không thành công"
    });
  }
};

async function deleteFunc(req, res, next) {
  try {
    const { id } = req.params;
    const payload = await Category.findOneAndUpdate(
      { _id: id, isDeleted: false },
      { isDeleted: true },
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
