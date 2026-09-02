import CategoryForm from "./component/CategoryForm";
import CategoryList from "./component/CategoryList";
function Category() {
    return (
        <div className="container my-3">
            <h1 className="mb-4">Список Категорий (Для администраторов)</h1>
            <CategoryForm/>
            <CategoryList/>
        </div>
    );
}

export default Category;
