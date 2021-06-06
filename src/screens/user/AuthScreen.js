import React from 'react';
import { KeyboardAvoidingView, ScrollView, StyleSheet } from 'react-native';

import { Input } from '../../components/UI';

export default function AuthScreen() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <ScrollView>
        <Input id="email" label="E-mail">
          Hello
        </Input>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {},
});
