const express=require("express");
const router=express.Router();
// import handler form controller 

const {localfile}=require("../controller/localfileuplaod");

// mapping

router.post("/fileupload",localfile);

// export

module.exports=router;
