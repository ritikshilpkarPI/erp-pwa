import React from 'react';
import './PlaceOrderScreen.css';
import { RiArrowLeftSLine ,RiArrowRightSLine} from 'react-icons/ri';
import DeleteIcon from '../../icons/DeleteIcon';
const PlaceOrderScreen = ()=>{ 

    return(
        <div className="placeorder-screen-container">
          
           <div className='placeorder-head'>
           <RiArrowLeftSLine className="arrow-icon icon" />
            <h1 className='placeorder-heading'> Details de la commande </h1>
           
           </div>
           <hr />
          <div className='placeorder-head-bottom' >
          <h1 className='placeorder-head-bottom-heading'> Client </h1>
          <RiArrowRightSLine className="arrow-icon icon2" />
          </div>
          <div className='placeorder-buttons'>
                <button>A emporter</button>
                <button>Livraison</button>
                <button>Diner sur place</button>
           </div>
            <div className='placeorder-content'>
                <div className='placeorder-content-div'>
                   <button>5</button>
                    <div>Papier noir Wagyu </div>
                    <div>GNF420.99</div>
                </div>
                <div className='placeorder-content-div'>
                   <button>1</button>
                    <div>Sate Wagyu </div>
                    <div>NF227.99</div>
                </div>
                <div className='placeorder-diskon '>
                    <h1> Diskon</h1>
                    <RiArrowRightSLine className="arrow-icon icon3" />
                </div>
                <div className='placeorder-total '>
                    <h1> Sous-total</h1>
                    <h1>GNF648.98</h1>
                </div>
                <div className='placeorder-delete'>
                    <DeleteIcon/>
                    <p>Supprimer la commande</p>
                </div>

            </div>

            <div className='placeorder-bottom'>
                <div className='placeorder-total '>
                    <h1> Sous-total</h1>
                    <h1>GNF648.98</h1>
                </div>
                <div className='placeorder-bottom-button'>Passer commande</div>
            </div>
           
           
        </div>
        
    )
    
}
export default PlaceOrderScreen