const express=require("express");
const router=express.Router();
// import handler form controller 

const {localfile,imageuploa,videoupload}=require("../controller/localfileuplaod");

// mapping

router.post("/fileupload",localfile);


router.post("/videoupload",videoupload)

// export

module.exports=router;
