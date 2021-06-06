import React, { useReducer, useEffect } from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TextInputProps,
} from 'react-native';

const INPUT_CHANGE = 'INPUT_CHANGE';
const INPUT_BLUR = 'INPUT_BLUR';

type InputChangeAction = {
  type: typeof INPUT_CHANGE;
  value: string;
  isValid: boolean;
};

type InputBlurAction = {
  type: typeof INPUT_BLUR;
};

type InputAction = InputChangeAction | InputBlurAction;

const inputReducer = (state, action: InputAction) => {
  switch (action.type) {
    case INPUT_CHANGE:
      return {
        ...state,
        value: action.value,
        isValid: action.isValid,
      };
    case INPUT_BLUR:
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

type FormValidationProps = {
  min?: number;
  minLength?: number;
  max?: number;
  email?: boolean;
  required?: boolean;
};

type InputProps = {
  id: string;
  label: string;
  errorText: string;
  onInputChange: Function;
  initialValidity?: boolean;
  initialValue?: string;
} & FormValidationProps &
  TextInputProps;

export default function Input({
  id,
  label,
  errorText,
  onInputChange,
  initialValidity = false,
  initialValue = '',
  ...props
}: InputProps) {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: initialValue,
    isValid: initialValidity,
    touched: false,
  });

  const { value, touched } = inputState;

  useEffect(() => {
    if (inputState.touched) {
      onInputChange(id, inputState.value, inputState.isValid);
    }
  }, [id, inputState, onInputChange]);

  const textChangeHandler = (text: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let isValid = true;
    if (props.required && text.trim().length === 0) {
      isValid = false;
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (props.min != null && +text < props.min) {
      isValid = false;
    }
    if (props.max != null && +text > props.max) {
      isValid = false;
    }
    if (props.minLength != null && text.length < props.minLength) {
      isValid = false;
    }

    dispatch({ type: INPUT_CHANGE, value: text, isValid });
  };

  const lostFocusHandler = () => {
    dispatch({ type: INPUT_BLUR });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={textChangeHandler}
        onBlur={lostFocusHandler}
        {...props}
      />
      {!inputState.isValid && touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: 'open-sans',
    color: 'red',
    fontSize: 13,
  },
});
