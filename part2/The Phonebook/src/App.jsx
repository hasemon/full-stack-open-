import { useState } from "react";
import { Filter } from "./components/Filter";
import { PersonForm } from "./components/PersonForm";
import { Persons } from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterName, setFilterName] = useState("");

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(filterName.toLowerCase()));

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const nameExits = persons.some((person) => person.name === newName);
    nameExits
      ? alert(`${newName} is already exits in the phonebooks`)
      : setPersons([...persons, { name: newName, number: newNumber }], setNewName(""), setNewNumber(""));
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filterName={filterName} handleFilterName={handleFilterName} />
      <h2>add a new</h2>
      <PersonForm
        handleOnSubmit={handleOnSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleAddNumber={handleAddNumber}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  );
};

export default App;
