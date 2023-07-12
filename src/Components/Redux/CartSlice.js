import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


let initialState = { counterItems: 0 , cartOwner:''  , cartProducts:[] ,totalCartPrice:'' ,numOfCartItems:0 }


let counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        // increment: (state) => {
        //     state.numOfCartItems++;
        // },

        decrement: (state) => {
            state.counterItems--;
        },

        fillCartOwner: (state,action)=>{
            state.cartOwner=action.payload
        },

        fillCartProducts: (state,action)=>{
            state.cartProducts=action.payload
        },

        fillTotalCartPrice: (state,action)=>{
            state.totalCartPrice=action.payload
        },
        
        fillNumOfCartItems: (state,action)=>{
            state.numOfCartItems=action.payload
        },
        
        
    }
    
})

export let counterReducer = counterSlice.reducer
export let { increment , decrement , fillCartOwner , fillCartProducts , fillTotalCartPrice , fillNumOfCartItems} = counterSlice.actions