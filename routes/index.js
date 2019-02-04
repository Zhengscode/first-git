var express=require("express");
var router = express.Router();
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
    res.render("pages/home");
});

router.get("/loverouter", function(req, res) {
    res.render("pages/love");
});

router.get("/skills", function(req, res){
    res.render("pages/skills");
});
router.get("/past", function(req, res) {
    res.render("pages/past");
});
router.get("/journey", function(req, res) {
    res.render("pages/journey")
})


router.post("/register", function(req, res){
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



router.post("/login", passport.authenticate("local",{
    successRedirect:"/garden",
    failureRedirect:"/fool"
}), function(req, res){
});

router.get("/fool", function(req, res) {
    res.render("pages/fool");
});

router.get("/wonderland", function(req, res) {
    res.render("pages/wonderland");
});

router.get("/garden", isLoggedIn, function(req, res) {
    res.render("pages/garden");
});

router.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});
router.get("/needlogin", function(req, res) {
    res.render("pages/needlogin");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/needlogin");
}

module.exports = router;