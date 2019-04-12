import React, { Component } from 'react';
import Sidemenu from "./Sidemenu"
import {StyleSheet, Text, View, Dimensions} from 'react-native'
import {LineChart} from 'react-native-chart-kit'

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false,
    }
    this.datesAppetizer =['10am', '12pm', '2pm', '4pm', '6pm', '8pm', '10pm']
    this.valuesAppetizer = [50,67,80,70,65,69,65,67,72,76,78,92,95, 80,70,66,53,25]
    // this.chart = new LineChart();
  }


  render() {
    return (
      <View style={styles.container}>
        <Sidemenu history={this.props.history} page={'Insights'} />
        <View>
          <Text>
            Bezier Line Chart
          </Text>
          <LineChart
            
            data={{
              labels: this.datesAppetizer,
              datasets: [{
                data: this.valuesAppetizer
              }]
            }}
            redraw
            width={330} // from react-native
            height={300}
            yAxisLabel={' '}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
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
  }
})
// import React, { Component } from 'react';
// import { AppRegistry, Alert } from 'react-native';
// import AppIntro from 'react-native-app-intro';

// export default class Example extends Component {
//   onSkipBtnHandle = (index) => {
//     Alert.alert('Skip');
//     console.log(index);
//   }
//   doneBtnHandle = () => {
//     Alert.alert('Done');
//   }
//   nextBtnHandle = (index) => {
//     Alert.alert('Next');
//     console.log(index);
//   }
//   onSlideChangeHandle = (index, total) => {
//     console.log(index, total);
//   }
//   render() {
//     const pageArray = [{
//       title: 'Page 1',
//       description: 'Description 1',
//       img: 'https://goo.gl/Bnc3XP',
//       imgStyle: {
//         height: 80 * 2.5,
//         width: 109 * 2.5,
//       },
//       backgroundColor: '#fa931d',
//       fontColor: '#fff',
//       level: 10,
//     }, {
//       title: 'Page 2',
//       description: 'Description 2',
//       img: 'https://goo.gl/Bnc3XP',
//       imgStyle: {
//         height: 93 * 2.5,
//         width: 103 * 2.5,
//       },
//       backgroundColor: '#a4b602',
//       fontColor: '#fff',
//       level: 10,
//     }];
//     return (
//       <AppIntro
//         onNextBtnClick={this.nextBtnHandle}
//         onDoneBtnClick={this.doneBtnHandle}
//         onSkipBtnClick={this.onSkipBtnHandle}
//         onSlideChange={this.onSlideChangeHandle}
//         pageArray={pageArray}
//       />
//     );
//   }
// }

// // AppRegistry.registerComponent('Example', () => Example);