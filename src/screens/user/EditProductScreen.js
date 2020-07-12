import React, { useEffect, useCallback, useReducer } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import {
  getSelectedProduct,
  updateProduct,
  createProduct,
} from '../../ducks/productsDuck';
import { Input } from '../../components/UI';

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

    if (!isEditing) {
      dispatch(createProduct({ title, imageUrl, description, price: +price }));
    } else {
      dispatch(updateProduct({ id: productId, title, imageUrl, description }));
    }
    navigation.goBack();
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
