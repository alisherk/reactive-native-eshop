import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustHeaderButton from '../../comps/ui/CustHeaderButton';
import OrderItem from '../../comps/shop/OrderItem';
import * as orderActions from '../../store/actions/orders'; 
import Colors from '../../consts/Colors';

const Orders = props => {
  const [isLoading, setIsLoading] = useState(false);
  const orders = useSelector(state => state.orders.orders);
  const dispatch = useDispatch(); 

  useEffect(() => {
    setIsLoading(true)
    dispatch(orderActions.fetchOrders())
    .then(() => {
      setIsLoading(false);
    });
  }, [dispatch]);

  if(isLoading) {
    return (
        <View style={styles.center}> 
          <ActivityIndicator size='large' color={Colors.primary} />
        </View>
    ); 
  }

  if(orders.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
         <Text> No orders found </Text>
      </View> 
    )
  }

  return (
    <FlatList
      data={orders}
      keyExtractor={item => item.id}
      renderItem={itemData => <OrderItem amount={itemData.item.totalAmt} date={itemData.item.readableDate} items={itemData.item.items}/>}
    />
  );
};

Orders.navigationOptions = navData => {
  return {
    headerTitle: 'Your orders',
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={CustHeaderButton}>
        <Item
          title='Menu'
          iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ), 
  }
};

const styles = StyleSheet.create({
  center: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default Orders;
