import React, { useEffect, useState } from 'react'
import './SumTotalizerFooter.css';
import CartIcon from '../../icons/CartIcon';
const SumTotalizerFooter = ({ cartList ,onClick  }) => {
    const [totalAmount, setTotalAmount] = useState(0)

   

    useEffect(() => {
        let sum = 0;
        cartList.forEach(item => {
            sum += item.prize * item.count;
        });
        setTotalAmount(sum);
    }, [cartList]);



    return (
        <div className='sum-totalizer-footer-container'
        onClick={onClick}
        >
            <div className='sum-totalizer-footer-text'>
                <CartIcon />
                <p>{cartList.length} Element</p>
            </div>
            <div className='sum-totalizer-footer-total-amount'>
               <p>Total: LKR {totalAmount.toFixed(2)} </p>
            </div>
        </div>
    )
}

export default SumTotalizerFooter