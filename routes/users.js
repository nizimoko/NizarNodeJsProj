const express = require("express");
const router = express.Router();
const userValidation = require("../validation/userValidation");
const bcrypt = require("../config/bcrypt");
const userModel = require("../model/userModel");
const middleware = require("../middleware/authMiddleware");
const jwt = require("../config/jwt");

//*    Register    *//

router.post("/register", async (req, res) => {
  try {
    const value = await userValidation.registerSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    value.password = await bcrypt.createHash(value.password);
    const doesEmailExistArr = await userModel.findUserByEmail(value.email);
    if (doesEmailExistArr.length != 0) {
      throw "This email is already in your system";
    } else {
      await userModel.createUser(
        value.name,
        value.email,
        value.password,
        value.biz
      );
      res.json({ status: 200, msg: "Hello there :) ", user: value });
    }
  } catch (err) {
    res.json({ status: 400, err: err });
  }
});

//*     Login     *//

router.post("/login", async (req, res) => {
  try {
    const value = await userValidation.loginSchema.validateAsync(req.body, {
      abortEarly: false,
    });
    const doesEmailExistArr = await userModel.findUserByEmail(value.email);
    if (doesEmailExistArr.length != 0) {
      const isPassFine = await bcrypt.compareHash(
        value.password,
        doesEmailExistArr[0].password
      );
      if (isPassFine == true) {
        const token = await jwt.createToken({
          id: doesEmailExistArr[0].id,
          name: doesEmailExistArr[0].name,
        });
        res.json({
          status: 200,
          msg: `Welcome back ${doesEmailExistArr[0].name}`,
          token: token,
        });
      } else {
        throw "Wrong password please try again";
      }
    } else {
      throw "Wrong Email please try again";
    }
  } catch (err) {
    console.log(err);
    res.json({ status: 400, err: err });
  }
});

//*   Find   *//

router.get("/find", middleware, async (req, res) => {
  try {
    const findUser = await userModel.findUserById(req.jwtData.id);
    res.json({ status: 200, user: findUser });
  } catch (err) {
    res.json({
      status: 401,
      err: err,
      msg: "this user was not found",
    });
  }
});

module.exports = router;
