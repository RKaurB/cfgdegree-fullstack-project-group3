import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState : {username:"",email:"",id:""},
    reducers:{
        updateUserInfo : (state,action)=>{
            state.email = action.payload.email
            state.id = action.payload.id
            state.username = action.payload.username
            localStorage.setItem("email",action.payload.email)
            localStorage.setItem("id",action.payload.id)
            localStorage.setItem("username",action.payload.username)
        },
        clearUserInfo : (state)=>{
            state.email = ""
            state.id = ""
            state.username = ""
            localStorage.clear()
        },
        updateUserInfoforVariable : (state,action)=>{
            state.email = action.payload.email
            state.id = action.payload.id
            state.username = action.payload.username
        }
    }
})

export const {updateUserInfo,clearUserInfo,updateUserInfoforVariable} = userSlice.actions
export default userSlice.reducer