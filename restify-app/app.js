var restify = require('restify');

var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());


//Data holding swimlane key: value: pairs
let swimlaneArray = [{
		"swimlaneHeader": "header1",
		"swimlaneOrder": 0,
	},
	{
		"swimlaneHeader": "header2",
		"swimlaneOrder": 0,
	},
];

//Data holding cards key: value: pairs
let cardArray = [{
		"cardHeader": "header1",
		"cardOrder": 0,
	},
	{
		"cardHeader": "header2",
		"cardOrder": 0,
	},
];

//Constructor for swimlane data
var Swimlane = function(swimlaneHeader, swimlaneOrder){
	this.swimlaneHeader = swimlaneHeader;
	this.swimlaneOrder = swimlaneOrder;
}

//Constructor for card data
var Card = function(cardHeader, cardOrder){
	this.cardHeader = cardHeader;
	this.cardOrder = cardOrder;
}


//Passing info for getting swimlanes
function getSwimlanes(req, res, next) {
	// Restify currently has a bug which doesn't allow you to set default headers
	// These headers comply with CORS and allow us to serve our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//find the appropriate swimlaneArray
	res.send(swimlaneArray);
}

//Passing info for getting cards
function getCards(req, res, next) {
	// Restify currently has a bug which doesn't allow you to set default headers
	// These headers comply with CORS and allow us to serve our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//find the appropriate swimlaneArray
	res.send(cardArray);
}

//Passing info for posting swimlanes
function postSwimlanes(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	console.log(req.body);

	var swimlane = new Swimlane(req.body.swimlaneHeader, req.body.swimlaneOrder);

	swimlaneArray.push(swimlane);

	// save the new swimlane to the collection

	res.send(swimlane);
}

//Passing info for posting cards
function postCards(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	console.log(req.body);

	var card = new Card(req.body.cardHeader, req.body.cardOrder);

	cardArray.push(card);

	// save the new card to the collection

	res.send(card);
}


// Set up our routes and start the server for swimlanes
server.get('/swimlanes', getSwimlanes);
server.post('/swimlanes', postSwimlanes);


// Set up our routes and start the server for cards
server.get('/cards', getCards);
server.post('/cards', postCards);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});
