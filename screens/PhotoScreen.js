import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageCropPicker from 'react-native-image-crop-picker';

import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import {
  InputField,
  InputWrapper,
  AddImage,
  SubmitBtn,
  SubmitBtnText,
  StatusWrapper,
} from '../assets/PhotoScreenStyles';
import {Button} from 'react-native-paper';

const AddPostScreen = () => {
  const {user, logout} = auth().currentUser;

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // getUser();

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
            setImage(newEntities[0].uri);
          });
          console.log('success', userData);
        },
        error => {
          console.log(error);
        },
      );

    console.log('testing the auth ', auth().currentUser);
  }, []);

  const takePhotoFromCamera = () => {
    ImageCropPicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      setDisable(false);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImageCropPicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
    }).then(image => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      setDisable(false);
    });
  };

  const submitPost = async () => {
    let imgUrl = await uploadImage();

    if (imgUrl == null && userData[0].imgUrl) {
      imgUrl = userData[0].uri;
    }

    firestore()
      .collection('user')
      .doc(userData[0].id)
      .update({
        email: userData[0].email,
        name: userData[0].name,
        uid: userData[0].uid,
        uri: imgUrl,
      })
      .then(() => {
        console.log('User Updated!');
        Alert.alert('Image Updated!', 'Image has been updated successfully.');
        setDisable(true);
      });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View style={styles.container}>
        <InputWrapper>
          {image != null ? <AddImage source={{uri: image}} /> : null}

          {uploading ? (
            <StatusWrapper>
              <Text>{transferred} % Completed!</Text>
              <ActivityIndicator size="large" color="black" />
            </StatusWrapper>
          ) : (
            <Button disabled={disable} mode="contained" onPress={submitPost}>
              Post
            </Button>
          )}
        </InputWrapper>
      </View>
      {/* Rest of the app comes ABOVE the action button component !*/}
      <ActionButton buttonColor="black">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 100,
    paddingHorizontal: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});
