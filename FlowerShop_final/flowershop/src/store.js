import { configureStore } from "@reduxjs/toolkit";
import todoCategorySlice from "./features/categorySlice";
import todoProductSlice from "./features/productSlice";
import todoCartSlice from "./features/cartSlice";
import todoOrderSlice from "./features/orderSlice";
import accountSlice from "./features/accountSlice"

//хранилище состояний
//к нему подключаются все срезы
export const store = configureStore({
    reducer: {
        account:  accountSlice,
        categories: todoCategorySlice,
        products: todoProductSlice,
        carts: todoCartSlice,
        orders: todoOrderSlice
    },
});
