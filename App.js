import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, StatusBar} from 'react-native';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPassScreen from './screens/ForgotPassScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import CalculatorScreen from './screens/CalculatorScreen';
import PhotoScreen from './screens/PhotoScreen';
import TextScreen from './screens/TextScreen';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';

import {
  NavigationContainer,
  DefaultTheme as DefaultThemeNav,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Entypo from 'react-native-vector-icons/Entypo';

import RNBootSplash from 'react-native-bootsplash';

import 'react-native-gesture-handler';

import auth from '@react-native-firebase/auth';

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: '#f1c40f',
  },
};

const NavTheme = {
  ...DefaultThemeNav,
  colors: {
    ...DefaultThemeNav.colors,
    background: 'white',
  },
};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUP"
        component={SignupScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgetPass"
        component={ForgotPassScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color}) => {
          let iconName;

          if (route.name === 'Notifications') {
            iconName = 'info';
          } else if (route.name === 'Photo') {
            iconName = 'camera';
          } else if (route.name === 'Text') {
            iconName = 'text';
          } else if (route.name === 'Calculator') {
            iconName = 'calculator';
          }

          return <Entypo name={iconName} size={25} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'black',
        activeBackgroundColor: 'black',
        labelStyle: {
          fontSize: 12,
        },
        tabStyle: {
          width: '100%',
          borderRadius: 5,
        },
      }}>
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Photo" component={PhotoScreen} />
      <Tab.Screen name="Text" component={TextScreen} />
      <Tab.Screen name="Calculator" component={CalculatorScreen} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  const [user, setUser] = useState('');
  useEffect(() => {
    // setTimeout(() => {
    //   RNBootSplash.hide({fade: true});
    // }, 3000);

    RNBootSplash.hide({duration: 350});

    const unsubscribe = auth().onAuthStateChanged(userExist => {
      if (userExist) {
        setUser(userExist);
      } else {
        setUser('');
      }
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer theme={NavTheme}>
      {user ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <Navigation />
        </View>
      </PaperProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
