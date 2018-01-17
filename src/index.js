/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  StatusBar,
  View,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import Dimensions from 'Dimensions';
import MapView from 'react-native-maps';
import { styleObj } from './stylesheets/map';
import MarkerView from './components/MarkerView';

export default class app extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: null,
      markerRegion: [],
      dragItem: '',
      dragPosition: ''
    }
  }

  componentWillMount() {
    this.getUserLocation();
  }
  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      var region = {
        latitude: position.coords.latitude || 26.9153386,
        longitude: position.coords.longitude || 80.9439169,
        latitudeDelta: 0.025,
        longitudeDelta: 0.025
      };
      this.setState({
        initialRegion: region,
        markerRegion: [{
          latitude: position.coords.latitude || 26.9153386,
          longitude: position.coords.longitude || 80.9439169,
          title: 'my location 1',
          description: '1. This is a dummy description for this marker'
        },
        {
          latitude: (position.coords.latitude + 0.01) || (26.9153386 + 0.01),
          longitude: (position.coords.longitude + 0.01) || (80.9439169 + 0.01),
          title: 'my location 2',
          description: '2. This is a dummy description for this marker'
        }]
      });
    }, (error) => {
      console.log('error =>> ', error);
    })
  }
  resetUserLocation = () => {
    this.getUserLocation();
  }
  updateMsg = (step, info) => {
    switch (step) {
      case 0:
        this.setState({
          dragItem: 'Pin ' + (info + 1) + ' is held'
        });
      case 1:
        this.setState({
          dragPosition: 'Pin is moving on map..'
        })
      case 2:
        if (info && info.latitude && info.longitude) {
          this.setState({
            dragPosition: 'Stopped at ' + info.latitude + ', ' + info.longitude
          })
        }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#DCE8EB'}
          barStyle='dark-content'
          translucent={false}
        />
        {
          this.state.initialRegion ?
            <MapView
              customMapStyle={styleObj.mapStyle}
              region={this.state.initialRegion}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: Dimensions.get('window').height / 2,
                width: Dimensions.get('window').width
              }}>
              {
                this.state.markerRegion.length ?
                  this.state.markerRegion.map((marker, i) => {
                    return (
                      <MapView.Marker
                        draggable
                        key={i}
                        coordinate={this.state.markerRegion[i]}
                        onDragStart={(e) => this.updateMsg(0, i)}
                        onDrag={(e) => this.updateMsg(1)}
                        onDragEnd={(e) => this.updateMsg(2, e.nativeEvent.coordinate)}
                        title={marker.title}
                        description={marker.description}>
                        <MarkerView />
                      </MapView.Marker>
                    )
                  })
                  :
                  null
              }
            </MapView>
            :
            <ActivityIndicator
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: Dimensions.get('window').height / 2,
                width: Dimensions.get('window').width
              }}
            />
        }
        <Text style={styles.welcome}>
          Welcome to React Native
        </Text>
        {
          this.state.initialRegion ?
            <View>
              <Text style={{ color: '#dd00ff', fontSize: 14 }}>
                {this.state.initialRegion.latitude + ', ' + this.state.initialRegion.longitude}
              </Text>
            </View>
            :
            null
        }
        <View
          style={{
            alignItems: 'center',
            marginTop: 20
          }}>
          <Text style={{ color: '#12cc33', fontSize: 10 }}>{this.state.dragItem}</Text>
          <Text style={{ color: '#cc8811', fontSize: 12 }}>{this.state.dragPosition}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.resetUserLocation()}
          style={{
            marginTop: 20,
            backgroundColor: '#34d2cc',
            paddingVertical: 10,
            paddingHorizontal: 30,
            borderRadius: 4
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: 'white'
            }}>
            Reset location on map
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    marginTop: Dimensions.get('window').height / 2,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
