import React, { useEffect, useState } from 'react';
import './SumTotalizerFooter.css';
import CartIcon from '../../icons/CartIcon';
import { useAppContext } from '../../appState/appStateContext';

const SumTotalizerFooter = ({ onClick }) => {
    const { globalState } = useAppContext();
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        let sum = 0;
        globalState?.cartItems.forEach(item => {
            const price = item.price;
            const count = item.count;
            sum += price * count;
        });
        setTotalAmount(sum);
    }, [globalState?.cartItems]);

    return (
        <div className='sum-totalizer-footer-container' onClick={onClick}>
            <div className='sum-totalizer-footer-text'>
                <p><CartIcon /> {globalState?.cartItems?.length} Element{globalState?.cartItems?.length !== 1 ? 's' : ''}</p>
            </div>
            <div className='sum-totalizer-footer-total-amount'>
                <p>Total: LKR { }</p>
            </div>
        </div>
    );
};

export default SumTotalizerFooter;
