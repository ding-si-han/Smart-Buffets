  import React, { Component } from 'react';
  import { View, Text,StyleSheet } from 'react-native';
  import Sidemenu from './Sidemenu'
  
  export default class Analytics extends Component {
    constructor(props) {
      super(props);
      this.state = {

      };
    }
  
    render() {
      return (
        <View style={styles.container}>
            <Sidemenu history={this.props.history} /> 
            <Text>Analytics</Text>              
        </View>

      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: '#0C2336',
    },
  });
  