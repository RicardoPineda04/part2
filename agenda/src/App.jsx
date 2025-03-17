import { useEffect, useState } from 'react'
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import Notification from './components/Notification';
import personServices from './services/persons';

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ message, setMessage ] = useState(null);
  const [ typeNotification, setTypeNotification ] = useState(null);

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
      // alert(`${newName} is already added to phonebook`)
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
        const changedInfo = {
          ...existedName,
          number: newNumber,
        };        
        personServices
          .updatePhone(existedName.id, changedInfo)
          .then( response => {
              setPersons(persons.map(person => person.id !== existedName.id ? person : response));
              setMessage(`${response.name} updated`);
              setTypeNotification('done')
              setTimeout(()=>{
                setMessage(null)
                setTypeNotification(null)
              },5000);
              setNewName('');
              setNewNumber('');
            }
          )
      }
    }else{
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      personServices
        .create(nameObject)
        .then(person => {
          setPersons(persons.concat(person));
          setMessage(`${person.name} created`);
          setTypeNotification('done')
          setTimeout(()=>{
            setMessage(null)
            setTypeNotification(null)
          },5000);
          setNewName('');
          setNewNumber('');
        })
        .catch(error => {          
          setMessage(`${error.response.data.error}`);
          setTypeNotification('error')
          setTimeout(()=>{
            setMessage(null)
            setTypeNotification(null)
          },5000);
        })    
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

  const deletePerson = (person) => {
    if(confirm(`Delete ${person.name}?`)){
        personServices
            .deletePerson(person.id)
            .then(response => {
              const newList = persons.filter(p => p.id !== person.id);
              setPersons(newList);
            })
            .catch(error => {
              setMessage(`Information of ${person.name} has already been removed from server`);
              setTypeNotification('error')
              setTimeout(()=>{
                setMessage(null)
                setTypeNotification(null)
              },5000);
              setPersons(persons.filter(n => n.id !== person.id))
            })
    }
}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = { message } type = { typeNotification } />
      <Filter search= { search } handleSearchChange= { handleSearchChange }/>
      <h2>Add a new contact</h2>
      <PersonForm addName= {addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App