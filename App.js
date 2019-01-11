import React from 'react';
import { StyleSheet, Text, View, Button, Navigator } from 'react-native';
import {NativeRouter, Switch, Route} from 'react-router-native';

import Home from './components/Home';
import Menu from './components/Menu';
import MenuAppetizer from './components/MenuAppetizer';
import MenuSoups from './components/MenuSoups';
import MenuMainCourse from './components/MenuMainCourse';
import MenuDessert from './components/MenuDessert';
import AnalyticsSummary from './components/AnalyticsSummary';
import AnalyticsIndividual from './components/AnalyticsIndividual';

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
            <Route exact path="/menu/appetizer" component={MenuAppetizer} ></Route>
            <Route exact path="/menu/soups" component={MenuSoups} ></Route>
            <Route exact path="/menu/maincourse" component={MenuMainCourse} ></Route>
            <Route exact path="/menu/dessert" component={MenuDessert} ></Route>
            <Route exact path="/analytics/summary" component={AnalyticsSummary} ></Route>
            <Route exact path="/analytics/individual" component={AnalyticsIndividual} ></Route>
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
