import React, { Component } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';

export default ({history}) => (
    <View style={styles.container} >
        <View style={styles.sidebar}>
            <Text> Sidebar </Text>
            <Button title="Home" onPress={()=> history.push("/")} />
            <Button title="Menu" onPress={()=> history.push("/menu")} />
            <Button title="Analytics" onPress={()=> history.push("/analytics")} />
        </View>

        <View style={styles.body}>
            <Text> Analytics </Text>
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
    },

    sidebar: {
        height: '100%',
        width: '25%',
        borderWidth: 3,
        borderColor: 'green',
    },
    body: {
        height: "100%",
        width: 500,
        borderWidth: 3,
        borderColor: 'green',
        flex: 1,
    },
  });