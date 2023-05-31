import { createSlice } from "@reduxjs/toolkit"

const initialState={
    product:[],
}

const productSlice=createSlice({
    name:"products",
    initialState,

    reducers:{
        setProductData:(state,action)=>{
            state.product=action.payload
        },   
        toggleSelect: (state, action) => {
            const { id } = action.payload;
            const selectedProduct = state.product.find((item) => item.id === id);
            if (selectedProduct) {
              selectedProduct.isSelected = !selectedProduct.isSelected;
            }
          }, 
    },
    
})

export const {setProductData,toggleSelect}=productSlice.actions
export default productSlice.reducer 