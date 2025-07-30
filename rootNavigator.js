import React, {lazy, Suspense} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const MainScreen = lazy(() => import('./app/MainScreen/MainScreen'));
const Testing1 = lazy(() => import('./app/testing/test'));
const LoginPage = lazy(() => import('./app/login/login'));
const FirstPage = lazy(() => import('./app/MainScreen/FirstScreen'));
import ErrorBoundary from './app/commonComponent/errorBoundaries/errorBoundaries';
import {Text} from 'react-native';

const Stack = createNativeStackNavigator();

export default rootNavigator = () => {
  const renderLoginNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="FirstPage"
        screenOptions={{headerShown: false, navigationBarHidden: true}}>
        <Stack.Screen
          name="FirstPage"
          options={{
            headerShown: false,
            navigationBarHidden: true,
          }}>
          {props => (
            <React.Suspense fallback={<Text>...Loading</Text>}>
              <FirstPage {...props} />
            </React.Suspense>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="LoginPage"
          options={{
            headerShown: false,
            navigationBarHidden: true,
          }}>
          {props => (
            <React.Suspense fallback={<Text>...Loading</Text>}>
              <LoginPage {...props} />
            </React.Suspense>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Testing1"
          options={{
            headerShown: false,
            navigationBarHidden: true,
          }}>
          {props => (
            <React.Suspense fallback={<Text>...Loading</Text>}>
              <Testing1 {...props} />
            </React.Suspense>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="MainScreen"
          options={{
            headerShown: false,
            navigationBarHidden: true,
            title: 'testing',
          }}>
          {props => (
            <React.Suspense fallback={<Text>...Loading</Text>}>
              <MainScreen {...props} />
            </React.Suspense>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  };
  return (
    <ErrorBoundary>
      <NavigationContainer>{renderLoginNavigator()}</NavigationContainer>
    </ErrorBoundary>
  );
};
