var express=require("express");
var router = express.Router();
var Blog = require("../models/blog");
var middleware = require("../middleware");

router.get("/", function(req, res) {
    Blog.find({}, function(err, allBlogs){
        if(err){
            console.log(err);
        } else{
            res.render("blog/blogs", {blogs: allBlogs});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    var name= req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newBlog = {name: name, image: image, description: desc, author: author};
    Blog.create(newBlog, function(err, newCreated){
        if(err){
            console.log(err);
        } else{
            res.redirect("/blogs");
        }
    });
});

router.get("/new", middleware.isLoggedIn, function(req, res) {
    res.render("blog/new");
});

router.get("/:id", function(req, res) {
    Blog.findById(req.params.id).populate("comments").exec(function(err, foundBlog){
        if(err){
            console.log(err);
        } else{
            res.render('blog/show', {blog: foundBlog});
        }
    });
});

router.get("/:id/edit", middleware.checkBlogOwnership, function(req, res) {
        Blog.findById(req.params.id, function(err, foundBlog) {
            res.render("blog/edit", {blog: foundBlog});
        });
});

router.put("/:id", middleware.checkBlogOwnership, function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

router.delete("/:id", middleware.checkBlogOwnership, function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/blogs");
        } else {
            res.redirect("/blogs");
        }
    });
});


module.exports = router;