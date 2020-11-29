const mongoose = require("mongoose");
const { Int } = require("mssql");

const ArchefSchema = mongoose.Schema(
  {
    nameuser: {
      type: String,
      require: true,
    },
     iduser: {
      type: String,
      require: true,
    },
    files:[],
    folder:[],
    
    permistoin_users: [],
    role:String
  },
  { timestamps: true }
);

const Archef = mongoose.model("archef", ArchefSchema);

module.exports = Archef;
