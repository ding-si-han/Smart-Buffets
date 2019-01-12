import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import Sidemenu from './Sidemenu'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    return (
      <View style={styles.container}>
          <Sidemenu history={this.props.history} page={'Home'} /> 

          <View style={styles.bodyContainer}>
            <Text style={styles.headerText}>Dashboard</Text>  
            <Text style={styles.subheaderText}>COOKING</Text>  
            
            <View style={styles.progressBarView}>
              <View style={styles.cookedProgressBar}>
                <Text style={styles.doneProgressText}>Hello World</Text>
              </View>            
            </View>

            <Text style={styles.subheaderText}>UPCOMING DISHES</Text>  
            <View style={styles.progressBarView}>
              <View style={styles.upcomingProgressBar}>
                <View style={[styles.yellowBar, styles.firstBar]}>            
                </View>
                <Text style={styles.progressText}>Bolognese</Text>
              </View>            
            </View>
            <View style={styles.progressBarView}>
              <View style={styles.upcomingProgressBar}>
                <View style={[styles.yellowBar, styles.secondBar]}>            
                </View>
                <Text style={styles.progressText}>Mushroom Soup</Text>
              </View>            
            </View>
            <View style={styles.progressBarView}>
              <View style={styles.upcomingProgressBar}>
                <View style={[styles.yellowBar, styles.thirdBar]}>            
                </View>
                <Text style={styles.progressText}>Blueberry Cheesecake</Text>
              </View>            
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
  },
  headerText: {
    paddingTop: '4%',
    paddingBottom: '1.5%',
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
    fontWeight: '200',
  },
  subheaderText: {
    paddingBottom: '0.8%',
    paddingTop: '4.5%',
    paddingLeft: '5.6%',
    color: 'white',
    fontSize: 40,
    textAlign: 'left',
    fontWeight: '500',
  },
  progressBarView: {
    height: '7%',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '8%',  
    marginBottom: '1.7%',
    // padding: '2%',
    justifyContent:'center'
  },
  cookedProgressBar: {
    marginVertical: 20,
    height: '100%',
    width: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: '#127000',
  },
  upcomingProgressBar: {
    marginVertical: 20,
    height: '100%',
    width: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.96)',
    flexDirection: 'row',
    justifyContent: 'space-between',

    
  },
  doneProgressText: {

    fontSize: 28,
    color: 'black',
    paddingLeft: 30,
  },
  progressText: {

    fontSize: 28,
    color: 'black',
    paddingRight: 33,
    paddingTop: 15,
  },
  yellowBar: {
    height: '100%', 
    borderRadius: 100,
    backgroundColor: 'rgba(255,204,0,0.9)',
  },
  firstBar: {
    width: '10%', 
  },
  secondBar: {
    width: '27%', 
  },
  thirdBar: {
    width: '34%', 
  },
});
