const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Usage: node script.js <password> [<name> <number>]')
  process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://phonebook:${password}@cluster1.xxqbmbl.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const PersonSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', PersonSchema)

if (process.argv.length === 3) {

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
    process.exit(0)
  }).catch(error => {
    console.error('Error fetching phonebook entries:', error)
    mongoose.connection.close()
    process.exit(1)
  })
} else if (process.argv.length === 5) {

  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    number: number,
  })

  person.save()
    .then(result => {
      console.log('Person saved successfully:', result)
      mongoose.connection.close()
      process.exit(0)
    })
    .catch(error => {
      console.error('Error saving person:', error)
      mongoose.connection.close()
      process.exit(1)
    })
} else {
  console.log('Usage: node script.js <password> [<name> <number>]')
  mongoose.connection.close()
  process.exit(1)
}
