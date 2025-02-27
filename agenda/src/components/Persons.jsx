const Persons = (props) => {
    return (
        <div>
            {
                props.filteredPersons.map((person) => (
                <p key={person.id}>
                {person.name} {person.number}
                </p>
                ))
            }
        </div>
    )
}

export default Persons;