import React, { useState } from 'react'
import './Ticket.css'
import SearchIcon from '../../icons/SearchIcon'
import CloseIcon from '../../icons/CloseIcon'
import SelectInput from '../selectInput/SelectInput'

import SearchInput from '../../pages/searchInput/SearchInput'
import Item from '../items/Item'
// add barcode cart hamburgermenu list money search searchs selectcalc select menu select star
const Ticket = () => {

    const itemsList = [
        {
            name: 'Pasta',
            amount: 280.00
        },
        {
            name: 'Cabbage roll',
            amount: 150.00
        },
        {
            name: 'Sandwiches',
            amount: 80.00
        }
    ];
    const [searchClick, setSearchClick] = useState(false)

    const searchClickFunc = () => {
        setSearchClick(!searchClick)
    }

    return (
        <div className='ticket-container'>

            <div className='prise-display-container'>
                <div className='prise-display'>
                    <div className='text-container'>
                        <h3 className='charge-title' >CHARGE</h3>
                        <h3 className='charge-amount'>Rs0.00</h3>
                    </div>
                </div>
            </div>

            <div className='items-select-search-container'>
                <div className='items-select-search-container-left'>
                    {searchClick ?
                        (<SearchInput
                            ClassName='items-search'
                        />) :
                        (<SelectInput
                            name=''
                            className='items-selecter'
                            values={[]}
                        />)
                    }
                </div>
                <div className='items-select-search-container-right'
                    onClick={searchClickFunc}
                >
                    {searchClick ? (<CloseIcon />) : (<SearchIcon />)}

                </div>

            </div>

            <div className='items-container'>
                {
                    itemsList.map((item, index) => (
                        <Item
                            key={index}
                            index={index}
                            itemName={item.name}
                            amount={item.amount.toFixed(2)}

                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Ticket