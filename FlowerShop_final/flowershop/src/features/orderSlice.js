import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//асинхронные действия, ыполняющие запросы и возвращающие результат редьюсерам для изменения состояний
const loadOrderAdminTodos = createAsyncThunk("order/loadAdminOrder", async () => {
    const response = await fetch("http://localhost:5176/Orders", { credentials: 'include' });
    const data = await response.json();
    //console.log(data);
    return data;
});
const loadOrderTodos = createAsyncThunk("order/loadOrder", async () => {
    const response = await fetch("http://localhost:5176/Orders/AllMyOrder", { credentials: 'include' });
    const data = await response.json();
    //console.log(data);
    return data;
});

const addOrderTodo = createAsyncThunk(
    "order/addOrder",
    async ({ deliverDate, address }) => {
        const response = await fetch("http://localhost:5176/Orders/Create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                //'RequestVerificationToken': csrfToken,

            },
            body: JSON.stringify({ deliverDate, address }),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        return data;
    }
);

const confirmOrderTodo = createAsyncThunk(
    "order/confirmOrder", async (id) => {
        const response = await fetch(`http://localhost:5176/Orders/Confirm/${id}`, {
            method: "POST",
            credentials: 'include'
        });
        const data = await response.json().catch(() => ({}));
        //console.log(data);
        return { ...data, id };
    }
)

const cancelOrderTodo = createAsyncThunk("order/cancelOrder", async (id) => {
    const response = await fetch(`http://localhost:5176/Orders/Cancel/${id}`, {
        //method: "DELETE",
        method: "POST",
        credentials: 'include'
    });
    const data = await response.json().catch(() => ({}));
    return { ...data, id };
});


const detailsOrderTodo = createAsyncThunk("order/detailsOrder", async (id) => {
    const response = await fetch(`http://localhost:5176/Orders/Details/${id}`, { credentials: 'include' });
    const data = await response.json().catch(() => ({}));
    //console.log(data);
    return data;
});

//срез содержит в себе определенные состояния и методы их изменения для реализации конкретной функциональности(в данном случае, задач)
const todoOrderSlice = createSlice({
    name: "orders",
    //состояния
    initialState: {
        todos: [],
        current: [],
        delivered: [],
        message: "",
        error: "",
        loading: false,
        todo: []
    },
    //функции изменения состояний
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadOrderTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadOrderTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload.todos;
                state.message = action.payload.message;
            })
            .addCase(loadOrderTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(loadOrderAdminTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadOrderAdminTodos.fulfilled, (state, action) => {
                state.loading = false;
                //state.todos = action.payload.todos;
                state.current = action.payload.current;
                state.delivered = action.payload.delivered;
                state.message = action.payload.message;
            })
            .addCase(loadOrderAdminTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(addOrderTodo.fulfilled, (state, action) => {
                state.message = action.payload.message;
                console.log(state.message);
            })
            .addCase(addOrderTodo.rejected, (state, action) => {
                state.error = action.payload.error;

            })
            .addCase(detailsOrderTodo.fulfilled, (state, action) => {
                            state.todo = action.payload;
                        })
            .addCase(cancelOrderTodo.fulfilled, (state, action) => {
                if (action.payload && action.payload.id != null) {
                    state.current = state.current.filter(
                        (todo) => todo.id !== action.payload.id
                    );
                }
            }).addCase(confirmOrderTodo.fulfilled, (state, action) => {
                if (action.payload && action.payload.id != null) {
                    state.current = state.current.filter(
                        (todo) => todo.id !== action.payload.id
                    );
                }
            });

    },
});


export { loadOrderTodos, loadOrderAdminTodos, addOrderTodo, confirmOrderTodo, cancelOrderTodo, detailsOrderTodo };
//экспортируем срез для подключения в хранилище
export default todoOrderSlice.reducer;
