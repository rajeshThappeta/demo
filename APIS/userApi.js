//create user router object
const exp = require("express");
const userRouteObj = exp.Router();

//import cloudinary modules
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');


//configure cloudinary
cloudinary.config({
    cloud_name: "djqbwmvjg",
    api_key: "492171555336437",
    api_secret: "OO5HtI8g0gpuIZyjR3m1jXa9-KE"
});




//configure storage setting
var clStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'testfolder',
        format: async (req, file) => 'png', // supports promises as well
        public_id: (req, file) => file.fieldname + '-' + Date.now(),
      },
});


//configute multer
var multerObj = multer({ storage: clStorage });

//import bcrypt
const bcrypt = require("bcryptjs");
//import jsonwebtoken
const jwt = require("jsonwebtoken")

//import token verification
const checkToken = require("../tokenverification/verifyToken")

//body parsing middleware
userRouteObj.use(exp.json());

//create user route handler
userRouteObj.post("/register", multerObj.single("photo"), (req, res) => {

    //get image cdn link from cloudinary
    let profilepic = req.file.path;
    console.log("profile pic",profilepic)
        //console.log("image url is ", req.file)
   
    console.log("req body is ",req.body.userObject)

    let user = JSON.parse(req.body.userObject)
    console.log("user is ",user)
    user.image = profilepic;

    const userObj = user;

   

    //get userCollectionObj
    const userCollectionObject = req.app.get("userCollectionObject");

    userCollectionObject.findOne({ username: userObj.username })
        .then(userObject => {
            if (userObject == null) {

                //hash password
                bcrypt.hash(userObj.password, 6).then(
                    hashedPassword => {
                        //replace plain text pw with hashed pw
                        userObj.password = hashedPassword;
                        userCollectionObject.insertOne(userObj)
                            .then((success) => {
                                res.send({ message: "user registration is success" })
                            }
                            )
                    }

                )
                    .catch(err => console.log("err in inserting", err))

            }
            else {
                res.send({ message: "username already taken..try with another one" })
            }
        })
        .catch(
            err => console.log("err in reading user", err)
        )
})





//user login
userRouteObj.post("/login", (req, res) => {

    let userCredentialsObject = req.body;
    console.log(userCredentialsObject);

    //search user by username


    //get userCollectionObj
    const userCollectionObject = req.app.get("userCollectionObject");
    userCollectionObject.findOne({ username: userCredentialsObject.username }, (err, userObj) => {
        if (err) {
            console.log(err)
        }
        else if (userObj == null) {
            res.send({ message: "invalid username", status: "failed" })
        }
        else {
            //compre passwords
            bcrypt.compare(userCredentialsObject.password, userObj.password, (err, result) => {
                if (err) {
                    console.log(err)
                }
                else if (result == false) {
                    res.send({ message: "invalid password", status: "failed" })
                }
                else {
                    //generate token and send it to client
                    jwt.sign({ username: userObj.username }, "secret", { expiresIn: 120 }, (err, signedToken) => {
                        if (err) {
                            console.log(err)
                        }
                        else {
                            res.send({ message: signedToken, username: userObj.username, status: "success" })
                        }
                    })

                }
            })
        }
    })




})








//read a user by username
userRouteObj.get("/read/:username", (req, res) => {
    let usernameFromClient = req.params.username;

    //get userCollectionObj
    const userCollectionObject = req.app.get("userCollectionObject");
    //find user
    userCollectionObject.findOne({ username: usernameFromClient })
        .then(userObj => {
            res.send({ message: userObj })
        })
        .catch(
            err => {
                console.log(err)
            }
        )

})




//user profile update route
userRouteObj.put("/update", (req, res) => {
    let modifiedUserObject = req.body;
    //get userCollectionObj
    const userCollectionObject = req.app.get("userCollectionObject");

    userCollectionObject.updateOne({ username: modifiedUserObject.username }, {
        $set: { name: modifiedUserObject.name, email: modifiedUserObject.email, dob: modifiedUserObject.dob }
    })
        .then(() => {
            userCollectionObject.findOne({ username: modifiedUserObject.username })
                .then(latestUserObj => {

                    res.send({ message: "update success", userObj: latestUserObj })
                }
                )
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))


})



//user profile delete route
userRouteObj.delete("/delete/:username", (req, res) => {
    //deleteOne()
})




//read all users
userRouteObj.get("/users", checkToken, (req, res) => {
    //get userCollectionObj
    const userCollectionObject = req.app.get("userCollectionObject");
    userCollectionObject.find().toArray()
        .then(usersArray => res.send({ message: "success", users: usersArray }))
        .catch(err => {
            res.send({ message: "error" })
        })

})



//export 
module.exports = userRouteObj;