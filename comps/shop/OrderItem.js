import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../../consts/Colors';
import CartItem from '../../comps/shop/CartItem';
import Card from '../ui/Card'; 

const OrderItem = props => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}> {props.amount.toFixed(2)} </Text>
        <Text style={styles.date}> {props.date} </Text>
      </View>
        <Button
          color={Colors.primary}
          title={showDetails ? 'Hide details' : 'Show details'}
          onPress={() => {
            setShowDetails(prevState => !prevState);
          }}
        />
      {showDetails && (
        <View style={styles.detailItem}>
          {props.items.map(cartItem => (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              amount={cartItem.sum}
              title={cartItem.productTitle}
            />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20
  },
  totalAmount: {
    fontFamily: 'open-sans-bold',
    fontSize: 16
  },
  date: {
    fontSize: 16,
    fontFamily: 'open-sans',
    color: '#888'
  },
  button: {
    alignSelf: 'flex-end'
  }, 
  detailItem: {
    width: '100%'
  }
});

export default OrderItem;
