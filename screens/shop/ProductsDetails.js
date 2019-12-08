import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  ScrollView
} from 'react-native';
import Colors from '../../consts/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductsDetails = props => {
  const dispatch = useDispatch();
  const productId = props.navigation.getParam('productId');
  const selectedProduct = useSelector(state =>
    state.products.availableProducts.find(prod => prod.id === productId)
  );
  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imgUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title='Add to cart' onPress={() => {
          dispatch(cartActions.addToCart(selectedProduct));
        }} />
      </View>
      <Text style={styles.price}> {selectedProduct.price.toFixed(2)} </Text>
      <Text style={styles.desc}> {selectedProduct.desc} </Text>
    </ScrollView>
  );
};

ProductsDetails.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle')
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 400
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20, 
    fontFamily: 'open-sans-bold'
  },
  desc: {
    fontSize: 14,
    textAlign: 'center', 
    marginHorizontal: 20, 
    fontFamily: 'open-sans'
    
  }, 
  actions: {
      marginVertical: 10, 
      alignItems: 'center'
  }
});

export default ProductsDetails;
