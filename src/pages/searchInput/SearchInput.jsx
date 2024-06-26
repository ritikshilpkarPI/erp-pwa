import React from 'react'

const SearchInput = (props) => {
  const{ClassName} = props
  return (
    <input 
    type="text"
    className={ClassName}
     placeorder='Search items..' />
  )
}

export default SearchInput