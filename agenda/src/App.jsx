import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personServices from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');

  useEffect(()=>{
    personServices
      .getAll()
      .then(person => {
      setPersons(person);
     })
  }, [])

  const addName = (event) => {
    event.preventDefault();
    const existedName = persons.find(person => person.name === newName);
    if (existedName){
      alert(`${newName} is already added to phonebook`)
    }else{
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      personServices
        .create(nameObject)
        .then(person => {
          setPersons(persons.concat(person));
          setNewName('');
          setNewNumber('');
        })      
    }
  }

  const deletePerson = (id) => {

  }

  const handleNameChange = (event) => {
    setNewName(event.target.value);    
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(search.toLowerCase()) // Devuelve true si encuentra coincidencia
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search= { search } handleSearchChange= { handleSearchChange }/>
      <h2>Add a new contact</h2>
      <PersonForm addName= {addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons}/>
    </div>
  )
}

export default App