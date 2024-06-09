import { createSlice,PayloadAction } from "@reduxjs/toolkit"


const collectionCountSlice= createSlice(
    {
        name:"collectionCount",
        initialState:{
            curPage:1,
            toRefresh:false,
        },reducers:{
            setPage:(state,action:PayloadAction<any>)=>{
                const{curPage,toRefresh} = action.payload;
                state.curPage= curPage;
                state.toRefresh = toRefresh;
            }
        }
    }
)

export const {setPage} = collectionCountSlice.actions;
export default collectionCountSlice.reducer;