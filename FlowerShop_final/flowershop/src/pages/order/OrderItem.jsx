import { useState } from "react";
function OrderItem({ orderDate, deliverDate, address, delivered, summa, items }) {
    return (
        <div className="row my-3">
            <div className="card border mb-3 " >
                <div className="m-3">
                    {!delivered?
                        <h2 className="card-title">Заказ от {orderDate} &ensp; Доставим {deliverDate}</h2> :
                        <h2 className="card-title text-success">Доставлен {deliverDate}</h2>
                        }
                    {/* <h2 className="card-title">Заказ от {orderDate} &ensp; Доставим {deliverDate}</h2> */}

                    <p className="card-title"> Адрес: {address}</p>
                </div>
                {items.map((item) => (
                    <div className="card-body" key={item.id}>
                        <img className="float-start img-fluid col-2 me-3" src={`http://localhost:5176/Products/Picture/${item.product.id}?x=300&y=300`} />
                        <h3 className="card-title"> {item.product.title}</h3>
                        <span className="card-title "> {item.product.cost} руб.</span>
                        <p className="card-title"> {item.countPr} штук(а\и)</p>
                    </div>))}
                <h1 className="m-5"> {summa} руб.</h1>

            </div>
        </div>
    );
}

export default OrderItem;
