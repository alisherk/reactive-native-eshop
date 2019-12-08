import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import ProductsOverview from '../screens/shop/ProductsOverview';
import Colors from '../consts/Colors';
import { Platform, SafeAreaView, Button, View } from 'react-native';
import ProductDetails from '../screens/shop/ProductsDetails';
import Cart from '../screens/shop/Cart';
import Orders from '../screens/shop/Orders';
import { Ionicons } from '@expo/vector-icons';
import UserProducts from '../screens/user/UserProducts';
import EditProducts from '../screens/user/EditProducts'; 
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/user/StartupScreen';
import { useDispatch } from 'react-redux'; 
import * as authActions from '../store/actions/auth';
import auth from '../store/reducers/auth';

const defaultNavOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
      fontFamily: 'open-sans-bold'
    },
    headerBackTitleStyle: {
      fontFamily: 'open-sans'
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
  }
};

const ProductsNav = createStackNavigator(
  {
    ProductsOverview,
    ProductDetails,
    Cart
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrdersNav = createStackNavigator(
  {
    Orders
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const AdminNav = createStackNavigator(
  {
   UserProducts, 
   EditProducts
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNav,
    Orders: OrdersNav,
    Admin: AdminNav
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary
    }, 
    contentComponent: props => {
      const dispatch = useDispatch();
      return (
        <View style={{flex: 1, alignSelf: 'flex-start'}}> 
          <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}} > 
             <DrawerItems {...props} />
             <Button title='Logout' color={Colors.primary} onPress={() => {
               dispatch(authActions.logout())
               //props.navigation.navigate('Auth');
             }} />
          </SafeAreaView>
        </View>
      )
    }
  }
);

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, {defaultNavigationOptions: defaultNavOptions }); 

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);
