

const Search = ({handleResultSearch}) => {
  const searchFind = (event) => {
    handleResultSearch(event.target.value)
    console.log(event.target.value)
  }
  return (
    <div>
    Search:{" "}
    <input onChange={searchFind}></input></div>
  )
}

export default Search
