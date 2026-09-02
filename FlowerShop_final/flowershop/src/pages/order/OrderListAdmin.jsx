import { NavLink } from "react-router";

function OrderListAdmin() {

    return (
        <ul className="nav nav-tabs fs-5">
            <li className="nav-item">
                <NavLink className="nav-link"  aria-current="page" to="/order/all/current">Текущие</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" aria-current="page"  to="/order/all/delivered">Доставленные</NavLink>
            </li>
        </ul>
    );
}

export default OrderListAdmin;
