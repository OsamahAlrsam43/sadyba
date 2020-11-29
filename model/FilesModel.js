const mongoose = require("mongoose");
const ArchefModel = require("./ArchefModels");


class Files{

     //save Files

  async SaveFiles(iduser, idfolder,fileW) {

    try {
      await ArchefModel.find({iduser:iduser }, (errr, userr) => {
        if (userr) {

          //var file = {NAMEE: fileW};
          ArchefModel.updateOne({"folder.id": idfolder },
          {
              $push: {
                "folder.$.files":fileW
              },
            },
            function (err, node) {
       
              if (err) {
                console.log(err);
              } else {
                console.log(node);
              }
            
            })

        }
    
      })

    }
     catch (err) {
      console.error(err);
    }
  }

  
  //delet folder by id 

  async deletefile(iduser, idfolder,filename) {

    try {
      await ArchefModel.findOne({iduser: iduser }, (errr, userr) => {
        if (userr) {

          ArchefModel.updateMany({ "folder.id": idfolder }, { $pull: { "folder.$.files": { filename: filename } } }, { safe: true, upsert: true },
            function (err, node) {
       
              if (err) {
                console.log(err);
              } else {
                console.log(node);
              }
            
            })
        }

  

           else {
          console.log("no delete folder");
        }
      });
    
      
    } catch (err) {
      console.error(err);
    }
  }



}



module.exports = Files;
