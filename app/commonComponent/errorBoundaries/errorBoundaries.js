import React from 'react';
import { Text, View } from 'react-native';

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
  };

// changing this code to old below
  
 /*  static getDerivedStateFromError(e) {
    console.log("getderived function ... ",e)
    RNRestart.Restart();
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
   console.log("get function ... ",error,"....",errorInfo )
  } */

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <View>
          <Text>An error occurred.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
