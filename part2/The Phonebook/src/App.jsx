import { useState, useEffect } from 'react';
import { Filter } from './components/Filter';
import { PersonForm } from './components/PersonForm';
import { Persons } from './components/Persons';
import dataService from '../src/services/persons';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filterName, setFilterName] = useState('');

  useEffect(() => {
    dataService.getAll().then((initialValue) => {
      setPersons(initialValue);
    });
  }, []);

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleDelete = (id) => {
    const personToDelete = persons.find((person) => person.id === id);
    personToDelete && window.confirm(`Delete ${personToDelete.name} ?`)
      ? dataService.remove(id).then(() => {
          setPersons(persons.filter((person) => person.id !== id));
        })
      : null;
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already exits in the phonebooks. Replace the number?`
      );

      if (confirmUpdate) {
        const updatedPerson = { ...existingPerson, number: newNumber };
        dataService
          .update(existingPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === existingPerson.id ? returnedPerson : person
              )
            );
            setNewName('');
            setNewNumber('');
          })
          .catch((error) => {
            console.log('Error updating the person:', error);
          });
      }
    } else {
      dataService
        .create({ name: newName, number: newNumber })
        .then((returnedPerson) => {
          console.log(returnedPerson);
          setPersons([...persons, returnedPerson]);
          setNewName('');
          setNewNumber('');
        })
        .catch((error) => {
          console.log('Error creating a new person:', error);
        });
    }
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
      <Persons filteredPersons={filteredPersons} handleDelete={handleDelete} />
    </div>
  );
};

export default App;
