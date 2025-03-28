import { useState } from "react";
import menuData from "../data/menuData";

function OrderForm ({onClose, saveOrder}){
    const [order, setOrder] = useState({});

    const handleQuantityChange = (item, change) => {
        setOrder((prevOrder)=>{
            const currentQuantity = prevOrder[item.id] || 0;
            const newQuantity= Math.max(0, currentQuantity+ change)
            return{
                ...prevOrder,
                [item.id]:newQuantity,
            };
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedItems = menuData
            .filter((item) => order[item.id] > 0)
            .map((item) => ({ ...item, quantity: order[item.id] })); 

        if (selectedItems.length === 0) {
            alert(" Select at least one item.");
            return;
        }

        // based on this: https://medium.com/@anandgupta20588/how-to-use-reduce-method-to-add-the-prices-of-cart-items-in-js-abb81a930883
        const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        saveOrder({items: selectedItems, total});
        alert(`Order placed successfully! Total is €${total}`);
        onClose();
    }

    return(
        <dialog open className="modal">
            <div className="modal-content">
                <h2>Place an Order</h2>
                <form onSubmit={handleSubmit}>
                    <h3>Menu</h3>
                    <div className="menu__container">
                        {menuData.map((item) => (
                            <div key={item.id} className="menu__item">
                                <span>{item.name} - ${item.price}</span>
                                <button type="button" onClick={() => handleQuantityChange(item, -1)}>-</button>
                                <span>{order[item.id] || 0}</span>
                                <button type="button" onClick={() => handleQuantityChange(item, 1)}>+</button>
                            </div>
                        ))}
                    </div>


                    <div className="container__button">
                        <button type="submit">Place Order</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
export default OrderForm;