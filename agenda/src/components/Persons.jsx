import personServices from '../services/persons'
const Persons = (props) => {
    return (
        <div>
            {
                props.filteredPersons.map((person) => (
                    <div key={person.id}>
                        <p>
                        {person.name} {person.number}
                        </p>
                        <button onClick={() => props.deletePerson(person)}>Eliminar</button>
                    </div>
                
                ))
            }
        </div>
    )
}

export default Persons;