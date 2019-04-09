import ChartView from 'react-native-highcharts';
import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      widthProgress: 0.5,
      percentageWidth: '50%',
      dataSource: 0.5
    }
    // this.animateWidth = this.animateWidth.bind(this)
  }
  // componentDidMount() {
  //   this.timer = setInterval(() => this.getWidth(), 2000)
  // }

  // async getWidth() {
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

            // set up the updating of the chart each second
            var series = this.series[0];
            setInterval(function () {
              var x = (new Date()).getTime(), // current time
                y = this.state.dataSource;
              series.addPoint([x, y], true, true);
            }, 1000);
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
              y: Math.random()
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
        <ChartView style={{ height: 300 }} config={conf} options={options}></ChartView>
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