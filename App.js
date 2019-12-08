import React, { useState } from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux'; 
import { Provider } from 'react-redux';
import ShopNavigator from './nav/ShopNavigator'
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; 
import NavContainer from './nav/NavContainer';

import productsReducer from './store/reducers/products'; 
import cartReducer from './store/reducers/cart'
import orderReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth'; 

const rootReducer = combineReducers({
  products: productsReducer, 
  cart: cartReducer, 
  orders: orderReducer, 
  auth: authReducer
}); 

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, composedEnhancer); 

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'), 
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
}

export default function App() {

  const [fontLoaded, setFontLoaded] = useState(false); 
  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} /> 
  }
  return (
    <Provider store={store}> 
      <NavContainer />
    </Provider>
  );
}


