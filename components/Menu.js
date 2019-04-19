import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ImageBackground, ScrollView } from 'react-native';
import Sidemenu from './Sidemenu';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [
        {
          id: 1,
          title: 'Appetizer',
          pngName: require('../assets/Menu/Categories/Appetizer.png'),
          pushUrl: '/menu/appetizer',
        },
        {
          id: 2,
          title: 'Soups',
          pngName: require('../assets/Menu/Categories/Soups.png'),
          pushUrl: '/menu/soups',
        },
        {
          id: 3,
          title: 'Main Course',
          pngName: require('../assets/Menu/Categories/MainCourse.png'),
          pushUrl: '/menu/maincourse',
        },
        {
          id: 4,
          title: 'Dessert',
          pngName: require('../assets/Menu/Categories/Dessert.png'),
          pushUrl: '/menu/dessert',
        },
      ]

    };
  }

  renderCategories = (info) => {
    let currentItem = info.item
    return (
      <View style={{height: 200}}>
      <TouchableOpacity onPress={() => this.props.history.push(currentItem.pushUrl)}>
        <ImageBackground
          style={styles.imageBackgroundFood}
          source={currentItem.pngName}
        >
          <Text style={styles.categoryText}>{currentItem.title}</Text>
        </ImageBackground>
      </TouchableOpacity>
      </View>
    )

  }

  render() {
    return (
      <View style={styles.container}>
        <Sidemenu history={this.props.history} page={'Menu'} />
        <ScrollView>
        <View style={styles.bodyContainer}>
          <Text style={styles.headerText}>Menu</Text>
          <View style={{justifyContent: 'flex-start'}}>
            <FlatList
              renderItem={this.renderCategories}
              data={this.state.categories}
              keyExtractor={(item) => item.id.toString()}
            />
          </View>
        </View>
        </ScrollView>
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
    paddingBottom: '4%',
    color: 'white',
    fontSize: 70,
    textAlign: 'center',
    fontWeight: '200',
  },
  imageBackgroundFood: {
    width: '100%',
    height: '100%',
  },
  categoryText: {
    fontSize: 60,
    paddingLeft: '6%',
    paddingTop: '8%',
    fontWeight: '200'
  },

});
