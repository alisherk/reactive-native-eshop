import React, { useEffect, useState, useCallback } from 'react';
import { Text, StyleSheet, View, FlatList, Button, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../comps/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustHeaderButton from '../../comps/ui/CustHeaderButton';
import Colors from '../../consts/Colors';
import * as productActions from '../../store/actions/products';

const ProductsOverview = props => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const products = useSelector(state => state.products.availableProducts);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    setIsRefreshing(true)
    setError(null);
    try {
    await dispatch(productActions.fetchProducts());
    setIsRefreshing(false);
  } catch (err) {
       setError(err.message); 
       setIsRefreshing(false);
    }
  }, [dispatch, setIsLoading, setError]);  
   

  useEffect(() => { 
    setIsLoading(true)
    loadProducts().then(() => {
      setIsLoading(false)
    }); 
  }, [dispatch, loadProducts]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener('willFocus', loadProducts); 
    return () => {
      willFocusSub.remove();
    }
  },[loadProducts]);

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetails', {
      productId: id,
      productTitle: title
    });
  };

  if(error) {
    return (
      <View style={styles.center}> 
          <Text> Error ocurred </Text>
          <Button color={Colors.primary} title='Try again' onPress={loadProducts} />
      </View>
    );
  }
  if (isLoading) {
    return (
      <View style={styles.center}> 
        <ActivityIndicator size='large' color={Colors.primary} />
      </View>
    );
  }
  if(isLoading && products.length === 0){
    return (
      <View style={styles.center}>
        <Text> No products found </Text>
      </View> 
    )
  }
  return (
    <FlatList
      onRefresh={loadProducts}
      refreshing={isRefreshing}
      data={products}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
        >
          <Button
            color={Colors.primary}
            title='View Details'
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          />
          <Button
            color={Colors.primary}
            title='To Cart'
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverview.navigationOptions = navData => {
  return {
    headerTitle: 'All products',
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

    headerRight: (
      <HeaderButtons HeaderButtonComponent={CustHeaderButton}>
        <Item
          title='Cart'
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
   center: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
   }
});

export default ProductsOverview;
