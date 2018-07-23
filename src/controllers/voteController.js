const voteQueries = require("../db/queries.votes.js");

module.exports = {
  upvote(req, res, next){

    if(req.user){
      voteQueries.createVote(req, 1, (err, vote) => {
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });

    } else {
      req.flash("notice", "You must be signed in to upvote.")
      res.redirect(req.headers.referer);
    }
  },
  downvote(req, res, next){

    if(req.user){
      voteQueries.createVote(req, -1, (err, vote) => {
        if(err){
          req.flash("error", err);
        }
        res.redirect(req.headers.referer);
      });
    } else {
      req.flash("notice", "You must be signed in to downvote.")
      res.redirect(req.headers.referer);
    }
  }
}
