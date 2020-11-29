const mongoose = require("mongoose");

const UserModel = require("./UsersModel");

const Schema = mongoose.Schema;
const accaray = require("./Account.json");

const comanymodel = require("./CompanyesModels");

class Comsetting {
  //save co.
  async savecompany(
    nameco,
    email,
    mobail,
    phone,
    address,
    country,
    emailemailuser,
    passusers,
    username
  ) {
    try {
      await new comanymodel({
        nameco: nameco,
        Comsettingg: [
          {
            name: nameco,
            email: email,
            mobail: mobail,
            phone: phone,
            address: address,
            country: country,
            logo: "logo.png",
            hreport: "Header1.jpg",
          },
        ],
        users: [
          {
            email: emailemailuser,
            password: passusers,
            username: username,
          },
        ],
        accounts: accaray,
      }).save();

      console.log("save company");
    } catch (err) {
      console.error(err);
    }
  }

  async getcompany() {
    try {
      return await comanymodel.find();
      console.log("get company");
    } catch (err) {
      console.error(err);
    }
  }

  async getonecompany(id) {
    try {
      const datarev = await comanymodel.find({ _id: id });

      return datarev;

      console.log("get one company");
    } catch (err) {
      console.error(err);
    }
  }

  async getonecompanybyname(id) {
    try {
      const datarev = await comanymodel.find({ nameco: id });
      return datarev[0]._id;

      console.log(datarev);
    } catch (err) {
      console.error(err);
    }
  }

  //updatae setiing company
  async updatesetiing(
    id,
    email,
    mobail,
    phone,
    address,
    country,
    logocom,
    hreportcom
  ) {
    try {
      const datarev = await comanymodel.findOne({ _id: id }, (err, user) => {
        if (user) {
          const item = user.Comsettingg[0];
          item.email = email;
          item.mobail = mobail;
          item.phone = phone;
          item.country = country;
          item.address = address;
          item.logo = logocom;
          item.hreport = hreportcom;
          user.save();
          console.log(user.Comsettingg[0]);
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  //add new accounts
  async addacount(
    id,
    AccID,
    Accame,
    AccParet,
    AccClass,
    AccLevel,
    Accature,
    AccStatemet,
    IsParet,
    OpeBalDr,
    OpeBalCr,
    idacc
  ) {
    try {
      const datarev = await comanymodel.findOne({ _id: id }, (err, user) => {
        if (user) {
          user.accounts.push({
            AccID,
            Accame,
            AccParet,
            AccClass,
            AccLevel,
            Accature,
            AccStatemet,
            IsParet,
            OpeBalDr,
            OpeBalCr,
            idacc,
          });

          user.save();
          console.log("save acc");
        } else {
          console.log("no com found");
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  //updata accounts
  async updateacount(
    idco,
    AccID,
    Accame,
    AccParet,
    AccClass,
    AccLevel,
    Accature,
    AccStatemet,
    IsParet,
    OpeBalDr,
    OpeBalCr,
    idacc
  ) {
    try {
      await comanymodel.findOne({ _id: idco }, (err, userr) => {
        if (userr) {
          comanymodel.updateOne(
            { "accounts.id": idacc },
            {
              $set: {
                "accounts.$.AccID": AccID,
                "accounts.$.Accame": Accame,
                "accounts.$.AccParet": AccParet,
                "accounts.$.AccClass": AccClass,
                "accounts.$.AccLevel": AccLevel,
                "accounts.$.Accature": Accature,
                "accounts.$.AccStatemet": AccStatemet,
                "accounts.$.IsParet": IsParet,
                "accounts.$.OpeBalDr": OpeBalDr,
                "accounts.$.OpeBalCr": OpeBalCr,
              },
            },
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                console.log(result);
              }
            }
          );
        }
      });
    } catch (err) {
      console.error(err);
    }
  }

  //delete accounts
  //updata accounts
  async deletcount(
    idco,

    idacc
  ) {
    try {
      await comanymodel.findByIdAndUpdate(
        { _id: idco },
        { $pull: { accounts: { id: idacc } } },
        function (err, model) {
          if (err) {
            console.log(err);
            //return res.send(err);
          }
          console.log("delext acc");

          // return res.json(model);
        }
      );
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = Comsetting;
