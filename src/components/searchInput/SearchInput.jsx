import React from 'react'

const SearchInput = (props) => {
  const{ClassName} = props
  return (
    <input 
    type="text"
    className={ClassName}
     placeholder='Search items..' />
  )
}

export default SearchInput