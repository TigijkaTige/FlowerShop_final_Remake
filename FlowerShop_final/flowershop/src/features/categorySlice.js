import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//асинхронные действия, ыполняющие запросы и возвращающие результат редьюсерам для изменения состояний
const loadCategoryTodos = createAsyncThunk("category/loadCategory", async () => {
    const response = await fetch("http://localhost:5176/Categories");
    const data = { message: "Категории есть", todos: await response.json() };
    //console.log(data);
    return data;
});


const addCategoryTodo = createAsyncThunk(
    "category/addCategory",
    async ({ title }) => {
        const response = await fetch("http://localhost:5176/Categories/Create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                //'RequestVerificationToken': csrfToken,
                
            },
            body: JSON.stringify({ title }),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        return data;
    }
);
//Доработать, при измение думаю будет сплывающее окошко
const editCategoryTodo = createAsyncThunk(
    "category/editCategory", async ({ id, title }) => {
        const response = await fetch(`http://localhost:5176/Categories/Edit/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"

            },
            body: JSON.stringify({ id, title }),
            credentials: 'include'
        });
        const data = await response.json();
        //console.log(data);
        return data;
    }
)



const removeCategoryTodo = createAsyncThunk("category/removeCategory", async (id) => {
    const response = await fetch(`http://localhost:5176/Categories/Delete/${id}`, {
        //method: "DELETE",
        method: "POST",
        credentials: 'include'
    });
    const data = await response.json().catch(() => ({}));
    return { ...data, id };
});

//срез содержит в себе определенные состояния и методы их изменения для реализации конкретной функциональности(в данном случае, задач)
const todoCategorySlice = createSlice({
    name: "categories",
    //состояния
    initialState: {
        todos: [],
        message: "",
        error: "",
        loading: false
    },
    //функции изменения состояний
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadCategoryTodos.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadCategoryTodos.fulfilled, (state, action) => {
                state.loading = false;
                state.todos = action.payload.todos;
                state.message = action.payload.message;
            })
            .addCase(loadCategoryTodos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error;
            })
            .addCase(addCategoryTodo.fulfilled, (state, action) => {
                const todo = action.payload.todo;
                state.message = action.payload.message;
                console.log(state.message);
                // state.todos.push({
                //     id: todo.id,
                //     title: todo.title,
                // });
                if (action.payload) {
                    state.todos = action.payload

                }
            })
            .addCase(addCategoryTodo.rejected, (state, action) => {
                state.error = action.payload.error;
            })
            .addCase(removeCategoryTodo.fulfilled, (state, action) => {
                if (action.payload && action.payload.id != null) {
                    state.todos = state.todos.filter(
                        (todo) => todo.id !== action.payload.id
                    );
                }
            }).addCase(editCategoryTodo.fulfilled, (state, action) => {
                if (action.payload) {
                    state.todos = action.payload

                }
            });

    },
});


export { loadCategoryTodos, addCategoryTodo, editCategoryTodo, removeCategoryTodo };
//экспортируем срез для подключения в хранилище
export default todoCategorySlice.reducer;
