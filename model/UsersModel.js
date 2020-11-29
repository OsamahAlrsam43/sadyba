const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const ArchefModel = require("./ArchefModels");
const Archef = new ArchefModel();

const usersSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  iduser: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
    require: true,
  },
  address: {
    type: String,
    require: true,
  },
  state: {
    type: String,
    default: "فعال"
  },
  role: {
     type: String,
    default: "مستخدم"
  },
  permistoin_users: [],
},
  { timestamps: true });

const usermodel = mongoose.model("users", usersSchema);

//OOP

class User {
  async saveuser(username,iduser, password,phone,address,state,roleuser,per) {
    try {
     
      await new usermodel({
 username: username,
        iduser: iduser,
        password: password,
        phone: phone,
        address: address,
        state: state,
        role: roleuser,
        permistoin_users:per 

      }).save();


       const dt = [{ id: Math.floor(Math.random() * 1235698784), namefolder: "عام", empollyadd: "", hystory: "",files:[] },{ id: Math.floor(Math.random() * 569984752), namefolder: "جاري", empollyadd: "", hystory: "",files:[] }];

      await new ArchefModel({
       
        iduser: iduser,
        files:[{}],
        folder: dt,
      }).save();
      
     
    } catch (err) {
      console.error(err);
    }
  }

  async saveuserc(iduser,) {
    try {
      const dt = [{ id: Math.floor(Math.random() * 1235698784), namefolder: "عام", empollyadd: "", hystory: "",files:[] },{ id: Math.floor(Math.random() * 569984752), namefolder: "جاري", empollyadd: "", hystory: "",files:[] }];

      await new ArchefModel({
       
        iduser: iduser,
        files:[{}],
        folder: dt,
      }).save();
      
    } catch (err) {
      console.error(err);
    }
  }


  async updateusers(iduser, username, password, phone, address,state,roleuser,addper,updateper,deleteper,addfolder,updatefolder,deletfolder,showusers,deleteusers,updateusers,addfolderall,deletallusers,adduser) {
    try {
      return await usermodel.updateOne(
        { iduser: iduser },
        {
          $set: {
        username: username,
        password: password,
        phone: phone,
            address: address,
            state: state,
                role:roleuser,
  permistoin_users: [{ add:addper, show: showusers, update:updateper, delete: deleteper,addfolder:addfolder,updatefolder:updatefolder,deletfolder:deletfolder,deleteusers:deleteusers,updateusers:updateusers,addfolderall:addfolderall,deletallusers:deletallusers,adduser:adduser }],
          },
        }
      );
      console.log(`update users ${iduser}`);
    } catch (err) {
      console.error(err);
    }
  }

  async getallusers() {
    try {
      return await usermodel.find();
     
    } catch (err) {
      console.error(err);
    }
  }


  async getoneusers(iduser) {
    try {
       return await usermodel.findOne({ iduser: iduser });

    //  console.log(user);
     
    } catch (err) {
      console.error(err);
    }
  }

    async getuserforlogin(iduser,passuser) {
    try {

      const account = await usermodel.findOne({ iduser: iduser });
      console.log(account)
 if (!account ) {
        // authentication failed
        return "usernot";
 }
 
     else if ( passuser !== account.password) {
 return "passnot";
 }
 else if ( account.state === "متوقف") {
 return "statenot";
 }  
   
 else {
        // authentication successful
              return await usermodel.findOne({ iduser: iduser});

    }
    //  console.log(user);
     
    } catch (err) {
      console.error(err);
    }
  }

  async getdetailsuser(iduser) {
    try {
       return await ArchefModel.findOne({ iduser: iduser });

    //  console.log(user);
     
    } catch (err) {
      console.error(err);
    }
  }

  



  async deleteuser(iduser) {
    try {
      await usermodel.deleteOne({ iduser: iduser });
       await   ArchefModel.deleteOne({ iduser: iduser });
      console.log(`delet  users ${iduser}`);
    } catch (err) {
      console.error(err);
    }
  }

  async deletalluser(iduser) {
    try {
      await usermodel.deleteMany({iduser: iduser ,role:"مستخدم"});
       await   ArchefModel.deleteOne({ iduser: iduser });
    //  console.log("delet all users");
    } catch (err) {
      console.error(err);
    }
  }
}



module.exports = User;
