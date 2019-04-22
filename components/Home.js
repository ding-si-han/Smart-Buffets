import React, { Component } from 'react';
import { View, Text, StyleSheet, Animated, AsyncStorage, Image, Button, FlatList } from 'react-native';
import Sidemenu from './Sidemenu'
import {
  SCLAlert,
  SCLAlertButton
} from 'react-native-scl-alert'
import FadeInView from 'react-native-fade-in-view'
import Expo from 'expo'



export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthProgressBolog: new Animated.Value(1.21),
      widthProgressBlueb: new Animated.Value(1.20),
      widthProgressMushr: new Animated.Value(1.11),
      widthProgressMexic: new Animated.Value(1.21),
      percentageWidthBolog: '100%',
      percentageWidthBlueb: '100%',
      percentageWidthMushr: '100%',
      percentageWidthMexic: '100%',
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

  animateWidth = (widthValue, name) => {
    speedRate = {
      "Bolog": 1,
      "Blueb": 4,
      "Mushr": 8,
      "Mexic": 18,
    }

    timeTaken = Math.floor(Math.random() * speedRate[name] *3000) + 15000
    // console.log(timeTaken)
    Animated.timing(
      this.state['widthProgress' + name],
      {
        toValue: widthValue,
        duration: timeTaken,
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
    this.widthGet = setInterval(() => this.getWidth(), 5000)
    // this.getWidth()
    this.widthCheck = setInterval(() => this.checkWidthProgress(), 5000)
    this._retrieveData()
    this._mounted = true
  }

  componentWillUnmount() {
    clearInterval(this.widthCheck)
    clearInterval(this.widthGet)
    this.storeData()
    this._mounted = false
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('cookingItems', JSON.stringify(this.state.cookingItems))
    } catch (e) {
      // saving error
    }
    try {
      await AsyncStorage.setItem('upcomingItems', JSON.stringify(this.state.upcomingItems))
    } catch (e) {
      // saving error
    }
    try {
      await AsyncStorage.setItem('percentageWidthBolog', JSON.stringify(this.state.percentageWidthBolog))
    } catch (e) {
      // saving error
    }
    try {
      await AsyncStorage.setItem('percentageWidthMushr', JSON.stringify(this.state.percentageWidthMushr))
    } catch (e) {
      // saving error
    }
    try {
      await AsyncStorage.setItem('percentageWidthBlueb', JSON.stringify(this.state.percentageWidthBlueb))
    } catch (e) {
      // saving error
    }
    try {
      await AsyncStorage.setItem('percentageWidthMexic', JSON.stringify(this.state.percentageWidthMexic))
    } catch (e) {
      // saving error
    }
  }

  clearAsyncStorage = async() => {
    AsyncStorage.clear();
    console.log("CLEARED")
    Expo.Util.reload()
  }

  _retrieveData = async () => {
    try {
      const upcomingItems = await AsyncStorage.getItem('upcomingItems');
      if (upcomingItems !== null) {
        this.setState({upcomingItems: JSON.parse(upcomingItems)})
        console.log("upcomingItems")
        console.log(JSON.parse(upcomingItems))
      }
    } catch (error) {
    }
    try {
      const cookingItems = await AsyncStorage.getItem('cookingItems');
      if (cookingItems !== null) {
        this.setState({cookingItems: JSON.parse(cookingItems)})
        console.log("cookingItems")
        console.log(JSON.parse(cookingItems))
      }
    } catch (error) {
    }
    try {
      const valueBolog = await AsyncStorage.getItem('percentageWidthBolog');
      if (valueBolog !== null) {
        this.setState({percentageWidthBolog: JSON.parse(valueBolog)})
        console.log("BOLOG_RETRIEVE")
        console.log(parseFloat(valueBolog.split("%")[0].split("\"")[1])/100)
        newValueToSetAnimationBolog = parseFloat(valueBolog.split("%")[0].split("\"")[1])/100
        newValueToSetAnimationBolog = (newValueToSetAnimationBolog - 0.07)/63*100
        this.setState({widthProgressBolog: new Animated.Value(newValueToSetAnimationBolog)})
      }
    } catch (error) {
    }
    try {
      const valueMexic = await AsyncStorage.getItem('percentageWidthMexic');
      if (valueMexic !== null) {
        this.setState({percentageWidthMexic: JSON.parse(valueMexic)})
        console.log("Mexic_RETRIEVE")
        console.log(parseFloat(valueMexic.split("%")[0].split("\"")[1])/100)
        newValueToSetAnimationMexic = parseFloat(valueMexic.split("%")[0].split("\"")[1])/100
        newValueToSetAnimationMexic = (newValueToSetAnimationMexic - 0.07)/63*100
        this.setState({widthProgressMexic: new Animated.Value(newValueToSetAnimationMexic)})
      }
    } catch (error) {
    }
    try {
      const valueBlueb = await AsyncStorage.getItem('percentageWidthBlueb');
      if (valueBlueb !== null) {
        this.setState({percentageWidthBlueb: JSON.parse(valueBlueb)})
        // console.log("BLUEB_RETRIEVE")
        // console.log(parseFloat(valueBlueb.split("%")[0].split("\"")[1])/100)
        newValueToSetAnimationBlueb = parseFloat(valueBlueb.split("%")[0].split("\"")[1])/100
        newValueToSetAnimationBlueb = (newValueToSetAnimationBlueb - 0.07)/63*100
        this.setState({widthProgressBlueb: new Animated.Value(newValueToSetAnimationBlueb)})
      }
    } catch (error) {
    }
    try {
      const valueMushr = await AsyncStorage.getItem('percentageWidthMushr');
      if (valueMushr !== null) {
        this.setState({percentageWidthMushr: JSON.parse(valueMushr)})
        // console.log("BLUEB_RETRIEVE")
        // console.log(parseFloat(valueBlueb.split("%")[0].split("\"")[1])/100)
        newValueToSetAnimationMushr = parseFloat(valueMushr.split("%")[0].split("\"")[1])/100
        newValueToSetAnimationMushr = (newValueToSetAnimationMushr - 0.07)/63*100
        this.setState({widthProgressMushr: new Animated.Value(newValueToSetAnimationMushr)})
      }
    } catch (error) {
    }
  }

  async checkWidthProgress() {
    // console.log("CHECKING BOLOG")
    // console.log(this.state.percentageWidthBolog)
    
    upcomingItemsArrayList = [...this.state.upcomingItems]
    upcomingItemsArrayList.forEach((item) => {
      if (this._mounted) {
        // console.log(item)
        widthAnimatedValue = JSON.stringify(this.state['percentageWidth' + item.substring(0, 5)])
        widthFloatAnimatedValue = parseFloat(widthAnimatedValue.split("%")[0].split("\"")[1])/100
        // console.log(widthFloatAnimatedValue)
        inputVar = this.state[item.substring(0, 5)]
        itemToShow = "show" + item.substring(0,5)
        if (widthFloatAnimatedValue <= 0.08) {
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
        countVar = 0
        cookingTimings = [0.21,0.20,0.11,0.21]
        for (var index in responseJson) {
          // console.log(index)
          // console.log(responseJson[index])
          this.animateWidth(responseJson[index][0][1] -cookingTimings[countVar], index)
          this.setState({[index]: responseJson[index][0][1] -cookingTimings[countVar]})
          countVar += 1
        }
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
      <FadeInView duration={4000} style={{width: '69%'}}>
      <View style={styles.bodyContainer}>
        <Text style={styles.headerText}>Dashboard</Text>
        <Button onPress={this.clearAsyncStorage} title="Reset Dashboard">
        </Button>

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
      </FadeInView>
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
    marginRight: 33,
    marginTop: 10,
    position: 'absolute',
    right: 0,
    paddingHorizontal: 4,
    backgroundColor: 'rgba(255,204,0,0.4)',
    borderRadius: 10
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
