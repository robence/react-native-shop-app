import React, { useState, useEffect, useCallback, useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  getSelectedProduct,
  updateProduct,
  createProduct,
} from '../../ducks/productsDuck';
import { Input } from '../../components/UI';
import Colors from '../../constants/Colors';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    return {
      inputValues: {
        ...state.inputValues,
        [action.input]: action.value,
      },
      inputValidities: {
        ...state.inputValidities,
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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

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

  useEffect(() => {
    if (error) {
      Alert.alert('An error occuredd!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const dispatch = useDispatch();
  const onSubmit = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [
        { text: 'Okay' },
      ]);
      return;
    }

    setError(false);
    setIsLoading(true);
    try {
      if (!isEditing) {
        await dispatch(
          createProduct({ title, imageUrl, description, price: +price })
        );
      } else {
        await dispatch(
          updateProduct({ id: productId, title, imageUrl, description })
        );
      }
      navigation.goBack();
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
    setIsLoading(false);
  }, [
    formState.formIsValid,
    title,
    isEditing,
    navigation,
    dispatch,
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

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier,
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={isEditing ? product.title : ''}
            initialValidity={isEditing}
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url!"
            keyboardType="default"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={isEditing ? product.imageUrl : ''}
            initialValidity={isEditing}
            required
          />
          {!isEditing && (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price!"
              keyboardType="decimal-pad"
              returnKeyType="next"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
            />
          )}
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={isEditing ? product.description : ''}
            initialValidity={isEditing}
            required
            minLength={5}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
