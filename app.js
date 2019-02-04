var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    User = require("./models/user"),
    Blog = require("./models/blog"),
    Comment = require("./models/comment"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    passportLocalMongoose = require("passport-local-mongoose"),
    seedDB = require("./seeds")
    
var commentRoutes = require("./routes/comments"),
    blogRoutes = require("./routes/blogs"),
    indexRoutes = require("./routes/index")
    
//mongoose.connect("process.env.DATABASEURL", {useNewUrlParser: true});  
mongoose.connect("mongodb://Zheng:Min651015@ds147734.mlab.com:47734/personal_file", {useNewUrlParser: true});  

app.use(require("express-session")({
    secret:"Ranggener is a chungener",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
//seedDB();


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//这个用来添加middleware，来确定现在是否已登录
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.use(indexRoutes);
app.use("/blogs", blogRoutes);
app.use("/blogs/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!");
});

