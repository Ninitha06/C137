import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Alert,SafeAreaView, Platform,StatusBar } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import axios from 'axios';

export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      details: {},
      imagePath: '',
      url: `https://3f3b-49-204-114-236.ngrok.io/planet?name=${this.props.route.params.planet_name}`,
    };
  }

  componentDidMount() {
    this.getDetails();
  }
  getDetails = async () => {
    const { url } = this.state;
    axios
      .get(url)
      .then((response) => {
        this.setDetails(response.data.data);
      })
      .catch((error) => {
        Alert.alert(error.message);
      });
  };

  setDetails = (planetDetails) => {
    const planetType = planetDetails.planet_type;
    let imagePath = '';
    switch (planetType) {
      case 'Gas Giant':
        imagePath = require('../images/gas_giant.png');
        break;
      case 'Terrestrial':
        imagePath = require('../images/terrestrial.png');
        break;
      case 'Super Earth':
        imagePath = require('../images/super_earth.png');
        break;
      case 'Neptune Like':
        imagePath = require('../images/neptune_like.png');
        break;
      default:
        imagePath = require('../images/gas_giant.png');
    }

    this.setState({
      details: planetDetails,
      imagePath: imagePath,
    });
  };

  render() {
    const { details, imagePath } = this.state;
    if (details.specifications) {
      return (
         <SafeAreaView style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Planets World</Text>
        </View>
          <Card>
            <Card.Title>{details.name}</Card.Title>
            <Card.Image source={imagePath} style={{ resizeMode: "contain", width: "100%" }}>
            </Card.Image>
              <Card.Divider />
              <View>
                <Text
                  style={
                    styles.cardItem
                  }>{`Distance from Earth : ${details.distance_from_earth}`}</Text>
                <Text
                  style={
                    styles.cardItem
                  }>{`Distance from Sun : ${details.distance_from_their_sun}`}</Text>
                <Text
                  style={
                    styles.cardItem
                  }>{`Gravity : ${details.gravity}`}</Text>
                <Text
                  style={
                    styles.cardItem
                  }>{`Orbital Period : ${details.orbital_period}`}</Text>
                <Text
                  style={
                    styles.cardItem
                  }>{`Orbital Speed : ${details.orbital_speed}`}</Text>
                <Text
                  style={
                    styles.cardItem
                  }>{`Planet Mass : ${details.planet_mass}`}</Text>
                <Text
                  style={
                    styles.cardItem
                  }>{`Planet Radius : ${details.planet_radius}`}</Text>
                <Text
                  style={
                    styles.cardItem
                  }>{`Planet Type : ${details.planet_type}`}</Text>
              </View>
              <View style={[styles.cardItem, { flexDirection: 'column' }]}>
                <Text>{details.specifications ? `Specifications : ` : ''}</Text>
                {details.specifications.map((item, index) => (
                  <Text key={index.toString()} style={{ marginLeft: 100 }}>
                    {item}
                  </Text>
                ))}
              </View>
            
          </Card>
        </SafeAreaView>
      );
    } else return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eeecda",
    marginTop : Platform.OS === 'android'?StatusBar.currentHeight : 0
  },
  upperContainer: {
    height : 80,
    justifyContent: "center",
    alignItems: "center",
     backgroundColor: "#edc988",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743"
  },
  cardItem: {
    marginBottom: 10,
  },
});
