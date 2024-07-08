import React from 'react'

const MinusIcon = ({onclick,className}) => {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-minus" onClick={onclick}><path d="M5 12h14"/></svg>
  )
}

export default MinusIcon