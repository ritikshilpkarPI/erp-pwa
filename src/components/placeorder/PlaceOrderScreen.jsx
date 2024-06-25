import React from 'react';
import './PlaceOrderScreen.css';
import { RiArrowLeftSLine ,RiArrowRightSLine} from 'react-icons/ri';
import DeleteIcon from '../../icons/DeleteIcon';
import { useNavigate } from 'react-router-dom';
const PlaceOrderScreen = ()=>{ 
    const navigate=  useNavigate();
    const onclick=()=>{
        navigate(-1)
    }
    const onclick2 =()=>{
        navigate('/customer')
    }
    return(
        <div className="placeorder-screen-container">
          
          
           <div className='placeorder-head'>
           <RiArrowLeftSLine className="arrow-icon icon" onClick={onclick}/>
            <h1 className='placeorder-heading'> Order Details </h1>
           
           </div>
           <hr />
          <div className='placeorder-head-bottom' >
          <h1 className='placeorder-head-bottom-heading'> Client </h1>
          <RiArrowRightSLine className="arrow-icon icon2" onClick={onclick2} />
          </div>
          <div className='placeorder-buttons'>
                <button>Take-away</button>
                <button>Delivery</button>
                <button>Eat-in</button>
           </div>
            <div className='placeorder-content'>
                <div className='placeorder-content-div'>
                   <button>5</button>
                    <div className='placeorder-menu'>Black Paper Wagyu </div>
                    <div className='placeorder-price'>₹420.99</div>
                </div>
                <div className='placeorder-content-div'>
                   <button>1</button>
                    <div className='placeorder-menu'>Wagyu Satay </div>

                    <div className='placeorder-price'>₹227.99</div>
                </div>
                <div className='placeorder-diskon '>
                    <h1> Discount</h1>
                    <RiArrowRightSLine className="arrow-icon icon3" />
                </div>
                <div className='placeorder-total '>
                    <h1>Subtotal</h1>
                    <h1>₹648.98</h1>
                </div>
                <div className='placeorder-delete'>
                    <DeleteIcon/>
                    <p>Delete the order</p>
                </div>

            </div>

            <div className='placeorder-bottom'>
                <div className='placeorder-total '>
                    <h1> Subtotal</h1>
                    <h1>₹648.98</h1>
                </div>
                <div className='placeorder-bottom-button'>Place an order</div>
            </div>
           
           
        </div>
        
    )
    
}
export default PlaceOrderScreen