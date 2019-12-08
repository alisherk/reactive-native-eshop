import { DELETE_PRODUCT, CREATE_PRODUCT, UPDATE_PRODUCT, SET_PRODUCTS } from '../actions/products';
import Product from '../../models/product'; 

const initialState = {
  availableProducts: [],
  userProducts: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS: 
    return {
      ...state, 
      availableProducts: action.products,
      userProducts: action.userProducts
    }
    case CREATE_PRODUCT: 
         const newProduct = new Product(action.productData.id, action.productData.ownerId , action.productData.title, action.productData.desc, action.productData.imgUrl, action.productData.price);
         return {
           ...state, 
           availableProducts: state.availableProducts.concat(newProduct), 
           userProducts: state.userProducts.concat(newProduct)
         }
    case UPDATE_PRODUCT: 
         const prodIndex = state.userProducts.findIndex(prod => prod.id === action.pid); 
         const updatedProd = new Product(
           action.pid, 
           state.userProducts[prodIndex].ownerId, 
           action.productData.title, 
           action.productData.imgUrl, 
           action.productData.desc, 
           state.userProducts[prodIndex].price
           ); 
          const updateUserProds = [...state.userProducts]; 
          updateUserProds[prodIndex] = updatedProd; 
          const availableProdIndex = state.availableProducts.findIndex(prod => prod.id === action.pid); 
          const updatedAvalProds = [...state.availableProducts]; 
          updatedAvalProds[availableProdIndex] = updatedProd; 
          return {
            ...state, 
            availableProducts: updatedAvalProds, 
            userProducts: updateUserProds,
          }
    case DELETE_PRODUCT:
      return {
        ...state,
        userProducts: state.userProducts.filter(prod => prod.id !== action.pid),
        availableProducts: state.availableProducts.filter(
          prod => prod.id !== action.pid
        )
      };

    default:
      return state;
  }
};
