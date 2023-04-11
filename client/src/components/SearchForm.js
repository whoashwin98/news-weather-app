import React, { useState } from 'react'

export default function SearchForm(props) {
    // handling the state of the search bar input using a useState hook
    const [input, setInput] = useState("");

    // a function that handles change of value in the search bar input
    function handleChange(event) {
        setInput(event.target.value);
    }

    return (
        <>
            <form className="d-flex" role="search" onSubmit={(event) => {
                props.fetchSearchData(input);
                event.preventDefault();
            }}>
                <input className="form-control me-2" type="search" placeholder="Search For News..." aria-label="Search" style={{padding: "10px"}} onChange={handleChange} value={input}/>
                <button className="btn btn-outline-dark" type="submit">Search</button>
            </form>
        </>
    )
}
