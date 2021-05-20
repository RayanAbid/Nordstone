import React, {useState, useEffect} from 'react';
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
import firestore from '@react-native-firebase/firestore';

import Entypo from 'react-native-vector-icons/Entypo';

export default function SignupScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const userSignup = async () => {
    if (!email || !password) Alert.alert('Please fill all fields');
    else {
      auth()
        .createUserWithEmailAndPassword(email.trim(), password)
        .then(() => {
          firestore().collection('user').add({
            uri: 'https://i.stack.imgur.com/y9DpT.jpg',
            email: email.trim(),
            name,
            uid: auth().currentUser.uid,
          });
          Alert.alert('User Signed up ');
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
            Alert.alert('That email address is already in use! ');
          }
          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
            Alert.alert('That email address is invalid! ');
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
          <Text style={[styles.text, GlobalStyles.textColSpecial]}>
            Signup{' '}
          </Text>
        </View>
      </View>
      <View style={styles.View2}>
        <TextInput
          label="Name"
          mode="outlined"
          value={name}
          onChangeText={text => setName(text)}
          right={
            <TextInput.Icon name={() => <Entypo name={'user'} size={20} />} />
          }
        />

        <TextInput
          label="Email"
          mode="outlined"
          value={email}
          onChangeText={text => setEmail(text)}
          right={
            <TextInput.Icon name={() => <Entypo name={'mail'} size={20} />} />
          }
        />

        <TextInput
          label="Password"
          mode="outlined"
          value={password}
          secureTextEntry={true}
          onChangeText={e => setPassword(e)}
          right={
            <TextInput.Icon name={() => <Entypo name={'key'} size={20} />} />
          }
        />

        <Button mode="contained" onPress={() => userSignup()}>
          Sign Up
        </Button>

        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'center'}}
          onPress={() => navigation.navigate('Login')}>
          <Text>Already have an account.</Text>
          <Text style={GlobalStyles.textColSpecial}> Login ?</Text>
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
