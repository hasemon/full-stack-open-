const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ' ',
);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));


let persons = [

];

app.get("/", (request, response) => {
	response.send(
		`
		<h1>Welcome to the Phonebook app</h1> 
		<p>Navigate to 'http://localhost:3001/api/persons'</p>
		<p>For information 'http://localhost:3001/info' </p>
		`
	);
});

app.get('/info', (request, response) => {
	response.send(`
	<p>Phonebook has info for ${persons.length} </p>
	<p>${new Date()}</p>
	`)
})

app.get("/api/persons", (request, response) => {
	Person.find({}).then(persons => {
		response.json(persons)
	})
});

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id).then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
})

app.post('/api/persons', (request, response) => {
	const body = request.body;
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'Name or number is missing'
		});
	}

	// const existingPerson = persons.find( person => person.name === body.name )
	// if (existingPerson) {
    //     return response.status(400).json({
    //         error: 'Person already exists'
    //     });
    // }
	const person = new Person({
		name: body.name,
		number: body.number,
	})

	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
});



app.delete('/api/persons/:id', (request, response) => {
	Person.findByIdAndDelete(request.params.id)
		.then(deletedPerson =>{
			if (deletedPerson){
				response.status(204).end()
			}else{
				response.status(404).end()
			}
		})
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})



const PORT = process.env.PORT
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});

