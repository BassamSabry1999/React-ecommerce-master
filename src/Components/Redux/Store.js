import { configureStore } from "@reduxjs/toolkit";
import { counterReducer } from "./CartSlice";

export let store = configureStore({
    reducer:{
        counterItems:counterReducer
    }
})