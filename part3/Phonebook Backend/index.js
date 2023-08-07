const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./models/person')

const unknownRoute = (request, response) => {
  response.status(404).send('Unknown route')
}
const errorhandler = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError'){
    return response.status(400).send({ error:'malformatted id' })
  }else if (error.name === 'ValidationError'){
    return  response.status(400).json({ error: error.message })
  }
  next(error)
}


app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body', (req) =>
  req.method === 'POST' ? JSON.stringify(req.body) : ' ',
)
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))



app.get('/', (request, response) => {
  response.send(
    `
		<h1>Welcome to the Phonebook app</h1> 
		<p>Navigate to 'http://localhost:3001/api/persons'</p>
		<p>For information 'http://localhost:3001/info' </p>
		`
  )
})

app.get('/info', (request, response, next) => {
  Person.countDocuments({})
    .then(count => {
      response.send(
        `<p>Phonebook has info for ${count} persons</p>
					<p>${new Date()}</p>`
      )
    })
    .catch(error => next(error))
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error) )
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or number is missing'
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson)
    })
    .catch(error => next(error))
})



app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
    .then(deletedPerson => {
      if (deletedPerson){
        response.status(204).end()
      }else{
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})

app.put('/api/persons/:id', (request, response, next) => {
  const { content, number } = request.body

  Person.findByIdAndUpdate(request.params.id,
    { content, number },
    { new: true, runValidators:true, context: 'query' })
    .then(updatedPerson => {
      if (updatedPerson){
        response.json(updatedPerson)
      }else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})


app.use(unknownRoute)
app.use(errorhandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})

