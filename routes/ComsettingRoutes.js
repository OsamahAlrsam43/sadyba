const express = require("express");
const router = express.Router();

const photoUpload = require("../uploadimage");

const Comsetting = require("../model/Comsetting");
const companyy = new Comsetting();

const UserModel = require("../model/UsersModel");
const USERS = new UserModel();
const jwt = require("jsonwebtoken");
const reqAuth = require("../auth");
const bcrypt = require("bcrypt");
//get allcom.
router.get("/", async(req, res) => {
    try {
        const getcompany = await companyy.getcompany();
        res.send(getcompany);
    } catch (err) {
        console.error(err);
    }
});

//get com.

router.get("/:id", async(req, res) => {
    try {
        const getcompany = await (
            await companyy.getonecompany(req.params.id)
        ).sort();

        res.send(getcompany);
    } catch (err) {
        console.error(err);
    }
});

const maxage = 3 * 24 * 60 * 60;
const creatoken = (id) => {
    return jwt.sign({ id }, "jana2018", { expiresIn: maxage });
};

//Save company
router.post("/", async(req, res) => {
    try {
        const {
            passusers,
            username,

            nameco,
            email,
            mobail,
            phone,
            address,
            country,
        } = req.body;
        //const getco = await companyss.getonecompanybyname(company);

        const salt = bcrypt.genSalt(10);
        const psw = bcrypt.hash(passusers, salt);

        await companyy.savecompany(
            nameco,
            email,
            mobail,
            phone,
            address,
            country,
            psw,
            username
        );

        const idco = await companyy.getonecompanybyname(nameco);
      //  console.log(idco);
        USERS.saveuser(passusers, username, nameco, idco);

        const token = creatoken(idco);
        console.log(token);

        res.cookie("jwt", token, { httpOnly: true, maxAge: maxage * 1000 });
        res.status(201).json({ idco });
    } catch (err) {
        console.error(err);
    }
});

//const { uploadlogocompany, uploadheadercompany } = photoUpload;

const Multer = require("multer");
let storgelogo = Multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});

//upload image logo company
const uploadlogocompany = Multer({ storage: storgelogo }).fields([{
        name: "logo",
        maxCount: 1,
    },
    {
        name: "headerrp",
        maxCount: 1,
    },
]);

//Update setting company
router.post(
    "/updatesettingcomp",
    reqAuth,
    uploadlogocompany,
    async(req, res) => {
        try {
            const {
                emailusers,
                email,
                mobail,
                phone,
                address,
                country,
                logocom,
                hreportcom,
            } = req.body;

            await companyy.updatesetiing(
                emailusers,
                email,
                mobail,
                phone,
                address,
                country,
                logocom,
                hreportcom
            );
        } catch (err) {
            console.error(err);
        }
    }
);

module.exports = router;