const express = require("express");
const { read } = require("fs-extra");
const router = express.Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../model/UsersModel");
const User = new UserModel();



//get users
router.get("/", async (req, res) => {
  try {
    const getuser = await User.getallusers();
    res.send(getuser);
    //  console.log(await User.getallusers());
  } catch (err) {
    console.error(err);
  }
});

//get users
router.post("/:id", async (req, res) => {
  try {
     const getuser = await User.getoneusers(req.params.id);
     
    res.send(getuser);
    //  console.log(await User.getallusers());
  } catch (err) {
    console.error(err);
  }
});



const maxage = 3 * 24 * 60 * 60;
const creatoken = (id) => {
  return jwt.sign({ id }, "jana2018", { expiresIn: maxage });
};

router.post("/login/:iduser&:passuser", async (req, res) => {
  const getuser = await User.getuserforlogin(req.params.iduser, req.params.passuser);
  console.log(getuser)
  if (getuser=="usernot") {
     res.status(201).send({ message:"رقم المستخدم خطا"})
  }

  else if (getuser == "passnot") {
    res.status(201).send({ message: "كلمة مرور المستخدم خطا" })
  }
    
      else if (getuser == "statenot") {
    res.status(201).send({ message: "تم ايقاف هذا الحساب يرجى التواصل معنا" })
  }
    
  else
  {
      const UserIdu = getuser.iduser
  const token = creatoken(getuser.iduser);

    res.status(200).send({ token: token, iduser: getuser.iduser })
    }
 

  
  
 
 

})
//get one users
router.post("/loginkk", async (req, res) => {
  try {
    const { iduser, passuser } = req.body;
    console.log(req.body)
       //  const getuser = await User.getoneusers(iduser);
    const getuser = await User.getuserforlogin(iduser,passuser);
  const UserIdu = getuser.iduser
    const token = creatoken(getuser);
    res.send({ token:token  })
    res.header("x-auth-token", token).json({  UserIdu,token  });

   res.cookie("jwt", token, { httpOnly: true, maxAge: maxage * 1000 });
  } catch (err) {
    console.error(err);
  }
});

//get one users
router.post("/userid/:id", async (req, res) => {
  try {
   
    
     res.send(await User.getdetailsuser(req.params.id));
  } catch (err) {
    console.error(err);
  }
});


//Save users
router.post("/", async (req, res) => {
  try {
    const {iduser, username, password, phone, address,state,roleuser} = req.body;

    const per= []
   if(roleuser == "مدير نظام") {
            per.push({ add: "نعم", show: "نعم", update: "نعم", delete: "نعم", addfolder: "نعم", updatefolder: "نعم", deletfolder: "نعم",deleteusers:"نعم",updateusers:"نعم",addfolderall:"نعم",deletallusers:"نعم",adduser:"نعم" })
      }
      
       else {
         per.push({
             add: "نعم", show: "لا", update: "لا", delete: "لا", addfolder: "لا", updatefolder: "لا", deletfolder: "لا",deleteusers:"لا",updateusers:"لا",addfolderall:"لا",deletallusers:"لا",adduser:"لا" 
          })
    }
    
    await User.saveuser(username,iduser,password,phone,address,state,roleuser,per)
   //await User.saveuserc(iduser);
   
    console.log("save users")
  } catch (err) {
    console.error(err);
  }
});

//Update user
router.put("/", async (req, res) => {
  try {
    const { iduser, username, password, phone, address,state ,role,addper,updateper,deleteper,addfolder,updatefolder,deletfolder,showusers,deleteusers,updateusers,addfolderall,deletallusers,adduser} = req.body;

    await User.updateusers(iduser, username, password, phone, address,state,role,addper,updateper,deleteper,addfolder,updatefolder,deletfolder,showusers,deleteusers,updateusers,addfolderall,deletallusers,adduser);
  } catch (err) {
    console.error(err);
  }
});




//Delete user
router.delete("/:id", async (req, res) => {
  try {
    await User.deleteuser(req.params.id);
  } catch (err) {
    console.error(err);
  }
});


//Delete all user
router.delete("/", async (req, res) => {
  try {
    const { iduser} = req.body;
    console.log(iduser)
    await User.deletalluser(iduser);
  } catch (err) {
    console.error(err);
  }
});

//Delete all user
router.post("/deluser/:iduser", async (req, res) => {
  try {
    const { iduser} = req.body;
    //console.log(req.params.iduser)
 
    await User.deletalluser(req.params.iduser);
  } catch (err) {
    console.error(err);
  }
});

module.exports = router;
