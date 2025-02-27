const Filter = (props) => {
    return (
        <div>
            Search: <input value={ props.search } onChange={ props.handleSearchChange } />
        </div>
    )
}

export default Filter;