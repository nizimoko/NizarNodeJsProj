const mongoose = require("mongoose");

const bizSchema = new mongoose.Schema({
  bizName: {
    type: String,
    required: true,
  },
  bizDescription: {
    type: String,
    required: true,
  },
  bizLocation: {
    type: String,
    required: true,
  },
  bizPhone: {
    type: Number,
    required: true,
  },
  bizPic: {
    type: String,
    required: true,
  },
  createdBy: mongoose.SchemaTypes.ObjectId,
});

const Biz = mongoose.model("biz", bizSchema);

const createBiz = (
  bizName,
  bizDescription,
  bizLocation,
  bizPhone,
  bizPic,
  createdBy
) => {
  const newBiz = new Biz({
    bizName,
    bizDescription,
    bizLocation,
    bizPhone,
    bizPic,
    createdBy,
  });
  return newBiz.save();
};

const findBizById = (bizId) => {
  return Biz.findById(bizId);
};
const deleteBizById = (bizId) => {
  return Biz.findByIdAndDelete(bizId);
};

const findCreatedBy = (createdById) => {
  return Biz.find({ createdBy: createdById });
};
const putBiz = (updatableBiz) => {
  return Biz.findByIdAndUpdate(updatableBiz);
};

module.exports = {
  createBiz,
  findBizById,
  deleteBizById,
  findCreatedBy,
  putBiz,
  Biz,
};
