import React, { useState } from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  FlatList,
  StyleSheet,
  Button
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../consts/Colors';
import CartItem from '../../comps/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../comps/ui/Card';

const Cart = props => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const cartTotalAmount = useSelector(state => state.cart.totalAmount);
  const cartItems = useSelector(state =>
    Object.keys(state.cart.items).map(
      key => {
        return {
          productId: key,
          productTitle: state.cart.items[key].prodTitle,
          productPrice: state.cart.items[key].prodPrice,
          quantity: state.cart.items[key].quantity,
          sum: state.cart.items[key].sum
        };
      }
      /*    const transformedCartItems = [];
    for (const key in state.cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: state.cart.items[key].prodTitle,
        productPrice: state.cart.items[key].prodPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum
      });
    }
    return transformedCartItems; */
    )
  );

  const sendOrderHandler = async () => {
    setIsLoading(true);
    await dispatch(orderActions.addOrder(cartItems, cartTotalAmount));
    setIsLoading(false);
  };
  
  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}{' '}
          </Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size='small' color={Colors.primary} />
        ) : (
          <Button
            disabled={cartItems.length === 0}
            color={Colors.accent}
            title='Order now'
            onPress={sendOrderHandler}
          />
        )}
      </Card>
      <View>
        <FlatList
          data={cartItems.sort((a, b) => a.productId - b.productId)}
          keyExtractor={item => item.productId}
          renderItem={itemData => (
            <CartItem
              quantity={itemData.item.quantity}
              title={itemData.item.productTitle}
              amount={itemData.item.sum}
              deletable
              onRemove={() => {
                dispatch(cartActions.removeFromCart(itemData.item.productId));
              }}
            />
          )}
        />
      </View>
    </View>
  );
};

Cart.navigationOptions = {
  headerTitle: 'Your cart'
};

const styles = StyleSheet.create({
  screen: {
    margin: 20
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10
  },
  summaryText: {
    fontFamily: 'open-sans-bold',
    fontSize: 18
  },
  amount: {
    color: Colors.primary
  }
});

export default Cart;
