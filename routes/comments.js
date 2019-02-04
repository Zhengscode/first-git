var express=require("express");
var router = express.Router({mergeParams:true});
var Blog = require("../models/blog");
var Comment = require("../models/comment");
var middleware = require("../middleware");

router.get("/new", middleware.isLoggedIn, function(req, res) {
    Blog.findById(req.params.id, function(err, blog){
        if(err){
            console.log(err);
        } else{
            res.render("comments/new", {blog: blog});
        }
    });
});

router.post("/", middleware.isLoggedIn, function(req, res) {
    Blog.findById(req.params.id, function(err, blog) {
        if(err){
            console.log(err);
            res.redirect("/blogs");
        } else{
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    comment.save();
                    blog.comments.push(comment);
                    blog.save();
                    res.redirect('/blogs/'+blog._id);
                }
            });
        }
    });
}
);

router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else{
            res.redirect("/blogs/" + req.params.id);
        }
    });
});

module.exports = router;