import React from 'react'
import './CreateMenuPage.css'
import AddIcon from '../../icons/AddIcon'

const CreateListTile = ({title,subtitle,price,onClick}) => {
  return (
    <div className='create-list-tile'>
        <div className="list-tile-outter">
        <img src="https://s3-alpha-sig.figma.com/img/72cc/0d24/b3ddb149821c66f6653d911096c913f5?Expires=1720396800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=DjoJGD-hfCJXM0yeFvFqQP~XC0vpr4TFVU1hHh3So9quVXP~4M79-H~N96A7fD40Srx6gJqBLJNjsfEPecDsoLf-vfk2Qz2TfFBZYP7NOppzXdE1rxYzNudVhE5YhHLkXMtokGIV718xVjeZ7nQO5CWZj-Qw4zLHIByXzmNloWWXIYMVpv~5J3UQyY5wXTGXrK2aOuuN99BBJvCvPtaIuakpK55yKIo7ZW74Wzbj0f2HRaBhzLi2Iwl0BT99RALOevgo3p45CjBLZIdG19scThTL~aINCZADvO5j27JsY35WUOHfpvgzMhWg8XjTIZGfj3tOpmUxdOE0L6C~X7v-dQ__" alt="" />
        <div className="tile-content">
          <h3 className='tile-content-title'>{title} </h3>
          <h3 className='tile-content-subtitle'>({subtitle})</h3>
          <h3 className='tile-content-prize'>₹ {price.toFixed(2)} </h3>
        </div>
        </div>
        <div className="tile-traling">
          <AddIcon
              onClick={onClick}
          />
        </div>
    </div>
  )
}

export default CreateListTile