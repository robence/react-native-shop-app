import React, { useState, useEffect, useCallback } from 'react';
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

export default function EditProductScreen({ navigation, route }) {
  const productId = route.params?.id;
  const product = useSelector(getSelectedProduct(productId));

  const [title, setTitle] = useState(product?.title ?? '');
  const [titleIsValid, setTitleIsValid] = useState(false);

  const [imageUrl, setImageUrl] = useState(product?.imageUrl ?? '');
  const [price, setPrice] = useState(product?.price?.toString() ?? '');
  const [description, setDescription] = useState(product?.description ?? '');

  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    if (!titleIsValid) {
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
    titleIsValid,
    product,
    navigation,
    dispatch,
    title,
    imageUrl,
    description,
    price,
    productId,
  ]);

  console.log(titleIsValid);

  useEffect(() => {
    const isScreenAvailable = navigation
      .dangerouslyGetState()
      .routes.find((a) => a.name === 'EditProductScreen');

    // needed because navigation.goBack() runs after onSubmit
    if (isScreenAvailable) {
      navigation.setParams({ onSubmit });
    }
  }, [onSubmit, navigation]);

  const titleChangeHandler = (text) => {
    if (text.trim().length === 0) {
      setTitleIsValid(false);
    } else {
      setTitleIsValid(true);
    }
    setTitle(text);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(text) => titleChangeHandler(text)}
          />
          {!titleIsValid && <Text>Please enter a valid title</Text>}
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(text) => setImageUrl(text)}
          />
        </View>
        {!product && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={(text) => setPrice(text)}
              keyboardType="decimal-pad"
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(text) => setDescription(text)}
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
