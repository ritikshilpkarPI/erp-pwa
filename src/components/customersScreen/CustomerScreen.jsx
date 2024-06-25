import { RiArrowLeftSLine ,RiArrowRightSLine} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import './CustomerScreen.css'
import SearchIcon from '../../icons/SearchIcon';
const CustomerScreen = ()=>{
    const navigate=  useNavigate();
    const onclick=()=>{
        navigate(-1)
    }
    return(
    
        <>
        <div className="customer-screen-container">
            <div className="customer-header">
                <div className='customer-header-top'>
                <RiArrowLeftSLine className="arrow-icon icon" onClick={onclick}/>
                <h1 className='customer-heading'> Customer </h1>
                </div>
                <div className='customer-header-bottom'>
                    <div className='customer-input'>

                    <input className='search-input' type="text" placeholder='Search for a name, a contact, or an email' />
                     <SearchIcon />
                    </div>
                </div>

            </div>
            <div className='customer-content' >
                <div className='customer-content-div'>
          <h1 className='customer-content-heading'> John Deos </h1>
          <RiArrowRightSLine className="arrow-icon icon2"  />

                </div>
                <div className='customer-content-div'>
          <h1 className='customer-content-heading'> Anna Amleia </h1>
          <RiArrowRightSLine className="arrow-icon icon2"  />

                </div>
          </div>
          <div className='customer-bottom'>
                
                <div className='customer-bottom-button'>Add a new client</div>
            </div>

        </div>
        </>
    )
}
export default CustomerScreen