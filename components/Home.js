import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Button, Image } from 'react-native';
import Sidemenu from './Sidemenu'
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthProgress: new Animated.Value(0.5),
      percentageWidth: '45%',
      dataSource: 0.5,
      count: 0,
      show: false
    }
    this.animateWidth = this.animateWidth.bind(this)
    this.checkWidthProgress = this.checkWidthProgress.bind(this)
  }
  handleOpen = () => {
    this.setState({ show: true })
  }

  handleClose = () => {
    this.setState({ show: false })
  }

  sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms))
  }



  animateWidth = (widthValue) => {
    Animated.timing(
      this.state.widthProgress,
      {
        toValue: widthValue,
        duration: 15000,
      }
    ).start();

    const progressInterpolate = this.state.widthProgress.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
      extrapolate: "clamp",
    })
    this.setState({ percentageWidth: progressInterpolate })
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getWidth(), 5000)
    // this.timer = setInterval(() => this.checkWidthProgress(), 2000)
  }

  async checkWidthProgress() {
    let placeThis = this
    console.log(this.state.dataSource)
    inputVar = this.state.dataSource
    if (inputVar <= 0.15) {
      console.log("sleeping")
      setTimeout(function(){
        console.log("show alert")
        console.log(placeThis.state.dataSource)
        placeThis.setState({show:true})
      }, 5000)

    console.log("Checked!")
    }
  }

  async getWidth() {
    fetch('https://jsonblob.com/api/jsonBlob/06efa233-2c7e-11e9-bf40-5be10d5acd31', { method: "GET" })
      // fetch('http://192.168.0.103:5005/predict', {method: "GET"})
      .then((response) => response.json())
      .then((responseJson) => {
        this.animateWidth(responseJson.width[0][1])
        // this.animateWidth(responseJson.Weight[this.state.count] / 10)
        this.setState({
          isLoading: false,
          // dataSource: responseJson.Weight[this.state.count] / 10,
          // count: this.state.count + 1
          dataSource: responseJson.width[0][1],
        }, function () {
          // console.log(this.state.dataSource)
          
        });

      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Sidemenu history={this.props.history} page={'Home'} />

        <View style={styles.bodyContainer}>

          <Text style={styles.headerText}>Dashboard</Text>
          <Text style={styles.subheaderText}>COOKING </Text>

          <View style={styles.progressBarView}>
            <View style={styles.cookedProgressBar}>
              <Text style={styles.doneProgressText}>Beef Stew </Text>
            </View>
          </View>

          <Text style={styles.subheaderText}>UPCOMING DISHES</Text>
          <View style={styles.progressBarView}>
            <View style={styles.upcomingProgressBar}>
              <Animated.View style={[styles.yellowBar, styles.firstBar, {borderRadius: "800%", width: this.state.percentageWidth }]}>
              </Animated.View>
              <Text style={styles.progressText}>Bolognese </Text>
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

          <View style={styles.container}>
          {/* <Button title="Show" onPress={this.handleOpen} /> */}
          {/* <Image style={styles.logo} source={require('./assets/snack-icon.png')} /> */}
          <SCLAlert
            theme="inverse"
            headerIconComponent= {<Image style={{borderRadius: "200%", width: "100%", height: "100%"}} source={require('../assets/Notification/bolognese.jpeg')} />}
            show={this.state.show}
            subtitle="Prepare Bolognese"
            onRequestClose = {this.handleClose}
          >
            {/* <Image style={styles.logo} source={require('../assets/Menu/MainCourse/Bolognese.png')} /> */}
            <SCLAlertButton theme="success" onPress={this.handleClose}>Started Cooking!</SCLAlertButton>
          </SCLAlert>
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
    justifyContent: 'center'
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
    backgroundColor: 'rgba(255,255,255,0.96)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  doneProgressText: {
    fontSize: 28,
    color: 'white',
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
    // borderRadius: 100,
    // borderRadius: "300%",
    backgroundColor: 'rgba(255,204,0,0.9)',
  },
  firstBar: {
    // width: this.state.bolognese, 
    width: '15%',
  },
  secondBar: {
    width: '47%',
  },
  thirdBar: {
    width: '54%',
  },
});
