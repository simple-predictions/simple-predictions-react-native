import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, Button, Text, TextInput, StyleSheet,
} from 'react-native';
import handleSubmit from './Logic/LoginPageLogic';
import { getUserInfo } from './User/userSlice';

const Login = () => {
  const [username, setUsername] = useState('solly');
  const [password, setPassword] = useState('solly');
  const [buttonEnabled, setButtonEnabled] = useState(true);
  const dispatch = useDispatch();
  const [errorCount, setErrorCount] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const styles = StyleSheet.create({
    formInput: {
      borderColor: 'gray',
      borderWidth: 1,
      marginTop: 10,
      padding: 5,
    },
  });

  return (
    <View style={{ backgroundColor: '#defc5f', flex: 1, justifyContent: 'center' }}>
      <Text style={{
        color: '#721c24', borderColor: '#f5c6cb', backgroundColor: '#f8d7da', padding: 10, margin: 10,
      }}
      >
        {`${errorMessage} - (${errorCount})`}
      </Text>
      <View style={{ padding: 60 }}>
        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-400', fontSize: 30 }}>Please log in</Text>
        <TextInput style={styles.formInput} value={username} onChangeText={(e) => setUsername(e)} />
        <TextInput style={styles.formInput} value={password} onChangeText={(e) => setPassword(e)} />
        <View style={{ backgroundColor: 'black', borderRadius: 10, marginTop: 10 }}>
          <Button
            color="#defc5f"
            title="Login"
            onPress={(e) => handleSubmit(
              e,
              buttonEnabled,
              setButtonEnabled,
              username,
              password,
              dispatch,
              getUserInfo,
              setErrorCount,
              errorCount,
              setErrorMessage,
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Login;
