const advertQueries = require("../db/queries.adverts.js");

module.exports = {
  index(req, res, next){
    advertQueries.getAllTopics((err, adverts) => {
      if(err){
        res.redirect(500, "static/index");
      } else {
        res.render("adverts/index", {adverts});
      }
    })
  },
  new(req, res, next){
    res.render("adverts/new");
  },
  create(req, res, next){
    let newTopic = {
      title: req.body.title,
      description: req.body.description
    };
    advertQueries.addTopic(newTopic, (err, advert) => {
      if(err){
        res.redirect(500, "/adverts/new");
      } else {
        res.redirect(303, `/adverts/${advert.id}`);
      }
    });
  },
  show(req, res, next){

    advertQueries.getTopic(req.params.id, (err, advert) => {

      if(err || advert == null){
        res.redirect(404, "/");
      } else {
        res.render("adverts/show", {advert});
      }
    });
  },
  destroy(req, res, next){
    advertQueries.deleteTopic(req.params.id, (err, advert) => {
      if(err){
        res.redirect(500, `/adverts/${advert.id}`)
      } else {
        res.redirect(303, "/adverts")
      }
    });
  },
  edit(req, res, next){
    advertQueries.getTopic(req.params.id, (err, advert) => {
      if(err || advert == null){
        res.redirect(404, "/");
      } else {
        res.render("adverts/edit", {advert});
      }
    });
  },
  update(req, res, next){

    advertQueries.updateTopic(req.params.id, req.body, (err, advert) => {

      if(err || advert == null){
        res.redirect(404, `/adverts/${req.params.id}/edit`);
      } else {
        res.redirect(`/adverts/${advert.id}`);
      }
    });
  }
}
