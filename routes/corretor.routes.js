const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../config/upload");
//
const Imovel = require("../models/imovel")

const corretorRouter = Router();
const upload = multer({ storage: uploadConfig.storage });

corretorRouter.post("/", upload.single("avatar"), function (req, res) {
  const { filename, size } = req.file;

  //return res.render("avatar", { image: `/uploads/${filename}`, size });
  //
	let msg = new Imovel({
		tipo:req.body.tipo,
		ndormitorios:req.body.ndormitorios,
		nbanheiros:req.body.nbanheiros,
		ngaragem:req.body.ngaragem,
		endereco:req.body.endereco,
		descricao:req.body.descricao,
		ninscricao:req.body.ninscricao,
		valor:req.body.valor,
		situacao:req.body.situacao,
		imagem0:req.body.imagem0
		})
   
	msg.save()
	.then(doc => {
	console.log(doc)
	})
	.catch(err => {
		console.error(err)
	})
  //
  return res.redirect("corretor");
});

module.exports = corretorRouter;
