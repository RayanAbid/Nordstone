import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import GlobalStyles from '../assets/styles';
import {TextInput, Button} from 'react-native-paper';
import auth from '@react-native-firebase/auth';

import Entypo from 'react-native-vector-icons/Entypo';

export default function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const userLogin = async () => {
    if (!email || !password) Alert.alert('Please fill all fields');
    else {
      auth()
        .signInWithEmailAndPassword(email.trim(), password)
        .then(() => {
          console.log('User account created & signed in!');
          Alert.alert('User Logged in ');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            console.log('That email address does not exist!');
            Alert.alert('That email address does not exist! ');
          }
          if (error.code === 'auth/wrong-password') {
            console.log('Password Wrong');
            Alert.alert('Password Wrong! ');
          }
          console.error(error);
        });
    }
  };

  return (
    <KeyboardAvoidingView behavior="position">
      <View style={styles.View1}>
        <Image
          style={GlobalStyles.imageRegis}
          source={{
            uri:
              'https://media-exp1.licdn.com/dms/image/C4D0BAQHGSg1Bni4TYw/company-logo_200_200/0/1616853744387?e=1628121600&v=beta&t=gJZuTlR632KX40I91PRrOyH6CeNdSrQBBYhCeDNUgc8',
          }}
        />
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.text, GlobalStyles.textColSpecial]}>Login </Text>
        </View>
      </View>
      <View style={styles.View2}>
        <TextInput
          mode="outlined"
          value={email}
          onChangeText={text => setEmail(text)}
          right={
            <TextInput.Icon name={() => <Entypo name={'mail'} size={20} />} />
          }
          style={styles.input}
          label={'Email'}
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          secureTextEntry={true}
          onChangeText={text => setPassword(text)}
          right={
            <TextInput.Icon name={() => <Entypo name={'key'} size={20} />} />
          }
        />

        <Button mode="contained" onPress={() => userLogin()}>
          Login
        </Button>

        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'center'}}
          onPress={() => navigation.navigate('SignUP')}>
          <Text>Don't have an account.</Text>
          <Text style={GlobalStyles.textColSpecial}> Sign Up ?</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ForgetPass')}>
          <Text style={[{textAlign: 'center'}, GlobalStyles.textColSpecial]}>
            Forgot your Password ?
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  View1: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  View2: {
    paddingHorizontal: 40,
    justifyContent: 'space-evenly',
    height: '50%',
  },
  text: {
    fontSize: 22,
    paddingTop: 40,
  },
});
