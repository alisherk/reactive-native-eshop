export const ADD_ORDER = 'ADD_ORDER';
export const SET_ORDER = 'SET_ORDERS';

import Order from '../../models/order';

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    try {
      const resp = await fetch(
        `https://react-native-app-c6b14.firebaseio.com/orders/${userId}.json`
      );
      if (!resp.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await resp.json();
      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmt,
            new Date(resData[key].date)
          )
        );
      }
      dispatch({ type: SET_ORDER, orders: loadedOrders });
    } catch (err) {
      throw err;
    }
  };
};

export const addOrder = (cartItems, totalAmt) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const userid = getState().auth.userId;
    try {
      const date = new Date();
      const resp = await fetch(
        `https://react-native-app-c6b14.firebaseio.com/orders/${userid}.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cartItems,
            totalAmt,
            date: date.toISOString()
          })
        }
      );

      if (!resp.ok) {
        throw new Error('oops something went wrong');
      }

      const resData = await resp.json();

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalAmt,
          date: date
        }
      });
    } catch (err) {
      throw err;
    }
  };
};
