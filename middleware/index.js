var comment = require("../models/comment"),
    post = require("../models/post"),
    user = require("../models/user"),
    like = require("../models/like");
//Middleware
var middlewareObj = {};

middlewareObj.isLoggedIn = function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
            
        }
        req.session.redirectTo = req.originalUrl;
        req.flash("error", "Please Login !!");
        res.redirect("/login");
    };
 
middlewareObj.checkowner = function checkowner(req,res,next) {
    if(req.isAuthenticated()){
        post.findById(req.params.id, (err, foundpost) => {
            if(err || !foundpost) {
                res.render("error");
            } else {
                if(foundpost.profile.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("error", "Permission Not Granted");
                    res.redirect('/post' + req.params.id);
                }
            }
        });  
    } else {
        req.flash("error", "Please Login First!");
        res.redirect('/login');
    }
};
middlewareObj.checkownercomment = function(req, res, next){
        if(req.isAuthenticated()){
            comment.findById(req.params.commentid, function(err, com){
                if(err || !com) {
                res.render("error");
            } else {
                if(com.profile.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("error", "Permission Not Granted");
                    res.redirect('/post' + req.params.id);
                }
            }
        });  
    } else {
        req.flash("error", "Please Login First!");
        res.redirect('/login');
    }
};

middlewareObj.checkownerlike = function(req, res, next){
        if(req.isAuthenticated()){
            like.findById(req.params.likeid, function(err, com){
                if(err || !com) {
                res.render("error");
            } else {
                if(com.profile.id.equals(req.user._id)){
                    return next();
                } else {
                    req.flash("error", "Permission Not Granted");
                    res.redirect('/post' + req.params.id);
                }
            }
        });  
    } else {
        req.flash("error", "Please Login First!");
        res.redirect('/login');
    }
};

module.exports = middlewareObj;