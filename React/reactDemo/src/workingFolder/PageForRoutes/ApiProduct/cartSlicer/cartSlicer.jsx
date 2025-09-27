import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export let cartSlicer = createSlice({
    name : "cart",
    initialState,
    reducers:{
        add: (state,action)=>{
            state.push(action.payload)
        },
        addQuantity: (state,action)=>{
            let element = state.find((el)=>el.id===action.payload.id)
            element.quantity += 1;
            state = [...state,element]
        }
    }
})

export const {add,addQuantity} = cartSlicer.actions
export default cartSlicer.reducer