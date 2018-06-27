module.exports = {
  about(req, res, next){
    res.render("static/about", {title: "Welcome to Bloccit"});
  }
}
