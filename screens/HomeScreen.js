import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Platform,
  StatusBar,
  SafeAreaView
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      // only https link of ngrok works..download ngrok from ngrok.com
      url: "https://3f3b-49-204-114-236.ngrok.io/"
    };
  }

  componentDidMount() {
    this.getPlanets();
  }

  getPlanets = async() => {
    const { url } = this.state;
    console.log(url)
   axios.get(url)
      .then(response => {
        console.log(response.data)
        this.setState({
          listData: response.data.data
        });
      })
      .catch(error => {
        console.log(error.message)
        Alert.alert(error.message);
      });
  };

  renderItem = ({ item, index }) => (
   

     <ListItem key={index} bottomDivider  containerStyle={styles.listContainer} onPress={() =>
        this.props.navigation.navigate("Details", { planet_name: item.name })
      }>
        <ListItem.Content>
          <ListItem.Title style={styles.title}>{`Planet : ${item.name}`}</ListItem.Title>
          <ListItem.Subtitle>{`Distance from earth : ${item.distance_from_earth}`}</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>

       /*<ListItem
      key={index}
      title={`Planet : ${item.name}`}
      subtitle={`Distance from earth : ${item.distance_from_earth}`}
      titleStyle={styles.title}
      containerStyle={styles.listContainer}
      bottomDivider
      chevron
      onPress={() =>
        this.props.navigation.navigate("Details", { planet_name: item.name })
      }
    /> */
  );

  keyExtractor = (item, index) => index.toString();

  render() {
    const { listData } = this.state;

    if (listData.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyContainerText}>Loading</Text>
        </View>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.upperContainer}>
          <Text style={styles.headerText}>Planets World</Text>
        </View>
        <View style={styles.lowerContainer}>
          <FlatList
            keyExtractor={this.keyExtractor}
            data={this.state.listData}
            renderItem={this.renderItem}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#edc988",
    marginTop : Platform.OS === 'android'?StatusBar.currentHeight : 0
  },
  upperContainer: {
    height : 80,
    justifyContent: "center",
    alignItems: "center"
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#132743"
  },
  lowerContainer: {
    flex: 1
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  emptyContainerText: {
    fontSize: 20
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#d7385e"
  },
  listContainer: {
    backgroundColor: "#eeecda"
  }
});
