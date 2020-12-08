const express = require('express')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const app = express()
const mongoose = require("mongoose")
const passport = require("passport")
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")
const User = require("./models/user")
//
const Imovel = require("./models/imovel")

const port = process.env.PORT || 3300

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(bodyParser.urlencoded(
      { extended:true }
))

app.use(express.static(__dirname + '/public'))
app.listen(port, () => {
    console.log(`servidor rodando em http://localhost:${port}`)
})

//
mongoose.connect("mongodb://localhost/imobiliaria_dev");

app.use(require("express-session")({
    secret:"imobiliarius", //decode or encode session
    resave: false,          
    saveUninitialized:false    
}));

passport.serializeUser(User.serializeUser()); //session encoding
passport.deserializeUser(User.deserializeUser()); //session decoding
passport.use(new LocalStrategy(User.authenticate()));

app.use(passport.initialize());
app.use(passport.session());
//

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.get('/', (req, res) => {
    
    return Imovel.find( function( err, imovel ) {
		if( !err ) {
			res.render('home', {
			  imoveis: imovel
			});
		} else {
			return console.log( err );
		}
	}); 

})

app.get("/inquilino",isLoggedIn ,(req,res) =>{
//app.get('/inquilino', (req, res) => {
    res.render('inquilino', {
		})
})

app.get("/corretor",isLoggedIn ,(req,res) =>{
//app.get('/corretor', (req, res) => {
	return Imovel.find( function( err, imovel ) {
		if( !err ) {
			res.render('corretor', {
			  imoveis: imovel
			});
		} else {
			return console.log( err );
		}
	}); 
})

//app.post('/corretor', (req, res) => {
    //let msg = new Imovel({
		//tipo:req.body.tipo,
		//ndormitorios:req.body.ndormitorios,
		//nbanheiros:req.body.nbanheiros,
		//ngaragem:req.body.ngaragem,
		//endereco:req.body.endereco,
		//descricao:req.body.descricao,
		//ninscricao:req.body.ninscricao,
		//valor:req.body.valor,
		//situacao:req.body.situacao,
		//imagem0:req.body.imagem0
		//})
   
	//msg.save()
	//.then(doc => {
	//console.log(doc)
	//})
	//.catch(err => {
		//console.error(err)
	//})
   
	//res.render('corretor')
//})

//
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",passport.authenticate("local",{
    successRedirect:"/",
    failureRedirect:"/login"
}),function (req, res){

});

app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",(req,res)=>{
    
    User.register(new User({username: req.body.username,type: 'inquilino',telephone: req.body.telephone}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            res.render("register");
        }
    passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
    })
    })
})

app.get("/logout",(req,res)=>{
    req.logout();
    res.redirect("/");
});

//
//app.get("/upload", function (req, res) {
//  res.render("upload");
//});

const uploadConfig = require("./config/upload");
const corretorRouter = require("./routes/corretor.routes");
//
const corretorRIRouter = require("./routes/corretor-ri");

app.set("views", "./views");
app.use("/uploads", express.static(uploadConfig.uploadFolder));

app.use("/corretor-r", corretorRouter);
//
app.use("/corretor-r-ri", corretorRIRouter);
//
