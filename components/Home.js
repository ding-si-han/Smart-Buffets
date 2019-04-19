import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, Button, Image, FlatList } from 'react-native';
import Sidemenu from './Sidemenu'
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthProgressBolog: new Animated.Value(0.37),
      widthProgressBlueb: new Animated.Value(0.40),
      widthProgressMushr: new Animated.Value(0.45),
      widthProgressMexic: new Animated.Value(0.45),
      percentageWidthBolog: '35%',
      percentageWidthBlueb: '40%',
      percentageWidthMushr: '45%',
      percentageWidthMexic: '47%',
      cookingItems: [],
      upcomingItems: ["Bolognese", "Blueberry Cheesecake", "Mushroom Soup", "Mexican Chorizo"],
      showMexic: false,
      showBolog: false,
      showBlueb: false,
      showMushr: false
    }
    this.animateWidth = this.animateWidth.bind(this)
    this.checkWidthProgress = this.checkWidthProgress.bind(this)
  }

  handleClose = () => {
    this.setState({ showMexic: false })
    this.setState({ showBolog: false })
    this.setState({ showBlueb: false })
    this.setState({ showMushr: false })
    var upcomingItemsArray = [...this.state.upcomingItems];
    var doneItemToAdd = upcomingItemsArray.shift()
    var cookingItemsArray = [...this.state.cookingItems]
    cookingItemsArray.push(doneItemToAdd)
    this.setState({ upcomingItems: upcomingItemsArray })
    this.setState({ cookingItems: cookingItemsArray })
  }

  // sleep(ms) {
  //   return new Promise(resolve => setTimeout(resolve, ms))
  // }



  animateWidth = (widthValue, index, name) => {
    Animated.timing(
      this.state['widthProgress' + name],
      {
        toValue: widthValue,
        duration: 1500,
      }
    ).start();

    const progressInterpolate = this.state['widthProgress' + name].interpolate({
      inputRange: [0, 1],
      outputRange: ["7%", "100%"],
      extrapolate: "clamp",
    })
    this.setState({ ["percentageWidth" + name]: progressInterpolate })
  }

  componentDidMount() {
    this.timer = setInterval(() => this.getWidth(), 5000)
    this.timer = setInterval(() => this.checkWidthProgress(), 4000)
    this._mounted = true
  }

  componentWillUnmount() {
    this._mounted = false
  }

  async checkWidthProgress() {
    upcomingItemsArrayList = [...this.state.upcomingItems]
    upcomingItemsArrayList.forEach((item) => {
      inputVar = this.state[item.substring(0, 5)]
      itemToShow = "show" + item.substring(0,5)
      if (this._mounted) {
        if (inputVar <= 0) {
          console.log("alert now")
          this.state[itemToShow] = true
        } else {
          // console.log("FAILED WHY?")
        }
      }
    })
  }


async getWidth() {
  if (this._mounted) {
    fetch('https://jsonblob.com/api/jsonBlob/06efa233-2c7e-11e9-bf40-5be10d5acd31', { method: "GET" })
      // fetch('http://192.168.0.103:5005/predict', {method: "GET"})
      .then((response) => response.json())
      .then((responseJson) => {
        this.animateWidth(responseJson.width0[0][1] -0.21, "0", responseJson.width0[0][2])
        this.animateWidth(responseJson.width1[0][1] - 0.20, "1", responseJson.width1[0][2])
        this.animateWidth(responseJson.width2[0][1] -0.11, "2", responseJson.width2[0][2])
        this.animateWidth(responseJson.width3[0][1] - 0.21, "3", responseJson.width3[0][2])
        this.setState({
          isLoading: false,
          [responseJson.width0[0][2]]: responseJson.width0[0][1] -0.21,
          [responseJson.width1[0][2]]: responseJson.width1[0][1]-0.20,
          [responseJson.width2[0][2]]: responseJson.width2[0][1]-0.11,
          [responseJson.width3[0][2]]: responseJson.width3[0][1]-0.21
        }, function () {
          
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}


render() {
  let renderEachCookingItem = (info) => {
    return (
      <View style={[styles.cookedProgressBar, { height: 55 }]}>
        <Text style={styles.doneProgressText}>{info.item} </Text>
      </View>
    );
  }
  let renderEmptyFlatList = () => {
    return <Text style={{color: "#ccc", fontSize: 35, paddingTop: 15, fontWeight: '200'}}>No Upcoming Items At The Moment</Text>   
  }
  let renderEmptyCookingFlatList = () => {
    return <Text style={{color: "#bbb", fontSize: 35, paddingTop: 15, fontWeight: '200'}}>No Dishes Cooking At The Moment</Text>   
  }
  let renderEachUpcomingItem = (info, index) => {
      return (
        <View style={[styles.upcomingProgressBar, { height: 55 }]}>
          <Animated.View style={[styles.yellowBar, styles.firstBar, { borderRadius: "80%", width: this.state["percentageWidth" + info.substring(0, 5)] }]}>
          </Animated.View>
          <Text style={styles.progressText}>{info} </Text>
        </View>
      );
    }

  return (
    <View style={styles.container}>
      <Sidemenu history={this.props.history} page={'Home'} />
      <View style={styles.bodyContainer}>
        <Text style={styles.headerText}>Dashboard</Text>
        <Text style={styles.subheaderText}>COOKING </Text>
        <FlatList
          data={this.state.cookingItems}
          keyExtractor={(item,index) => index.toString()}
          renderItem={renderEachCookingItem}
          style={{ marginHorizontal: 34, marginTop: -10 }}
          ListEmptyComponent={renderEmptyCookingFlatList}
        />


        <Text style={styles.subheaderText}>UPCOMING DISHES</Text>
        <FlatList
          data={this.state.upcomingItems}
          keyExtractor={(item,index) => index.toString()}
          renderItem={({ item, index }) => renderEachUpcomingItem(item, index)}
          ListEmptyComponent={renderEmptyFlatList}
          style={{ paddingTop: 0, marginHorizontal: 34, marginTop: -10 }}
        />
        <View style={styles.container}>
          <SCLAlert
            theme="inverse"
            headerIconComponent={<Image style={{ borderRadius: 140, width: "100%", height: "100%" }} source={require('../assets/Notification/bolognese.jpeg')} />}
            show={this.state.showBolog}
            subtitle="Prepare Bolognese"
            title=''
            onRequestClose={this.handleClose}
          >
            <SCLAlertButton theme="success" onPress={this.handleClose}>Started Cooking!</SCLAlertButton>
          </SCLAlert>
        </View>
        <View style={styles.container}>
          <SCLAlert
            theme="inverse"
            headerIconComponent={<Image style={{ borderRadius: 140, width: "100%", height: "100%" }} source={require('../assets/Notification/blueb.jpeg')} />}
            show={this.state.showBlueb}
            subtitle="Prepare Blueberry Cheescake"
            onRequestClose={this.handleClose}
            title=''
          >
            <SCLAlertButton theme="success" onPress={this.handleClose}>Started Cooking!</SCLAlertButton>
          </SCLAlert>
        </View>
        <View style={styles.container}>
          <SCLAlert
            theme="inverse"
            headerIconComponent={<Image style={{ borderRadius: 140, width: "100%", height: "100%" }} source={require('../assets/Notification/mushr.jpeg')} />}
            show={this.state.showMushr}
            subtitle="Prepare Mushroom Soup"
            onRequestClose={this.handleClose}
            title=''
          >
            <SCLAlertButton theme="success" onPress={this.handleClose}>Started Cooking!</SCLAlertButton>
          </SCLAlert>
        </View>
        <View style={styles.container}>
          <SCLAlert
            theme="inverse"
            headerIconComponent={<Image style={{ borderRadius: 140, width: "100%", height: "100%" }} source={require('../assets/Notification/chori.jpeg')} />}
            show={this.state.showMexic}
            subtitle="Prepare Mexican Chorizo"
            title=''
            onRequestClose={this.handleClose}
          >
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
    paddingTop: '1.5%',
    paddingLeft: '5.6%',
    color: 'white',
    fontSize: 40,
    textAlign: 'left',
    fontWeight: '300',
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
    marginVertical: 10.5,
    height: '100%',
    width: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    backgroundColor: '#127000',
  },
  upcomingProgressBar: {
    marginVertical: 12,
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
    paddingTop: 10,
  },
  yellowBar: {
    height: '100%',
    borderRadius: 100,
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
