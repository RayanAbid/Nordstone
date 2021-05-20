import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  TextInput,
} from 'react-native-paper';

import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import {url} from '../utils/URL';

const CalculatorScreen = () => {
  // console.log("hjh", auth().currentUser.uid);

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [result, setResult] = useState('');

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Add', value: 'add'},
    {label: 'Subtract', value: 'subtract'},
    {label: 'Multiply', value: 'multuplication'},
    {label: 'Divide', value: 'divide'},
  ]);

  const Calculate = async () => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      num1,
      num2,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(url + value, requestOptions)
      .then(response => response.text())
      .then(result => setResult(result))
      .catch(error => console.log('error', error));
  };

  http: return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={{flex: 1}} behavior="padding">
          <Text style={styles.titleText}>Calculator screen</Text>
          <View style={styles.container}>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={25}
              maximumValue={125}
              step={0.1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={value => setNum1(value)}
            />
            {/* <Slider value={num1} onValueChange={value => setNum1({value})} /> */}
            <Text>Value: {num1.toFixed(2)}</Text>
            {/* <TextInput
              label="Eneter Number"
              mode="outlined"
              value={num1}
              keyboardType="numeric"
              onChangeText={text => setNum1(text)}
              style={styles.textInput}
            /> */}

            {/* <TextInput
              label="Eneter Number"
              mode="outlined"
              keyboardType="numeric"
              value={num2}
              onChangeText={text => setNum2(text)}
              style={styles.textInput}
            /> */}
          </View>
          <View style={styles.container}>
            <Slider
              style={{width: 200, height: 40}}
              minimumValue={25}
              maximumValue={125}
              step={0.1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="#000000"
              onValueChange={value => setNum2(value)}
            />

            <Text>Value: {num2.toFixed(2)}</Text>

            {/* <TextInput
              label="Eneter Number"
              mode="outlined"
              keyboardType="numeric"
              value={num2}
              onChangeText={text => setNum2(text)}
              style={styles.textInput}
            /> */}
          </View>

          <View style={styles.dropdownView}>
            <DropDownPicker
              placeholder="Select Operation"
              open={open}
              value={value}
              items={items}
              setValue={setValue}
              setItems={setItems}
              setOpen={setOpen}
            />
          </View>
          <View style={{width: '100%', flex: 1, marginVertical: 30}}>
            <Text style={{textAlign: 'center', fontSize: 21}}>{result}</Text>
          </View>
          <View style={styles.submitView}>
            <Button
              mode="contained"
              onPress={() => {
                Calculate();
              }}>
              Submit
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: '10%',
  },
  dropdownView: {
    // paddingVertical: 50,
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  submitView: {
    paddingVertical: '50%',
    // paddingTop: '60%',
    paddingHorizontal: 20,
  },
  textInput: {
    width: '50%',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  titleText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default CalculatorScreen;
