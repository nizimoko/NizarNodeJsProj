const express = require("express");
const router = express.Router();
const bizValidation = require("../validation/bizValidation");
const bizModel = require("../model/bizModel");

//*    find biz card    *//

router.post("/new", async (req, res) => {
  try {
    const bizValue = await bizValidation.bizSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const bizCard = await bizModel.createBiz(
      bizValue.bizName,
      bizValue.bizDescription,
      bizValue.bizLocation,
      bizValue.bizPhone,
      bizValue.bizPic,
      req.jwtData.id
    );
    res.json({ status: 200, msg: "biz created", biz: bizCard });
  } catch (err) {
    res.json({ status: 400, err: err });
  }
});

//*     search if biz card exists   *//
router.get("/search/:id", async (req, res) => {
  try {
    const searchBiz = await bizModel.findBizById(req.params.id);
    res.json({ status: 200, msg: " biz card found", searchBiz: searchBiz });
  } catch (err) {
    res.json({ status: 400, msg: "biz card not found", err: err });
  }
});

//*        Delete Biz card        *//
router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteBiz = await bizModel.deleteBizById(req.params.id);
    res.json({ status: 200, msg: "biz card has been deleted" });
  } catch (err) {
    res.json({ status: 400, msg: "biz card not found", err: err });
  }
});

//*          get all biz cards that were created by certain user           *//
router.get("/getallcards", async (req, res) => {
  try {
    const bizUserArr = await bizModel.findCreatedBy(req.jwtData.id);
    if (bizUserArr.length == 0) {
      throw "there were no cards found";
    }

    res.json({
      status: 200,
      msg: "here is what we found",
      bizUserArr: bizUserArr,
    });
  } catch (err) {
    res.json({ status: 400, err: err });
  }
});

//*             Put             *//
router.put("/update/:id", async (req, res) => {
  try {
    const bizValue = await bizValidation.updateSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const bizUpdate = await bizModel.Biz.findByIdAndUpdate(req.params.id, {
      bizName: bizValue.bizName,
      bizDescription: bizValue.bizDescription,
      bizLocation: bizValue.bizLocation,
      bizPhone: bizValue.bizPhone,
      bizPic: bizValue.bizPic,
    });
    res.json({
      status: 200,
      msg: "biz has been updated",
      bizUpdate: bizUpdate,
    });
  } catch (err) {
    res.json({ status: 400, err: err });
  }
});

module.exports = router;
