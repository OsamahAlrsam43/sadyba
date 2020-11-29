const mongoose = require("mongoose");
const ArchefModel = require("./ArchefModels");

class FolderUser {
  //get folder
  async Getfolder() {
    try {



      return await ArchefModel.find();
    
    } catch (err) {
      console.error(err);
    }
  }

  //get one folder
  async GetOnefolder(idfolder,iduser) {
    try {

      

        
   return await ArchefModel.find({
    "folder.id" : 437696653})
    
    } catch (err) {
      console.error(err);
    }
  }


  //save folder
  async SaveFolder(iduser, id, namefolder, empollyadd, hystory) {
    try {
      const datarev = await ArchefModel.findOne({ iduser: iduser }, (err, res) => {
        if (res) {
          res.folder.push({
            id: id,
            namefolder: namefolder,
            empollyadd: empollyadd,
            hystory: hystory,
            files:[]
          });

          res.save();
         
        } else {
          console.log("no id user found");
        }
      });
    } catch {
      console.log("not fond ac.");
    }
    }
    
    //get folder by id user

  async getoneusers(iduser) {
    try {
       return await  ArchefModel.findOne({ iduser: iduser });
     
    } catch (err) {
      console.error(err);
    }
  }

    //delet folder by id 

  async deletefolder(iduser, idfolder) {

    try {
      await ArchefModel.findOne({iduser: iduser }, (errr, userr) => {
        if (userr) {

          ArchefModel.updateMany({ iduser: iduser }, { $pull: { "folder": { id: idfolder } } }, { safe: true, upsert: true },
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


  //update folder by id 

  async updatefolder(iduser, idfolder,namefolder,empollyadd,hystory) {

    try {
      await ArchefModel.findOne({iduser: iduser }, (errr, userr) => {
        if (userr) {

          ArchefModel.updateMany({ "folder.id": idfolder },
          {
              $set: {
                "folder.$.namefolder": namefolder,
                "folder.$.empollyadd": empollyadd,
                "folder.$.hystory": hystory,
              
              },
            }, { safe: true, upsert: true },
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

module.exports = FolderUser;
