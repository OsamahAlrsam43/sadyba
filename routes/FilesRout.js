const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require('path')


const Files = require("../model/FilesModel");
const filess = new Files();
const { v4: uuidv4 } = require('uuid');



 





//save files.
router.post("/", async (req, res) => {
  try {
    const { iduser,idfolder, id, namefiles, empollyadd, hystory,typefiles,pathfiles,dateupload,notefiles } = req.body;
    //console.log(iduser)
   await filess.SaveFiles(iduser,idfolder, id, namefiles, empollyadd, hystory,typefiles,pathfiles,dateupload,notefiles);
  } catch (err) {
    console.error(err);
  }
});



const Multer = require("multer");

let storgelogo = Multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
  },
  

  filename: function (req, file, cb) {
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});

//upload image logo company
const uploadlogocompany = Multer({ storage: storgelogo }).array("imgCollection",100);


//Update setting company
router.post("/upload",
    uploadlogocompany,async(req, res) => {
      try {

       const { iduser,idfolders} = req.body;
  
        var eiduser=parseInt(iduser)
        var eidfolders = parseInt(idfolders)
        
       req.files.forEach(EL=> filess.SaveFiles(eiduser,eidfolders,EL))
      
      
        } catch (err) {
            console.error(err);
        }
    }
);

global.__basedir = __dirname;

const getListFiles = (req, res) => {
  try {
  const directoryPath = process.cwd()+ `/uploads/`;
  
    fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }


        let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        type: path.extname(file).replace('.', ""),
        url: directoryPath  + file,
      });
    });

    res.status(200).send(fileInfos);
  });
  } catch (err) {
    console.error(err);
  }
};



//get files.
router.get("/",getListFiles, async (req, res) => {
  
});


const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = process.cwd()+ `/uploads/`;
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }


  });
};

//downlod files.
router.post("/:name",download, async (req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
});



//Delete file
router.delete("/:name", async (req, res) => {
  try {
    const { iduser, idfolder } = req.body;
    
    await filess.deletefile(iduser,idfolder,req.params.name);

  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
