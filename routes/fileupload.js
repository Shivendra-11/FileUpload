const express=require("express");
const router=express.Router();
// import handler form controller 

const {localfile,imageuploa,videoupload,imagereduceupload}=require("../controller/localfileuplaod");

// mapping

router.post("/fileupload",localfile);


router.post("/videoupload",videoupload)


router.post("/reduceimageupload",imagereduceupload)

// export

module.exports=router;
