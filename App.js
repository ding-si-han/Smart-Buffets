import React from 'react';
import { StyleSheet, Text, View, Button, Navigator } from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import Home from './components/Home';
import Menu from './components/Menu';

import Analytics from './components/Analytics';

export default class App extends React.Component {
  constructor() {
    super()
  }


  componentDidMount(){
    Expo.ScreenOrientation.allowAsync("LANDSCAPE");
  }

  
  
  render() {
    return (
      <NativeRouter>
        <View style={styles.container} >
          <Switch>
            <Route exact path="/" component={Home} ></Route>
            <Route exact path="/menu" component={Menu} ></Route>
            <Route exact path="/analytics" component={Analytics} ></Route>
          </Switch>
        </View>
      </NativeRouter>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
