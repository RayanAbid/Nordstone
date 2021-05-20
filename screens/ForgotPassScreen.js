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
import firebase from '@react-native-firebase/app';

import Entypo from 'react-native-vector-icons/Entypo';

export default function ForgotPassScreen({navigation}) {
  const [email, setEmail] = useState('');

  const forgotPassword = () => {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        Alert.alert('Please check your email...');
      })
      .catch(function (e) {
        console.log(e);
        if (e.code === 'auth/user-not-found') {
          Alert.alert('No User Available');
        }
      });
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
            Enter Email Address to Continue{' '}
          </Text>
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

        <Button mode="contained" onPress={() => forgotPassword()}>
          Send Mail
        </Button>

        <TouchableOpacity
          style={{flexDirection: 'row', justifyContent: 'center'}}
          onPress={() => navigation.navigate('SignUP')}>
          <Text>Don't have an account.</Text>
          <Text style={GlobalStyles.textColSpecial}> Sign Up ?</Text>
        </TouchableOpacity>

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
  image: {
    width: 200,
    height: 200,
  },
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
