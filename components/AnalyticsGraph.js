
import React, { Component } from 'react';
import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native';
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
          <Sidemenu history={this.props.history} page={'Analytics'} /> 

          <View style={styles.bodyContainer}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.headerText}>Analytics Summary</Text> 
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{flexDirection: 'column', alignItems: 'center', width: 900, height: 700}}>
                  <Image resizeMode='contain' source={require('../assets/Analytics/analytics.png')} style={styles.imageStyles} />
                  <Text style={styles.textStyles}>Bolognese</Text>
                </View>

              </View>

              
            </View>


            <View style={{flexDirection: 'row', height: '9%'}}>
              <TouchableOpacity style={styles.activeTabContainer}
              onPress={() => this.props.history.push('/analytics/summary')}>
                <Text style={styles.tabText}>SUMMARY</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.inactiveTabContainer}
              onPress={() => this.props.history.push('/analytics/individual')}>
                <Text style={styles.tabText}>INDIVIDUAL</Text>
              </TouchableOpacity>
            </View>
            
          </View>            
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    backgroundColor: '#0C2336',
    width: '100%',
    height: '100%',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  headerText: {
    paddingTop: '4%',
    paddingBottom: '9%',
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
    fontWeight: '200',
  },
  activeTabContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',  
    backgroundColor: 'rgba(255,186,51,0.7)'  
  },
  inactiveTabContainer: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',   
    backgroundColor: 'rgba(255,186,51,0.35)'  
  },
  tabText: {
    color: 'white',
    fontSize: 30,
    fontWeight: '500',
  },
  textStyles: {
    color: 'white',
    fontSize: 60,
    fontWeight: '200',
    paddingBottom: 100,
  },
  imageStyles: {
    flex: 1,
    width: 700,
    height: 500,

  }
});
