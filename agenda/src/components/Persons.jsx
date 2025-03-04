const Persons = (props) => {
    return (
        <div>
            {
                props.filteredPersons.map((person) => (
                    <div>
                        <p key={person.id}>
                        {person.name} {person.number}
                        </p>
                        {/* <button onClick={props.deletePerson}>{props.label}</button> */}
                    </div>
                
                ))
            }
        </div>
    )
}

export default Persons;