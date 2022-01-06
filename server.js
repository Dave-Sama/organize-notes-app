// env files
require('dotenv').config();

// server init
const express = require('express');

// CORS
var cors = require('cors');

// DB
const connectDB = require('./db/connectDB');
const noteModel = require('./db/Model');

//parser init
const bodyParser = require('body-parser');

// config
const app = express();
// app useage
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	console.log('starting point');
	res.send('hello!');
});
app.get('/notes', cors(), (req, res) => {
	noteModel.find({}, (err, result) => {
		if (!result) {
			console.log(err);
			res.send('Something went wrong...');
		} else {
			try {
				if (result.length > 0) {
					res.send(result);
				}
			} catch (err) {
				res.status(500).json(err);
			}
		}
	});
});

app.delete('/delete/:id', (req, res) => {
	const id = req.params.id;
	console.log(id);
	noteModel.deleteOne({ _id: id }, (err) => {
		if (err) {
			console.log(err);
		} else {
			console.log('The document successfully deleted.');
		}
	});
});

app.post('/new-note', (req, res) => {
	const { title, content } = req.body;
	const newNote = new noteModel({ title, content });
	newNote.save(() => console.log('Note added successfully'));
});

const port = process.env.PORT || 5000;
const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, () => console.log(`Server is listening on port ${port}`));
	} catch (err) {
		console.log(err);
	}
};

start();
