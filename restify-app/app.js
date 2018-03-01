var restify = require('restify');

var server = restify.createServer();

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

let data = [{
		"id": 1,
		"subject": "hello",
		"description": "hello world"
	},
	{
		"id": 2,
		"subject": "hello 2",
		"description": "hello world 2"
	},
	{
		"id": 3,
		"subject": "hello 3",
		"description": "hello world 3"
	}
];

var Message = function(id, subject, description){
	this.id = id;
	this.subject = subject;
	this.description = description;
}


function getMessages(req, res, next) {
	// Restify currently has a bug which doesn't allow you to set default headers
	// These headers comply with CORS and allow us to serve our response to any origin
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	//find the appropriate data
	res.send(data);
}

function postMessage(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	
	console.log(req.body);

	var message = new Message(req.body.id, req.body.subject, req.body.description);

	data.push(message);

	// save the new message to the collection

	res.send(message);
}

// Set up our routes and start the server
server.get('/messages', getMessages);
server.post('/messages', postMessage);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});
