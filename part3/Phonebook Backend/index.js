const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')


app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ' ',
);
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'));



let persons = [
	{
		id: 1,
		name: "Arto Hellas",
		number: "040-123456",
	},
	{
		id: 2,
		name: "Ada Lovelace",
		number: "39-44-5323523",
	},
	{
		id: 3,
		name: "Dan Abramov",
		number: "12-43-234345",
	},
	{
		id: 4,
		name: "Mary Poppendieck",
		number: "39-23-6423122",
	},
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
	console.log(response)
	response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const person = persons.find(person => person.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}
})

function generateId(){
	const maxId = persons.length > 0 ? Math.max(...persons.map(n => n.id)) : 0
	return maxId + 1
}


app.post('/api/persons', (request, response) => {
	const body = request.body;
	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'Name or number is missing'
		});
	}

	const existingPerson = persons.find( person => person.name === body.name )
	if (existingPerson) {
        return response.status(400).json({
            error: 'Person already exists'
        });
    }
	const person = {
		id: generateId(),
		name: body.name,
		number: body.number,
	};

	persons = persons.concat(person);
	response.json(person);
});



app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	persons = persons.filter(person => person.id !== id)

	response.status(204).end()
})



const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on ${PORT}`);
});

