import "./Invoice.css";

const NewInvoice = (props) => {
    const { transactionId = "", data, isPublic = false, printerWidth="100%" } = props;
    
    const handlePrintClick = () => {
        const invoiceElement = document.querySelector(".invoice-container");
        invoiceElement.style.width = printerWidth;
        window.print();
        invoiceElement.style.width = "100%";
    };
    
    const copyAndShareLink = async () => {
        const baseUrl = process.env.REACT_APP_FRONTEND_URL ?? "";
        const invoiceUrl = `${baseUrl}/invoice-public/${transactionId}`;
        const invoiceName = `invoice-${Date.now()}`;
        let invoiceImage;
        try {
            const response = await fetch(invoiceUrl);
            const blob = await response.blob();
            invoiceImage = new File([blob], `invoice-${Date.now()}`, {
                type: blob.type,
            });
        } catch (err) { }
        navigator.clipboard
            .writeText(invoiceUrl)
            .then(() => {
                if (navigator.share && navigator.canShare && navigator.canShare({ files: [invoiceImage] })) {
                    navigator
                        .share({
                            title: invoiceName,
                            text: "Check out this invoice!",
                            url: invoiceUrl,
                        })
                        .then(() => console.log("Thanks for sharing!"))
                        .catch((error) => console.log("Error sharing:", error));
                } else {
                    const shareWindow = window.open("", "_blank");
                    shareWindow.document.write(`
                    <h2>Share this invoice</h2>
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        invoiceUrl
                    )}" target="_blank">Share on Facebook</a><br>
                    <a href="https://twitter.com/intent/tweet?url=${encodeURIComponent(
                        invoiceUrl
                    )}" target="_blank">Share on Twitter</a><br>
                    <a href="https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                        invoiceUrl
                    )}" target="_blank">Share on LinkedIn</a><br>
                    <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(
                        invoiceUrl
                    )}" target="_blank">Share on WhatsApp</a>
                `);
                    shareWindow.document.close();
                }
            })
            .catch((err) => {
                console.error("Failed to copy the link: ", err);
            });
    };

    const quantityTypeConstant = {
        "price_per_unit": "Unit",
        "price_per_dozen": "Dozen",
        "price_per_carton": "Carton",
    };

    return (
        <div className="invoice">
            <div className="invoice-container">
                <div className="invoice-header">
                    <h2 className="invoice-header-text">INVOICE</h2>
                    <div className="invoice-header-body">
                        <p className="invoice-header-body-p">
                            <strong>Business Name:</strong>{" "}
                            {data?.employeData?.business_name}
                        </p>
                        <p className="invoice-header-body-p">
                            <strong>Address:</strong> {data?.employeData?.address}
                        </p>
                        <p className="invoice-header-body-p">
                            <strong>Number:</strong> {data?.employeData?.phone_number}
                        </p>
                    </div>
                </div>
                <div className="invoice-body">
                    <table className="invoice-body-table">
                        <thead className="invoice-body-table-thead">
                            <tr className="invoice-body-table-thead-tr">
                                <th className="invoice-body-table-thead-tr-th">Qty</th>
                                <th className="invoice-body-table-thead-tr-th">Item</th>
                                <th className="invoice-body-table-thead-tr-th">Unit Price</th>
                                <th className="invoice-body-table-thead-tr-th">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody className="invoice-body-table-tbody">
                            {data?.items?.map((item, index) => (
                                <tr className="invoice-body-table-tbody-tr" key={index}>
                                    <td className="invoice-body-table-tbody-tr-td">{item._count} {quantityTypeConstant[item.quantityType]}</td>
                                    <td className="invoice-body-table-tbody-tr-td">{item._name}</td>
                                    <td className="invoice-body-table-tbody-tr-td">{item._prize}</td>
                                    <td className="invoice-body-table-tbody-tr-td">{item._prize * item._count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="invoice-footer" >
                    <p className="invoice-body-footer-p">
                        <strong>Sub Total:</strong> {data?.transaction?.totalAmount}
                    </p>
                    <p className="invoice-body-footer-p">
                        <strong>Order Time: </strong>
                        {new Date(data?.transaction?.date_of_sale).toLocaleTimeString()}
                    </p>
                    <p className="invoice-body-footer-p">
                        <strong>Order Date: </strong>
                        {new Date(data?.transaction?.date_of_sale).toLocaleDateString()}
                    </p>
                </div>
            </div>
            <div className="print-btn-outer">
                <button onClick={handlePrintClick} className="print-button">
                    Print Invoice
                </button>
                {!isPublic &&
                    <button onClick={copyAndShareLink} className="print-button">
                        Share Invoice
                    </button>
                }
            </div>
        </div>
    );
};

export default NewInvoice;
