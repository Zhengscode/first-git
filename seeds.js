var mongoose= require("mongoose");
var Comment = require("./models/comment");

var data=[
    {
        text:"Welcome to my garden, this is a place to share ideas. For this moment it only supports pictures and text, yet you will be able to share almost everything here in the near future ",
        image:"https://images.unsplash.com/photo-1536560035542-1326fab3a507?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        author: "Zheng"
    }
    ]
    
function seedDB(){
    
        data.forEach(function(seed){
            Comment.create(seed, function(err, comment){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a new idea!");
                }
            })
        }
    )}
    
module.exports = seedDB;