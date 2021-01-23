//create express app
const exp = require("express");
const app = exp();
const path = require("path");
const mongoClient=require("mongodb").MongoClient;

//get DB url
const dbUrl="mongodb+srv://hyd2020:3LIGCgz3mByzKFz2@cluster0.sceyo.mongodb.net/dbfordemo?retryWrites=true&w=majority";

//connect angular build with server
app.use(exp.static(path.join(__dirname, './dist/CompleteMEANApp')));

//import api objects
const userApiObj=require("./APIS/userApi");
const adminApiObj=require("./APIS/adminApi");
const userRouteObj = require("./APIS/userApi");


//redicting req objec to APIS
app.use("/user",userRouteObj);
app.use("/admin",adminApiObj);


//error handling
app.use((req,res,next)=>{
    res.send({message:"Path does't exist"})
})

app.use((err,req,res,next)=>{
    res.send({message:"Something went wrong"})
})


//connect to db
mongoClient.connect(dbUrl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{
    //get db object
    const dbobj=client.db("dbfordemo");

    //get collection objects
    const userCollectionObject=dbobj.collection("usercollection");
    const adminCollectionObject=dbobj.collection("admincollection");

    //add collection object to app object
    app.set("userCollectionObject",userCollectionObject);
    app.set("adminCollectionObject",adminCollectionObject);

    console.log("db started")
})
.catch(err=>console.log("err in db connection",err))




//assig port number
const port = 3000;
app.listen(port, () => console.log(`server listning on port ${port}`))