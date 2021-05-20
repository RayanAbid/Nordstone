import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Keyboard,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  KeyboardAvoidingView,
} from 'react-native';

import {Button, TextInput} from 'react-native-paper';
import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function HomeScreen(props) {
  const [entityText, setEntityText] = useState('');
  const [entities, setEntities] = useState([]);
  const [run, setRun] = useState(false);

  const [userData, setUserData] = useState(null);

  const entityRef = firestore().collection('text');
  const userID = auth().currentUser.uid;

  // const getText = async () => {
  //   await firestore()
  //     .collection('text')
  //     .where('userID', '==', userID)
  //     .orderBy('createdAt', 'desc')
  //     .onSnapshot(
  //       querySnapshot => {
  //         console.log('querySnapshot', querySnapshot);
  //         const newEntities = [];

  //         querySnapshot.forEach(doc => {
  //           console.log('test', doc.data());
  //           const entity = doc.data();
  //           entity.id = doc.id;
  //           newEntities.push(entity);
  //         });
  //         console.log('text', newEntities);
  //         setEntities(newEntities);
  //         setRun(false);
  //       },
  //       error => {
  //         console.log(error);
  //       },
  //     );
  // };

  const getUser = () => {
    firestore()
      .collection('user')
      .where('uid', '==', auth().currentUser.uid)
      .onSnapshot(
        querySnapshot => {
          const newEntities = [];
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
            setUserData(newEntities);
          });
          console.log('success', userData);
        },
        error => {
          console.log(error);
        },
      );
  };

  useEffect(() => {
    // getUser();
    return firestore()
      .collection('text')
      .where('userID', '==', userID)
      .orderBy('createdAt', 'asc')
      .onSnapshot(
        querySnapshot => {
          const newEntities = [];
          querySnapshot.forEach(doc => {
            const entity = doc.data();
            entity.id = doc.id;
            newEntities.push(entity);
          });
          setEntities(newEntities);
          console.log('testingd suk', newEntities);
        },
        error => {
          console.log(error);
        },
      );
  }, []);

  const onAddButtonPress = async () => {
    if (entityText && entityText.length > 0) {
      const timestamp = firestore.FieldValue.serverTimestamp();
      const data = {
        text: entityText,
        userID: userID,
        createdAt: timestamp,
      };
      await firestore()
        .collection('text')
        .add(data)
        .then(_doc => {
          setEntityText('');
          setRun(true);
          Keyboard.dismiss();
        })
        .catch(error => {
          alert(error);
        });
    }
  };

  const onDeleteButton = async delId => {
    firestore()
      .collection('text')
      .doc(delId)
      .delete()
      .then(() => {
        console.log('User Updated!');
        Alert.alert(
          'Profile Updated!',
          'Your profile has been updated successfully.',
        );
      });
  };

  const renderEntity = ({item, index}) => {
    return (
      <>
        <View style={styles.textContainer}>
          <Text style={styles.entityText}>
            {index + 1}. {item.text}
          </Text>
          <Button onPress={() => onDeleteButton(item.id)}>x</Button>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          mode="outlined"
          placeholder="Enter new Text "
          // placeholderTextColor="#aaaaaa"
          onChangeText={text => setEntityText(text)}
          value={entityText}
          // underlineColorAndroid="transparent"
          // autoCapitalize="none"
        />
        <Button
          mode="contained"
          style={styles.button}
          onPress={onAddButtonPress}>
          Add
        </Button>
      </View>
      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={item => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  formContainer: {
    flexDirection: 'row',
    height: '10%',
    paddingVertical: 15,
  },
  input: {
    width: '50%',
    marginRight: 10,
  },
  button: {
    height: 60,
    marginVertical: 5,
    borderRadius: 5,
    width: 80,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  listContainer: {
    marginHorizontal: 50,
    paddingVertical: 50,
    width: '90%',
  },
  textContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 50,
    width: '100%',
    flex: 1,
    flexDirection: 'row',
  },
  entityText: {
    fontSize: 20,
    color: 'black',
    width: '80%',
  },
});
