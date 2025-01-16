import React, { useEffect, useState } from 'react'
import NavigationHeader from '../components/navigationHeader/NavigationHeader'
import { useParams } from 'react-router-dom'
import LoadingCircle from '../components/loadinCircule/LoadingCircle'
import Invoice from '../components/invoice/Invoice'

const InvoicePublic = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [invoice, setInvoice] = useState({
    customer: {},
    employeData: {},
    items: [],
    totatransaction: {},
  });

  const fetchTransaction = async (id: string) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/share-invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setInvoice(data);

    } catch (error) {
      console.error("Error fetching transaction:", error);
    }
    finally {
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (id) {
      fetchTransaction(id);
    }
    // eslint-disable-next-line
  }, [id]);

  return (
    <div>
      <NavigationHeader
        title="Invoice"
        titleClassName="navigation-header-payment"
      />
      {isLoading
        ? <div style={{ height: "80svh", width: "100%", display: 'flex', alignItems: "center", justifyContent: 'center' }}>
          <LoadingCircle />
        </div>
        : <Invoice
          data={invoice}
          isPublic={true}
          printerWidth="58mm"
        />
      }
    </div>
  )
}

export default InvoicePublic