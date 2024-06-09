import { createSlice,PayloadAction } from "@reduxjs/toolkit"


const ListRefreshSlice= createSlice(
    {
        name:"collectionCount",
        initialState:{
            toRefresh:false,
        },reducers:{
            setRefresh:(state,action:PayloadAction<any>)=>{
                const{toRefresh} = action.payload;
                state.toRefresh= toRefresh;
            }
        }
    }
)

export const {setRefresh} = ListRefreshSlice.actions;
export default ListRefreshSlice.reducer;