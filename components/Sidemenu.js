import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Button, Image } from 'react-native';

export default ({history}) => (
    <View style={styles.container} >
        <View style={styles.sidebar}>
            <Image style={styles.marriotBackground} source={require('../assets/Home/MarriotBackground.png')} />

            <TouchableOpacity style={styles.inactiveButtonContainer} onPress={()=> history.push("/")}>
                <View style={styles.homeButton}>
                    <Image style={styles.buttonIcon} source={require('../assets/Home/homeIcon.png')} />    
                </View>           
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.inactiveButtonContainer} onPress={()=> history.push("/menu")}>
                <View>
                    <Image style={styles.buttonIcon} source={require('../assets/Home/menuIcon.png')} />    
                </View>               
                <Text style={styles.buttonText}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.activeButtonContainer} onPress={()=> history.push("/analytics")}>
                <View>
                    <Image style={styles.buttonIcon} source={require('../assets/Home/analyticsIcon.png')} />    
                </View>      
                <Text style={styles.buttonText}>Analytics</Text>
            </TouchableOpacity>
        </View>



    </View>
)


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-start',
      backgroundColor: '#0C2336',
    },

    sidebar: {
        height: '100%',
        width: '31%',
        backgroundColor: 'rgba(184,35,64,0.31)',
        justifyContent: 'flex-start',
    },
    body: {
        height: "100%",
        width: 500,
        flex: 1,
    },
    marriotBackground: {
        width: '100%',
        height:'35%',
        marginBottom: '8%',

    },
    activeButtonContainer: {
        flexDirection: 'row',
        paddingLeft: '20%',
        backgroundColor: '#B82340',
        marginTop: 15,
        marginHorizontal: '6%',
        paddingLeft: 20,
        paddingVertical: 10,
        borderRadius: 40,
    },
    inactiveButtonContainer: {
        flexDirection: 'row',
        paddingLeft: '20%',
        marginTop: 15,
        marginHorizontal: '6%',
        paddingLeft: 20,
        paddingVertical: 10,
        borderRadius: 40,
    },
    buttonText: {
        color: 'white',
        fontSize: 36,
        paddingLeft: 30,
        paddingTop: 8
    },
    buttonIcon: {
        marginLeft: 10,
        paddingTop: 20,
    },

    homeButton: {
        justifyContent: 'flex-end',
        paddingBottom: 5,
    }
  });