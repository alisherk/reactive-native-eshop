export const ADD_TO_CART = 'ADD_TO_CART'; 
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'; 

export const addToCart = prod => {
    return { type: ADD_TO_CART, prod: prod };
}

export const removeFromCart = id => {
    return { type: REMOVE_FROM_CART, pid: id }; 
}