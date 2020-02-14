//jshint esversion:6

var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require("ejs");

// const registerContent = "Register";
// const loginContent = "Log in";

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
	database : 'nodelogin',
	multipleStatements: true
});

connection.connect(function(err){
  if (err) throw err;
	console.log("Connected to DATABASE");
});


//folosesc express ca sa adaug datele din formulare in baza de date
const app = express();
app.set('view engine', 'ejs');

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get('/', function(request, response) {
	// response.sendFile(path.join(__dirname + '/login.html'));
	// response.render("register", {registerContent: registerContent});
	response.render("register");
});

app.get("/register", function(request, response){
	response.render("register");
});

app.get("/login", function(request, response){
	response.render("login");
});


app.post('/auth', function(request, response) {
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/welcome');
			} else {
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post("/submit", function(req, res){

  //console.log(req.body);



  var sql = "INSERT INTO accounts VALUES(null,'"+ req.body.prenume +"', '"+ req.body.username +"' ,'"+ req.body.password +"', '"+ req.body.email +"', '"+ req.body.mobile +"')";
  connection.query(sql, function (err) {
    if (err) throw err;

		var sql2 = "INSERT INTO adresa VALUES(null,'"+ req.body.judet +"', '"+ req.body.oras +"' ,'"+ req.body.strada +"', '"+ req.body.numarul +"')";
		connection.query(sql2, function (err) {
			if (err) throw err;

	    res.render("authentification",
	      {title: "Date salvate",
	      message: "Cont creat cu succes."
	      });
  	});
});

  //connection.end();

});

app.get('/welcome', function(request, response) {
	if (request.session.loggedin) {
		// response.send('Welcome back, ' + request.session.username + '!');
		response.render("authentification",
		{title: "Welcome back, " + request.session.username + "!",
		message: "Spor la cumparaturi !"
		});
		//dupa trebuie sa ii dau redirect pe pagina cu produsele
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get("/add", function(req, res){
  res.render("add");
});

app.post("/add", function(req, res){
	var sql = "INSERT INTO produse VALUES(null,'"+ req.body.numeProdus +"', '"+ req.body.modelProdus +"', '"+ req.body.descriereProdus +"' ,'"+ req.body.stoc +"', '"+ req.body.firma +"', '"+ req.body.price +"','"+ req.body.color +"', null)";

	connection.query(sql, function (err) {
    if (err) throw err;
    res.render("authentification",
      {title: "Date salvate",
      message: "Produs adaugat cu succes."
      });
  });
});

app.get("/delete", function(req, res){
  res.render("delete");
});

app.post("/delete", function(req, res){
	var sql = "DELETE FROM produse WHERE name = '"+ req.body.numeProdus +"' AND model = '"+ req.body.modelProdus +"' ";

	connection.query(sql, function (err) {
    if (err) throw err;
    res.render("authentification",
      {title: "Date salvate",
      message: "Produs sters cu succes."
      });
  });
	});


	app.get("/deleteUser", function(req, res){
	  res.render("deleteUser");
	});

	app.post("/deleteUser", function(req, res){
		var sql = "DELETE FROM accounts WHERE username = '"+ req.body.numeClient +"' ";

		connection.query(sql, function (err) {
	    if (err) throw err;
	    res.render("authentification",
	      {title: "Date salvate",
	      message: "Cont client eliminat cu succes."
	      });
	  });
		});

		//Select produse
	app.get("/main", function(request, response){
		//response.render("main");
		 let sql = "SELECT * FROM produse";
		 connection.query(sql, function(err, result, fields){
			if(err) throw err;
		   response.render("main");
			});
		});

	app.get("/produs", function(req, res){
		res.render("produs");
	});

	// app.get("/produs/:postName", function(req, res){
	//   //const requestedPostName = req.params.postName;
	//
	// 	let sql = "SELECT * FROM produse WHERE name ='"+ req.params.postName +"' ";
	// 	connection.query(sql, function(err, result, fields){
	// 		if(err) throw err;
	// 		res.render("produs",
	// 		{nume: result[0].name,
	// 		firma: result[0].firma,
	// 		descriere: result[0].description,
	// 		stoc: result[0].stoc,
	// 		pret: result[0].price
	// 		});
	// 	});
	// });

	app.get("/produs/:postName", function(req, res){
	  //const requestedPostName = req.params.postName;

		let sql = "SELECT * FROM produse WHERE name ='"+ req.params.postName +"' ";
		connection.query(sql, function(err, result, fields){
			if(err) throw err;

			//for(let i = 0; i< result.length; i++)
			// console.log(result[i].name);

			// res.render("produs",
			// {nume: result[0].name,
			// firma: result[0].firma,
			// descriere: result[0].description,
			// stoc: result[0].stoc,
			// pret: result[0].price
			// });

			res.render("produs",
			{title: "Test Table",
			data: result
			});

	});
});

app.get("/parola", function(req, res){
  res.render("parola");
});

// Da undefined la parola !!!!!!!!!!!!!!!
app.post("/parola", function(req, res){
  var sql = "UPDATE accounts SET password = '"+ req.body.pass +"' WHERE username = '"+ req.body.user +"' " ;
	connection.query(sql, function (err, result) {
    if (err) throw err;
		res.render("authentification",
			{title: "Date salvate",
			message: "Parola schimbata cu succes."
			});
  });
});

app.get("/mail", function(req, res){
  res.render("mail");
});

app.post("/mail", function(req, res){
  var sql = "UPDATE accounts SET email = '"+ req.body.mail +"' WHERE username = '"+ req.body.user +"' " ;
	connection.query(sql, function (err, result) {
    if (err) throw err;
		res.render("authentification",
			{title: "Date salvate",
			message: "Email schimbat cu succes."
			});
  });
});

app.get("/date_produse", function(req, res){
  res.render("date_produse");
});

app.post("/date_produse", function(req, res){
  var sql = "UPDATE produse SET "+ req.body.modificare +" = '"+ req.body.schimba +"' WHERE model = '"+ req.body.model +"' AND name = '"+ req.body.nume +"' " ;
	connection.query(sql, function (err, result) {
    if (err) throw err;
		res.render("authentification",
			{title: "Date salvate",
			message: "Date modificate cu succes."
			});
  });
});

app.get("/shopping", function(req, res){
	// let sql = "SELECT * from detalii_comanda JOIN comanda ON detalii_comanda.id_comanda = comanda.id_comanda JOIN produse ON detalii_comanda.id_produs = produse.id_produs JOIN categorie ON produse.id_categorie = categorie.id_categorie JOIN accounts ON comanda.id_user = accounts.id_user ";
	var sql = "select distinct * from detalii_comanda JOIN produse ON detalii_comanda.id_produs = produse.id_produs WHERE id_comanda = (select max(id_comanda) from comanda where id_user = '1')";
	connection.query(sql, function (err, result) {
		if(err) throw err;
		// console.log(result);

		res.render("shopping",
		{title: "Test Table",
		data: result,
		});

});
});

/////////// ??
app.post("/produs", function(req, res){
	var sql = "SELECT * from produse WHERE model = '"+ req.body.modelProdus +"' AND color = '"+ req.body.modelCuloare +"'  ";
	connection.query(sql, function (err, result) {
		if(err) throw err;

		var sql2 = "INSERT INTO detalii_comanda VALUES(null,'52','"+ result[0].id_produs +"', '"+ req.body.cantitate +"')";
		var n = result[0].name;
		connection.query(sql2, function (err) {
			res.redirect('/produs/'+ n+' ');
		});

	});
});

app.get("/checkout", function(req, res){
	res.render("authentification",
		{title: "Date salvate",
		message: "Comanda dumneavoastra a fost efectuata cu succes si urmeaza sa fie procesata."
		});
});


//INTREBARE CA NU MI ARATA ACELASI NR DE COMANDA
app.post("/shopping", function(req, res){
	let sql = "SELECT * from detalii_comanda JOIN comanda ON detalii_comanda.id_comanda = comanda.id_comanda JOIN produse ON detalii_comanda.id_produs = produse.id_produs JOIN categorie ON produse.id_categorie = categorie.id_categorie JOIN accounts ON comanda.id_user = accounts.id_user ";
	connection.query(sql, function (err, result) {
		if(err) throw err;

		var today = new Date();
		var dd = String(today.getDate()).padStart(2, '0');
		var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
		var yyyy = today.getFullYear();

		today = mm + '/' + dd + '/' + yyyy;

		var sql2 = "INSERT INTO comanda VALUES(null,'"+ result[0].id_user +"', '"+ Math.floor((Math.random() * 50) + 1) +"', '"+ today +"', '"+ result[0].id_adresa +"')";
		connection.query(sql2, function (err) {
			if(err) throw err;

			res.render("authentification",
				{title: "Date salvate",
				message: "Comanda dumneavoastra a fost efectuata cu succes si urmeaza sa fie procesata."
				});
			// var sql3 = "INSERT INTO detalii_comanda VALUES(null,'"+ result[0].id_comanda +"','"+ result[0].id_produs +"','"+ result[0].cantitate +"')";
			// connection.query(sql3, function (err) {
			// 	if(err) throw err;
			// });
		});
	});
});

app.get("/filtru", function(req, res){
	let sql = "SELECT * FROM produse JOIN categorie ON categorie.id_categorie = produse.id_categorie";
	connection.query(sql, function(err, result, fields){
		if(err) throw err;

		res.render("filtru",
		{title: "Test Table",
		data: result,
		});

});
});

app.post('/filtru', function(req, res, next) {

if(req.body.total){
	var sql = "SELECT SUM(P.price*DC.cantitate) Total FROM Comanda C INNER JOIN Detalii_Comanda DC ON C.id_Comanda = DC.id_Comanda INNER JOIN Produse P ON P.id_Produs = DC.id_Produs WHERE data like '"+ req.body.total +"' GROUP BY c.id_user";
	connection.query(sql, function(err, result, fields){
		var  data = JSON.stringify(result[0].Total)

		res.render("authentification",
			{title: "Suma totala castigata de firma in data de '"+ req.body.total +"'",
			message: data + " RON"
			});
		});
} else if(req.body.destinatie){
  var sql2 = "select name from produse where id_produs in (select id_produs from detalii_comanda where id_comanda in ( select c.id_comanda from Comanda c join adresa a on c.id_adresa = a.id_adresa where a.oras like '"+ req.body.destinatie +"'))";
		connection.query(sql2, function(err, result, fields){
			var  data = JSON.stringify(result);
			console.log(data);
			res.render("authentification",
				{title: "Produse livrate catre destinatia '"+ req.body.destinatie +"",
				message: data
				});
			});
} else if(req.body.nr){
	var sql3 = "select distinct c.nume_categorie Categorie from produse p join categorie c on p.id_categorie =c.id_categorie where p.id_produs in (select id_produs from detalii_comanda group by id_produs having count(id_produs) > '"+ req.body.nr +"' )";
		connection.query(sql3, function(err, result, fields){
			var  data = JSON.stringify(result);
			// console.log(data);
			res.render("authentification",
				{title: "Categoriile produselor care au aparut pe un nr > de '"+ req.body.nr +"' comenzi",
				message: data
				});
			});
} else if(req.body.valoare){
	// var sql4 = "select concat ('Clientul ',prenume,' cu userul: ', username) 'Detalii Client' from accounts where id_user in (SELECT c.id_user FROM Comanda C INNER JOIN Detalii_Comanda DC ON C.id_Comanda = DC.id_Comanda INNER JOIN Produse P ON P.id_Produs = DC.id_Produs having SUM(P.price*DC.cantitate) > '"+ req.body.valoare +"' )";
		 var sql4 = "select concat ('Clientul ',prenume,' cu userul: ', username) 'Detalii Client' from accounts where id_user in (SELECT c.id_user FROM Comanda C INNER JOIN Detalii_Comanda DC ON C.id_Comanda = DC.id_Comanda INNER JOIN Produse P ON P.id_Produs = DC.id_Produs group by c.id_user having sum(p.price*dc.cantitate) > '"+ req.body.valoare +"')";
		connection.query(sql4, function(err, result, fields){
			var  data = JSON.stringify(result);

			res.render("authentification",
				{title: "Detalii clienti care au cumparat produse de o valoare mai mare de '"+ req.body.valoare +"' RON",
				message: data
				});
			});
} else if(req.body.conf){
	var sql5 = "select a.email Email, a.mobile 'Numar telefon' from accounts a join comanda c on a.id_user = c.id_user where c.nr_confirmare = '"+ req.body.conf +"'";
		connection.query(sql5, function(err, result, fields){
				var data = JSON.stringify(result);
				console.log(data);
			res.render("authentification",
				{title: "Detalii user cu numarul de confirmare = '"+ req.body.conf +"' este",
				message: data
				});
			});
} else if(req.body.em){
	var sql6 = "select concat(p.name,' ' , p.model) FROM accounts a join comanda c on a.id_user=c.id_user join detalii_comanda dc on c.id_comanda = dc.id_comanda join produse p on p.id_produs = dc.id_produs where a.email like '"+ req.body.em +"'";
		connection.query(sql6, function(err, result, fields){
			var data = JSON.stringify(result);
			console.log(data);
			res.render("authentification",
				{title: "Produsele cumparate de userul cu emailul '"+ req.body.em +"' sunt",
				message: data
				});
			});
}
});


app.listen(3000, function(){
  console.log("Server is running on port 3000");
});
