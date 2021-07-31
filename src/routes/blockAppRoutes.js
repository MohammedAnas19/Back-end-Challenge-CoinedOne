const express = require('express');
const {
  getBlockApps,
  createBlockApps,
  updateBlockApps,
  getBlockApp,
  deleteBlockApps,
} = require("../controllers/blockAppController");
const { requireSignIn } = require('../common-middlewire/index');
const router = express.Router();





// router.post('/product/create',requireSignIn,adminMiddleware,upload.array('productPicture'),createProduct);
router.get("/blockApps/", requireSignIn, getBlockApps);
router.get("/blockApp/", requireSignIn, getBlockApp);
router.put('/blockApp/',requireSignIn,updateBlockApps);
router.delete("/blockApp/", requireSignIn, deleteBlockApps);
router.post('/blockApp/',requireSignIn,createBlockApps);

module.exports=router;