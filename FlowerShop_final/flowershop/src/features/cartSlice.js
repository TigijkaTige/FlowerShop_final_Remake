import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//асинхронные действия, ыполняющие запросы и возвращающие результат редьюсерам для изменения состояний
const loadCartTodos = createAsyncThunk("cart/loadCart", async () => {
    const response = await fetch("http://localhost:5176/Carts", { credentials: 'include' });
    const data = await response.json();
    //console.log(data);
    return data;
});


const addCartTodo = createAsyncThunk(
    "cart/addCart",
    async ({ productId, CountPr }) => {
        const response = await fetch("http://localhost:5176/Carts/Create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                //'RequestVerificationToken': csrfToken,

            },
            body: JSON.stringify({ productId, CountPr }),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        return data;
    }
);


//срез содержит в себе определенные состояния и методы их изменения для реализации конкретной функциональности(в данном случае, задач)
const todoCartSlice = createSlice({
    name: "carts",
    //состояния
    initialState: {
        todos: [],
        message: "",
        error: "",
        summa: "",
        loading: false
    },
    //функции изменения состояний
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCartTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadCartTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload.todos;
                state.message = action.payload.message;
                state.summa = action.payload.summa;
            })
            .addCase(loadCartTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(addCartTodo.fulfilled, (state, action) => {
                state.message = action.payload.message;
                state.summa = action.payload.summa;
                //state.loading = false;
                console.log(state.message);
                // Обновляем todos из ответа сервера
                if (action.payload && action.payload.todos) {
                    state.todos = action.payload.todos;

                } // Если пришел конкретный обновленный товар
                else if (action.payload && action.payload.todo) {
                    const updatedTodo = action.payload.todo;
                    // Ищем индекс товара в массиве по id
                    const index = state.todos.findIndex(todo => todo.id === updatedTodo.id);

                    if (index !== -1) {
                        // Обновляем существующий товар
                        state.todos[index] = updatedTodo;
                    } else {
                        // Добавляем новый товар (если его не было)
                        state.todos.push(updatedTodo);
                    }
                }
                else if (action.payload && Array.isArray(action.payload)) {
                    state.todos = action.payload;
                }

            }).addCase(addCartTodo.pending, (state) => {
                //state.loading = true;
            })
            .addCase(addCartTodo.rejected, (state, action) => {
                //state.loading = false;
                state.error = action.payload?.error || "Ошибка обновления корзины";
            });


    },
});


export { loadCartTodos, addCartTodo };

export default todoCartSlice.reducer;
