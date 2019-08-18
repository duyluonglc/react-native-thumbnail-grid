/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, ImageBackground, Image, Text} from 'react-native';

import PhotoGrid from 'react-native-thumbnail-grid';
import _ from 'lodash';
import ImageLoad from 'react-native-image-placeholder';

import {createBottomTabNavigator, createAppContainer} from 'react-navigation';

const images = [
  'https://drscdn.500px.org/photo/216465193/m%3D2048_k%3D1_a%3D1/dda61fd7cea5013f8ebe7661b7abea3a',
  'https://drscdn.500px.org/photo/215467843/m%3D2048_k%3D1_a%3D1/344703e86f31e1fffb2d63effa2cee33',
  'https://drscdn.500px.org/photo/216340727/m%3D2048_k%3D1_a%3D1/20d583e15467fb39d06d48131767edc2',
  'https://drscdn.500px.org/photo/215498077/m%3D2048_k%3D1_a%3D1/f79e906eb96938807f6f9d758fc652fd',
  'https://drscdn.500px.org/photo/216559713/m%3D2048_k%3D1_a%3D1/393ef5251fa94964fe62cad52a416b7e',
  'https://drscdn.500px.org/photo/214943889/m%3D2048_k%3D1_a%3D1/90bd2e3619dfcaae53fed683561aae1b',
  'https://drscdn.500px.org/photo/216158509/m%3D2048_k%3D1_a%3D1/cf70d51aab6ca4c4a3c1ecc225c69990',
  'https://drscdn.500px.org/photo/216111469/m%3D2048_k%3D1_a%3D1/d2d83296c838258095dbf2bffda70602',
  'https://drscdn.500px.org/photo/216051623/m%3D2048_k%3D1_a%3D1/5a3732bb413f240ad71b8279b038a3ff',
  'https://drscdn.500px.org/photo/216047335/m%3D2048_k%3D1_a%3D1/4237ac4606474f0ec7ccc05ca311772e',
  'https://drscdn.500px.org/photo/216000289/m%3D2048_k%3D1_a%3D1/5ac2a21092f9281feef3ab8484d2b19c',
];

class Default extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      let numImage = Math.floor(Math.random() * 11) + 1;
      this.setState({images: _.take(_.shuffle(images), numImage)});
    }, 2000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const {images} = this.state;
    return (
      <View style={styles.container}>
        <PhotoGrid source={images} />
      </View>
    );
  }
}

class Custom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
    };
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      let numImage = Math.floor(Math.random() * 11) + 1;
      this.setState({images: _.take(_.shuffle(images), numImage)});
    }, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderItem(img, height, width, style, imgProps) {

    let smaller = height > width ? width : height;

    smaller = smaller - 20;
    return (
        <View style={[styles.Imgcontainer, styles.image, {width, height}, style]}>
          <View style = {styles.backgroundContainer}>
            <Image source={typeof img === 'string' ? {uri: img} : img} resizeMode = 'cover' style = {styles.backdrop} />
          </View>
          <View style = {styles.overlay}>
            <Image style = {{height: smaller, width: smaller, offsetLeft: 10, offsetTop: 10}} source = {require('./26025.png')} />
          </View>
        </View>
    );
  }

  render() {
    const {images} = this.state;
    return (
      <View style={styles.container}>
        <PhotoGrid source={images} renderItem={this.renderItem} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'grey',
  },
  image: {
    //flex: 1,
    borderWidth: 1,
    borderColor: '#fff',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  Imgcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  overlay: {
    opacity: 0.5,
    alignItems: 'center',
    //backgroundColor: '#000000'
  },
  backdrop: {
    flex:1,
    flexDirection: 'column'
  },
});

const MainNavigator = createBottomTabNavigator({
  Default: {
    screen: Default,
    navigationOptions: () => ({
      title: 'Default',
    }),
  },
  Custom: {
    screen: Custom,
    navigationOptions: () => ({
      title: 'Custom',
    }),
  },
});

const App = createAppContainer(MainNavigator);

export default App;
