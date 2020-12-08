const { Router } = require("express");

const Imovel = require("../models/imovel")

const corretorRIRouter = Router();

corretorRIRouter.post("/", function(req, res) {

Imovel
  .findOneAndRemove({
    ninscricao:req.body.ninscricao
  })
  .then(response => {
    console.log(response)
  })
  .catch(err => {
    console.error(err)
  })

  //
  return res.redirect("corretor");
});

module.exports = corretorRIRouter;
