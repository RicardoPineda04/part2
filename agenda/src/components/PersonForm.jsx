const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={ props.addName }>
                <div>
                Name: <input value={ props.newName } onChange={ props.handleNameChange }/>
                </div>
                <div>
                Number: <input value={ props.newNumber } onChange={ props.handleNumberChange }/>
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm;