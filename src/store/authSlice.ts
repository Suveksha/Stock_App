import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState={
  user:null
}

    const authSlice=createSlice({
      name:"auth",
      initialState,
      reducers:{
        login:(state,action)=>{
          state.user=action.payload.user
        },
        logout:(state)=>{
          state.user=null
        },
         restoreUser: (state) => {
      const storedUser = Cookies.get("user");
      if (storedUser) {
        state.user = JSON.parse(storedUser);
      }
    }
      }
    })

    export const {login,logout, restoreUser}=authSlice.actions
    export default authSlice.reducer