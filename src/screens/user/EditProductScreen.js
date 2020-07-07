import React, { useEffect, useCallback, useReducer } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  getSelectedProduct,
  updateProduct,
  createProduct,
} from '../../ducks/productsDuck';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    return {
      ...state,
      inputValues: {
        ...state.inputValues,
        [action.input]: action.value,
      },
      inputValidities: {
        ...state.inputValues,
        [action.input]: action.isValid,
      },
      formIsValid:
        Object.values(state.inputValidities).every(
          (isInputValid) => isInputValid
        ) && action.isValid,
    };
  }
  return state;
};

export default function EditProductScreen({ navigation, route }) {
  const productId = route.params?.id;
  const product = useSelector(getSelectedProduct(productId));
  const isEditing = !!product;

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: product?.title ?? '',
      imageUrl: product?.imageUrl ?? '',
      description: product?.description ?? '',
      price: '',
    },
    inputValidities: {
      title: isEditing,
      imageUrl: isEditing,
      description: isEditing,
      price: isEditing,
    },
    formIsValid: isEditing,
  });

  const { title, description, imageUrl, price } = formState.inputValues;

  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }

    if (!product) {
      dispatch(createProduct({ title, imageUrl, description, price: +price }));
    } else {
      dispatch(updateProduct({ id: productId, title, imageUrl, description }));
    }
    navigation.goBack();
  }, [
    formState.formIsValid,
    product,
    navigation,
    dispatch,
    title,
    imageUrl,
    description,
    price,
    productId,
  ]);

  useEffect(() => {
    const isScreenAvailable = navigation
      .dangerouslyGetState()
      .routes.find((a) => a.name === 'EditProductScreen');

    // needed because navigation.goBack() runs after onSubmit
    if (isScreenAvailable) {
      navigation.setParams({ onSubmit });
    }
  }, [onSubmit, navigation]);

  const textChangeHandler = (inputIdentifier, text) => {
    let isValid = false;
    if (text.trim().length > 0) {
      isValid = true;
    }
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: text,
      isValid,
      input: inputIdentifier,
    });
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => textChangeHandler('title', text)}
          />
          {!formState.inputValidities.title && (
            <Text>Please enter a valid title</Text>
          )}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => textChangeHandler('imageUrl', text)}
          />
        </View>
        {!isEditing && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => textChangeHandler('price', text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => textChangeHandler('description', text)}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: '100%',
  },
  label: {
    fontFamily: 'open-sans-bold',
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
});
