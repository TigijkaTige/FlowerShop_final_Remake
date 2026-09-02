import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//асинхронные действия, ыполняющие запросы и возвращающие результат редьюсерам для изменения состояний
const loadProductTodos = createAsyncThunk("product/loadProduct", async () => {
    const response = await fetch("http://localhost:5176/Products");
    const data = { message: "Товары есть", todos: await response.json() };
    //console.log(data);
    return data;
});

const detailsProductTodo = createAsyncThunk("product/detailsProduct", async (id) => {
    const response = await fetch(`http://localhost:5176/Products/Details/${id}`);
    const data = await response.json().catch(() => ({}));
    //console.log(data);
    return data;
});

const addProductTodo = createAsyncThunk(
    "product/addProduct",
    async ({ title, cost, description, categoryId, picture }) => {
        const formData = new FormData();
        if (title !== undefined && title !== null) formData.append("Title", title);
        if (cost !== undefined && cost !== null && cost !== "")
            formData.append("Cost", cost);
        formData.append("Description", description);
        if (categoryId !== undefined && categoryId !== null && categoryId !== "")
            formData.append("CategoryId", categoryId);
        if (picture) formData.append("Picture", picture, picture.name);

        const response = await fetch("http://localhost:5176/Products/Create", {
            method: "POST",
            body: formData,
            credentials: 'include'
        });
        

        const contentType = response.headers.get("content-type") || "";
        
        if (contentType.includes("application/json")) {
            return await response.json();
        }
        return null;
    }
);

const editProductTodo = createAsyncThunk(
    "product/editProduct", async ({ id, title, cost, description, categoryId, picture }) => {
        const formData = new FormData();
        formData.append("Id", id);
        if (title !== undefined && title !== null) formData.append("Title", title);
        if (cost !== undefined && cost !== null && cost !== "")
            formData.append("Cost", cost);
        formData.append("Description", description);
        if (categoryId !== undefined && categoryId !== null && categoryId !== "")
            formData.append("CategoryId", categoryId);
        if (picture) formData.append("Picture", picture, picture.name);

        const response = await fetch(`http://localhost:5176/Products/Edit/${id}`, {
            method: "POST",
            body: formData,
            credentials: 'include'
        });

        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
            return await response.json();
        }
        return null;
    }
)


const removeProductTodo = createAsyncThunk("product/removeProduct", async (id) => {
    const response = await fetch(`http://localhost:5176/Products/Delete/${id}`, {
        method: "POST",
        credentials: 'include'
    });
    const data = await response.json().catch(() => ({}));
    return { ...data, id };
});

//срез содержит в себе определенные состояния и методы их изменения для реализации конкретной функциональности(в данном случае, задач)
const todoProductSlice = createSlice({
    name: "products",
    //состояния
    initialState: {
        todos: [],
        message: "",
        error: "",
        loading: false,
        todo: [],
    },
    //функции изменения состояний
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadProductTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadProductTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload.todos;
                state.message = action.payload.message;
            })
            .addCase(loadProductTodos.rejected, (state, action) => {
                state.loading = false;
                //state.error = action.payload.error;
                state.error = action.error?.message || "Ошибка загрузки";
            })
            .addCase(addProductTodo.fulfilled, (state, action) => {
                if (Array.isArray(action.payload)) {
                    state.todos = action.payload;
                    state.message = "Товар добавлен ееее....";
                } else if (action.payload && action.payload.todo) {
                    state.message = action.payload.message;
                    state.todos.push(action.payload.todo);
                }
            }).addCase(detailsProductTodo.fulfilled, (state, action) => {
                state.todo = action.payload;
            })
            .addCase(addProductTodo.rejected, (state, action) => {
                state.error = action.payload.error;
            })
            .addCase(removeProductTodo.fulfilled, (state, action) => {
                if (action.payload && action.payload.id != null) {
                    state.todos = state.todos.filter(
                        (todo) => todo.id !== action.payload.id
                    );
                }
            });
    },
});

export { loadProductTodos, detailsProductTodo, addProductTodo, editProductTodo, removeProductTodo };
//экспортируем срез для подключения в хранилище
export default todoProductSlice.reducer;
