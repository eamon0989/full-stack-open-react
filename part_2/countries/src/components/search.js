export const Search = ({ updateSearch }) => {
  return (
    <>
      find countries: <input onChange={updateSearch} />
    </>
  )
}