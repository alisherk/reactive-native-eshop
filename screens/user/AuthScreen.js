import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  View,
  ActivityIndicator, 
  Alert
} from 'react-native';
import Input from '../../comps/ui/Input';
import Card from '../../comps/ui/Card';
import Colors from '../../consts/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';
import { formReducer } from '../reducer/formReducer';
import { FORM_INPUT_UPDATE } from '../reducer/formReducer';

const AuthScreen = props => {

  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if(error){
      Alert.alert('An error ocurred', error, [{text: 'Okay'}]); 
    }
  },[error]);

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: ''
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  const authHandler = async () => {
    let action;
    if (formState.formIsValid && isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else  {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    } 
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={50}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView keyboardShouldPersistTaps={'always'}>
            <Input
              id='email'
              label='Email'
              keyboardType='email-address'
              required
              email
              autoCapitalize='none'
              errorText='Please enter a valid email'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <Input
              id='password'
              label='Password'
              keyboardType='default'
              secureTextEntry
              required
              minLength={5}
              autoCapitalize='none'
              errorText='Please enter a valid password'
              onInputChange={inputChangeHandler}
              initialValue=''
            />
            <View style={styles.btnCotainer}>
              {isLoading ? (
                <ActivityIndicator size='small' color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'Sign up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
              <Button
                title={`Switch to ${isSignup ? 'Login' : 'Signup'}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: 'Authenticate'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 15
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnCotainer: {
    marginHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});

export default AuthScreen;
