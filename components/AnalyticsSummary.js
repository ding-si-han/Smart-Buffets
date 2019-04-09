import ChartView from 'react-native-highcharts';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
// import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
// import { Card } from 'react-native-paper';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      widthProgress: 0.5,
      percentageWidth: '50%',
      dataSource: 0.5,
      testNumber: 0.13,
    }
    this.hopefullyWorks = 0.16
  }

  returnData = () => {
    returnValue = Math.floor(Math.random()*100)
    // console.log(returnValue)
    // console.log(this.state.testNumber)
    return returnValue
  }

  componentDidMount(){
    this.timer = setInterval(()=> this.returnData(), 1000)
  }
  // componentDidMount() {
  //   this.timer = setInterval(() => this.getWidth(), 2000)
  //   this.timer = setInterval(() => this.getDataSource(), 2000)
  // }

  // getDataSource() {
  //   console.log("This is the newest Datasource" + this.state.dataSource)
  // }

  // async getWidth() {
  //   console.log("The DataSource is: " + this.state.dataSource)
  //   fetch('https://jsonblob.com/api/jsonBlob/06efa233-2c7e-11e9-bf40-5be10d5acd31', { method: "GET" })
  //     .then((response) => response.json())
  //     .then((responseJson) => {
  //       this.setState({
  //         isLoading: false,
  //         dataSource: responseJson.width[0][1],
  //       }, function () {
  //         console.log(this.state.dataSource)
  //       });

  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  render() {
    console.log("TEST-----")
    // console.log(this.state.testNumber)
    var nestedThis = this
    console.log(nestedThis.state.testNumber)

    renderNumber = () => {
      return Math.random()
    }
    var Highcharts = 'Highcharts';
    var conf = {
      chart: {
        type: 'areaspline',
        style: {
          fontFamily: 'monospace',
          // color: "#f00"
        },
        backgroundColor: 'null',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
          load: function () {
            console.log("LEGIT---")
            console.log("12345")
            

            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              console.log("Hello World!!!");
              var x = (new Date()).getTime(), // current time
                y = this.state.testNumber
              series.addPoint([x, y], true, true);
            }.bind(this), 1000);
          }
        }
      },
      title: {
        text: 'Bolognese',
        style: {
          color: '#FF00FF',
          fontWeight: 'bold'
        },
      },
      xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
      },
      yAxis: {
        title: {
          text: 'Value'
        },
        plotLines: [{
          value: 0,
          width: 1,
          color: '#808080'
        }]
      },
      tooltip: {
        formatter: function () {
          return '<b>' + this.series.name + '</b><br/>' +
            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
            Highcharts.numberFormat(this.y, 2);
        }
      },
      legend: {
        enabled: false
      },
      exporting: {
        enabled: false
      },
      series: [{
        name: 'Random data',
        data: (function () {
          // generate an array of random data
          var data = [],
            time = (new Date()).getTime(),
            i;

          for (i = -19; i <= 0; i += 1) {
            data.push({
              x: time + i * 1000,
              y: Math.random(),
            });
          }
          return data;
        }())
      }]
    };

    const options = {
      global: {
        useUTC: false
      },
      lang: {
        decimalPoint: ',',
        thousandsSep: '.'
      },
      credits: false
    };

    return (
      <View style={{ backgroundColor: 'black', height: '100%', width: '100%' }}>
        <ChartView style={{ height: 300 }} config={conf} options={options} originWhitelist={['']}></ChartView>
      </View>
    );
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
// import React, { Component } from 'react';
// import { View, Text,StyleSheet, TouchableOpacity, Image } from 'react-native';
// import Sidemenu from './Sidemenu'

// export default class Analytics extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {

//     };
//   }

//   render() {
//     return (
//       <View style={styles.container}>
//           <Sidemenu history={this.props.history} page={'Analytics'} /> 

//           <View style={styles.bodyContainer}>
//             <View>
//               <Text style={styles.headerText}>Analytics Summary</Text> 
//               <View style={{flexDirection: 'row'}}>
//                 <View style={{flexDirection: 'column', alignItems: 'center', width: '50%', height: '95%'}}>
//                   <Text style={styles.textStyles}>Appetizer</Text>
//                   <Image resizeMode='contain' source={require('../assets/Analytics/analytics.png')} style={styles.imageStyles} />
//                 </View>
//                 <View style={{flexDirection: 'column', alignItems: 'center', width: '50%', height: '95%'}}>
//                   <Text style={styles.textStyles}>Soups</Text>
//                   <Image resizeMode='contain' source={require('../assets/Analytics/analytics.png')} style={styles.imageStyles} />
//                 </View>
//               </View>
//               <View style={{flexDirection: 'row'}}>
//                 <View style={{flexDirection: 'column', alignItems: 'center', width: '50%', height: '95%'}}>
//                   <Text style={styles.textStyles}>Main Course</Text>
//                   <Image resizeMode='contain' source={require('../assets/Analytics/analytics.png')} style={styles.imageStyles} />
//                 </View>
//                 <View style={{flexDirection: 'column', alignItems: 'center', width: '50%', height: '95%'}}>
//                   <Text style={styles.textStyles}>Dessert</Text>
//                   <Image resizeMode='contain' source={require('../assets/Analytics/analytics.png')} style={styles.imageStyles} />
//                 </View>
//               </View>

              
//             </View>


//             <View style={{flexDirection: 'row', height: '9%'}}>
//               <TouchableOpacity style={styles.activeTabContainer}
//               onPress={() => this.props.history.push('/analytics/summary')}>
//                 <Text style={styles.tabText}>SUMMARY</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.inactiveTabContainer}
//               onPress={() => this.props.history.push('/analytics/graph')}>
//                 <Text style={styles.tabText}>INDIVIDUAL</Text>
//               </TouchableOpacity>
//             </View>
            
//           </View>            
//       </View>

//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//     backgroundColor: '#fff',
//     justifyContent: 'flex-start',
//     backgroundColor: '#0C2336',
//     width: '100%',
//     height: '100%',
//   },
//   bodyContainer: {
//     flex: 1,
//     justifyContent: 'space-between',
//   },
//   headerText: {
//     paddingTop: '4%',
//     paddingBottom: '9%',
//     color: 'white',
//     fontSize: 70,
//     textAlign: 'center',
//     fontWeight: '200',
//   },
//   activeTabContainer: {
//     width: '50%',
//     justifyContent: 'center',
//     alignItems: 'center',  
//     backgroundColor: 'rgba(255,186,51,0.7)'  
//   },
//   inactiveTabContainer: {
//     width: '50%',
//     justifyContent: 'center',
//     alignItems: 'center',   
//     backgroundColor: 'rgba(255,186,51,0.35)'  
//   },
//   tabText: {
//     color: 'white',
//     fontSize: 30,
//     fontWeight: '500',
//   },
//   textStyles: {
//     color: 'white',
//     fontSize: 36,
//     fontWeight: '200',
//   },
//   imageStyles: {
//     width: '80%',

//   }
// });
