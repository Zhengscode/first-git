var express = require("express"),
    app = express(),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    User = require("./models/user"),
    Comment = require("./models/comment"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    seedDB = require("./seeds")
    
//mongoose.connect("mongodb://localhost:27017/personalfile", {useNewUrlParser: true});  
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
seedDB();


passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.get("/", function(req, res){
    res.render("pages/home");
});

app.get("/skills", function(req, res){
    res.render("pages/skills");
});
app.get("/past", function(req, res) {
    res.render("pages/past");
});
app.get("/journey", function(req, res) {
    res.render("pages/journey")
})


app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            console.log(err);
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/");
        });
    });
});



app.post("/login", passport.authenticate("local",{
    successRedirect:"/garden",
    failureRedirect:"/fool"
}), function(req, res){
});

app.get("/fool", function(req, res) {
    res.render("pages/fool");
});

app.get("/wonderland", function(req, res) {
    res.render("pages/wonderland");
});

app.get("/garden", isLoggedIn, function(req, res) {
    res.render(Comment.find({}, function(err, allComments){
        if(err){
            console.log(err);
        } else{
            res.render("pages/garden",{comments:allComments});
        }
        })
    )});

app.get("/garden/new", isLoggedIn, function(req, res) {
    res.render("comments/new"), {currentUser: req.user.username};
})

app.post("/garden", isLoggedIn, function(req, res) {
    Comment.create(req.body.comment), function(err, comment){
        if(err){
            console.log(err);
        } else{
            comment.author.id=req.user._id;
            comment.author.username=req.user.username;
            comment.save();
            
        }
    }
})

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});
app.get("/needlogin", function(req, res) {
    res.render("pages/needlogin");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/needlogin");
}

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started!");
});

