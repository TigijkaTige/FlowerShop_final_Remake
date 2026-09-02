import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const accountRegister = createAsyncThunk("registration/register", async ({ username, email, phoneNumber, birthday, password }) => {
    const response = await fetch("http://localhost:5176/Account/Register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ birthday, email, password, phoneNumber, username }),
        credentials: 'include'
    });
    const data = await response.json();
    //console.log(data);
    return data;
})

const accountLogin = createAsyncThunk("authentication/login", async ({ email, password }) => {
    const response = await fetch("http://localhost:5176/Account/Login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include'
    });
    const data = await response.json();
    //console.log(data);
    return data;
});

const accountSlice = createSlice({
    name: "user",
    //состояния
    initialState: {
        account: {},//пользователь? там и роль ну или
        message: "",
        error: "",
    },
    //функции изменения состояний
    reducers: {
        logout: (state) => {
            state.account = null;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder.addCase(accountLogin.fulfilled, (state, action) => {
            if (action.payload) {
                const account = action.payload.account;
                state.message = action.payload.message;
                console.log(state.message);
                state.account = account;
            }
        })
            .addCase(accountLogin.rejected, (state, action) => {
                state.error = action.payload.error;
            })
    },
});


export { accountLogin, accountRegister };
export const {logout} = accountSlice.actions;
//экспортируем срез для подключения в хранилище
export default accountSlice.reducer;
