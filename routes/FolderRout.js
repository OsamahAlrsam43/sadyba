const express = require("express");
const router = express.Router();

const Folder = require("../model/FolderModel");
const folder = new Folder();

//get folder.
router.get("/", async (req, res) => {
  try {
    const getfolderuser = await folder.Getfolder();
    res.send(getfolderuser);
  } catch (err) {
    console.error(err);
  }
});

const ArchefModel = require("../model/ArchefModels");

//get folder.
router.get("/idfolder", async (req, res) => {
  try {

  const dt = await ArchefModel.find({ iduser: 44542,"folder": { id: 140869667 } }, { safe: true, upsert: true },
            function (err, node) {
       
              if (err) {
                console.log(err);
              } else {
                console.log(node);
              }
            
   })
    
    //console.log(data.map(res=>res.folder).filter(res=>res.id===140869667))
   // res.json(await folder.getoneusers());
    //const dt = await ArchefModel.find({ iduser: 44542, "folder":{ id: 140869667 }})
res.json(dt);
  } catch (err) {
    console.error(err);
  }
});


//save users from idusers.
router.post("/:id", async (req, res) => {
  try {
    
    const user =await folder.getoneusers(req.params.id)
   // console.log(user)
    res.send(user)
    
  } catch (err) {
    console.error(err);
  }
});


//save folder.
router.post("/", async (req, res) => {
  try {
    const { iduser, namefolder, id, empollyadd, hystory } = req.body;
    
   await folder.SaveFolder(iduser, id, namefolder, empollyadd, hystory);
  } catch (err) {
    console.error(err);
  }
});


//Delete folder
router.delete("/", async (req, res) => {
  try {
    const { iduser, idfolder } = req.body;
    
    await folder.deletefolder(iduser, idfolder);

  } catch (err) {
    console.error(err);
  }
});

//Delete folder
router.put("/", async (req, res) => {
  try {
    const { iduser, idfolder,namefolder,empollyadd,hystory } = req.body;
    
    await folder.updatefolder(iduser, idfolder,namefolder,empollyadd,hystory);

  } catch (err) {
    console.error(err);
  }
});




module.exports = router;
