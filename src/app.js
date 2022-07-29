const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const port = process.env.PORT || 3000;
require("./db/conn.js");
const Register = require("./models/regis");

const static_path = path.join(__dirname,"../public");
const style_path = path.join(__dirname,"../public/Style.css");
const views_path = path.join(__dirname,"../templates/views");
const partials_path = path.join(__dirname,"../templates/partials");
const videos_path = path.join(__dirname, "../public/videos");


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static(static_path));
app.use(express.static(style_path));
app.use(express.static(videos_path));
app.set("view engine", "hbs");
app.set("views", views_path);
hbs.registerPartials(partials_path);

app.get("/", (req,res)=>{
    res.render("index");
})


app.get("/register",(req,res)=>{
    res.render("register")
})

app.get("/login",async (req,res)=>{
    res.render("login");
})

app.post("/register",async (req,res)=>{
    try{
        const password = req.body.psw;
        const cpassword = req.body.pswrepeat;
        if(password == cpassword){
            const userRegister = new Register({
                name : req.body.name,
                email : req.body.email,
                psw : req.body.psw,
                pswrepeat : req.body.pswrepeat
            }) 
            const rdetails = await userRegister.save();
            res.status(201).render("index");
        }else{
            alert("Invalid details...Please ReEnter the details");
        }
    }catch(e){
        res.status(400);
        res.send(e);
    }
})

app.post("/login", async (req,res)=>{
    try{
        const email = req.body.email;
        const pass = req.body.psw;
        
        const userEmail = await Register.findOne({email:email})
        /*res.send(userEmail);
        console.log(userEmail);*/
        if(userEmail.psw == pass){
            res.status(201).render("index");
        }
        else{
            alert("You entered wrong invalid details.. Please Re-enter the details");
        }
    }catch(e){
        res.status(400).send("invalid email");
    }
})
app.listen(port,()=>{
    console.log('server is running at port no ${port}');
})