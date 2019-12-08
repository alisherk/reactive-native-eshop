import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity, 
  TouchableNativeFeedback, 
  Platform
} from 'react-native';
import Card from '../ui/Card';

const ProductItem = props => {
   let TouchableComp = TouchableOpacity; 
   if(Platform.OS === 'android' && Platform.Version >= 21){
     TouchableComp = TouchableNativeFeedback
   }
  return (
      <Card style={styles.product}>
        <TouchableComp useForeground onPress={props.onSelect} >
        <View style={styles.imgContainer}>
          <Image style={styles.image} source={{ uri: props.image }} />
        </View>
        <View style={styles.details}>
          <Text style={styles.title}> {props.title} </Text>
          <Text style={styles.price}> ${props.price.toFixed(2)} </Text>
        </View>
        <View style={styles.action}>
          {props.children}
        </View>
        </TouchableComp>
      </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    height: 300, 
    margin: 20
  },
  imgContainer: {
    width: '100%',
    height: '60%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  title: {
    fontSize: 18,
    marginVertical: 10, 
    fontFamily: 'open-sans-bold'
  },
  price: {
    fontSize: 14,
    color: '#888', 
    fontFamily: 'open-sans'
  },
  action: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  },
  details: {
    alignItems: 'center',
    height: '17%'
  }
});

export default ProductItem;
