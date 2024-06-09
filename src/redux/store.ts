import { configureStore } from "@reduxjs/toolkit";
import {TypedUseSelectorHook, useSelector } from "react-redux";
import collectionCount_slice from "./feathers/collectionCount_slice";
import listRefresh_slice from "./feathers/listRefresh_slice";

export const store  = configureStore({
    reducer:{
        collectionCount_slice,
        listRefresh_slice,
    
    }
})

export type Rootstate = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppSelector:TypedUseSelectorHook<Rootstate> = useSelector;