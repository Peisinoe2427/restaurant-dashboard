import { useState } from "react";
import menuData from "../data/menuData";

function OrderForm ({onClose, saveOrder}){
    const [order, setOrder] = useState({});

    const handleQuantityChange = (item, change) => {
        setOrder((prevOrder)=>({
            ...prevOrder,
            [item.id]: Math.max(0, (prevOrder[item.id] || 0) + change),
        }));
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const selectedItems = menuData
            .filter((item) => order[item.id] > 0)
            .map((item) => ({ ...item, quantity: order[item.id] })); 

        if (selectedItems.length === 0) {
            alert("Please select at least one item.");
            return;
        }

        const total = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        saveOrder({items: selectedItems, total});
        alert(`Order placed successfully! Total: $${total}`);
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