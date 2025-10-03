import { createSlice } from "@reduxjs/toolkit";

const initialState = []

export let cartSlicer = createSlice({
    name : "cart",
    initialState,
    reducers:{
        add: (state,action)=>{
            state.push(action.payload)
        },
        deleteCartItem: (state,action)=>{
            return state.filter((el)=>el.id!==action.payload)
        },
        addQuantity: (state,action)=>{
            let element = state.find((el)=>el.id===action.payload.id)
            element.quantity += 1;
            state = [...state,element]
        },
        incQuantity: (state,action)=>{
            let element = state.find((el)=>el.id===action.payload)
            element.quantity += 1;
        },
        decQuantity: (state,action)=>{
            let element = state.find((el)=>el.id===action.payload)
            if(element.quantity > 1){
                element.quantity -= 1;
            }
        }
    }
})

export const {add,deleteCartItem,addQuantity,incQuantity,decQuantity} = cartSlicer.actions
export default cartSlicer.reducer