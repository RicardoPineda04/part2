import { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { 
      name: 'Arto Hellas',
      number: '040-123456'
    },
    { 
      name: 'Ricardo',
      number: '123456789'
    },
    { 
      name: 'Jaime',
      number: '789456123'
    },
    { 
      name: 'Fidel',
      number: '456123789'
    }
  ]) 
  const [ newName, setNewName] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');

  const addName = (event) => {
    event.preventDefault();
    const existedName = persons.find(person => person.name === newName);
    if (existedName){
      alert(`${newName} is already added to phonebook`)
    }else{
      const nameObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(nameObject));
      setNewName('');
      setNewNumber('');
    }    
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
      Search: <input value={ search } onChange={ handleSearchChange } />
      <h2>Add a new contact</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={ newName } onChange={ handleNameChange }/>
        </div>
        <div>
          Number: <input value={ newNumber } onChange={ handleNumberChange }/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
        ))
      }
    </div>
  )
}

export default App