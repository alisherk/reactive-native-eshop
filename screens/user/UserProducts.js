import React from 'react';
import { View, Text, FlatList, Platform, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import ProductItem from '../../comps/shop/ProductItem';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustHeaderButton from '../../comps/ui/CustHeaderButton';
import Colors from '../../consts/Colors';
import * as prodActions from '../../store/actions/products';

const UserProducts = props => {
  const dispatch = useDispatch();
  const userProducts = useSelector(state => state.products.userProducts);
  const editProductHandler = id => {
    props.navigation.navigate('EditProducts', {
      productId: id
    });
  };
  const deleteHandler = id => {
    Alert.alert('Delete item','Are you sure you want to delete ?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(prodActions.deleteProduct(id));
        }
      }
    ]);
  };
  
  if(userProducts.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
         <Text> No products found </Text>
      </View> 
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          onSelect={() => {
            editProductHandler(itemData.item.id);
          }}
          image={itemData.item.imgUrl}
          title={itemData.item.title}
          price={itemData.item.price}
        >
          <Button
            color={Colors.primary}
            title='Edit'
            onPress={() => {
              editProductHandler(itemData.item.id);
            }}
          />
          <Button
            color={Colors.primary}
            title='Delete'
            onPress={deleteHandler.bind(this, itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProducts.navigationOptions = navData => {
  return {
    headerTitle: 'Your products',
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
          title='Add'
          iconName={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
          onPress={() => {
            navData.navigation.navigate('EditProducts');
          }}
        />
      </HeaderButtons>
    )
  };
};

export default UserProducts;
