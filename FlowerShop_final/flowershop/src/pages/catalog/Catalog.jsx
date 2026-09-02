import CardCollection from "./CardCollection";
import CheckBoxCategory from "./checkboxCategory";
import ShopCard from "./ShopCard";

function Catalog() {
    return (
        <div className="container my-3">
            <CheckBoxCategory/>
            <CardCollection/>                
        </div>
    );
}

export default Catalog;
