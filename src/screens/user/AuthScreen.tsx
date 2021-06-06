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
        <Input
          id="email"
          label="E-mail"
          keyboardType="email-address"
          required
          email
          autoCapitalize="none"
          errorText="Please enter a valid email address."
          onInputChange={() => {}}
          initialValue=""
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {},
});
