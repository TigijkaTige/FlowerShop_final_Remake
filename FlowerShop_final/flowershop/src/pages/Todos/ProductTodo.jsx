import ProductForm from "./component/ProductForm";
import ProductList from "./component/ProductList";

// import UploadAndDisplayImage from "./component/Photo";
function Product() {
    return (
        <div className="container my-3">
            <h1 className="mb-4">Список Товаров (Для администраторов)</h1>
            <ProductForm/>
            <ProductList/>
        </div>
    );
}

export default Product;
