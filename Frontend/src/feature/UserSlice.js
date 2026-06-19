import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:"user",
    initialState : {username:"",email:"",id:""},
    reducers:{
        updateUserInfo : (state,action)=>{
            state.email = action.payload.email
            state.id = action.payload.id
            state.username = action.payload.username
        },
        clearUserInfo : (state)=>{
            state.email = ""
            state.id = ""
            state.username = ""
        }
    }
})

export const {updateUserInfo,clearUserInfo} = userSlice.actions
export default userSlice.reducer