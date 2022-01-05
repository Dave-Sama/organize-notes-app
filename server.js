// env files
require('dotenv').config();

// server init
const express = require('express');

//parser init
const bodyParser = require('body-parser');

// config
const app = express();

app.get('/', (req, res) => {
	res.send('<h1>hello!</h1>');
});

// app useage
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

const port = process.env.PORT || 5000;
const start = async () => {
	try {
		// await connectDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server is listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

start();
