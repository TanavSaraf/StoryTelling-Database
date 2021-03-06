import AppLoading from "expo-app-loading";
import React from "react";
import { StyleSheet, Text, View,Platform,SafeAreaView,StatusBar } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import * as Font from "expo-font";
import { FlatList } from "react-native-gesture-handler";
import StoryCard from "../components/storyCard";
let customFonts = {
  "bubblegum-sans": require("../assets/fonts/BubblegumSans-Regular.ttf"),
};
let stories = require("../temp_stories.json");
export default class FeedRead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontsLoaded: false,

    };
  }
  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFontAsync();
  }
  renderItem = ({ item, index }) => {
    return <StoryCard story={item} navigation={this.props.navigation}/>;
  };
  render() {
    if (this.state.fontsLoaded) {
      return (
        <View style={styles.container}>
          <SafeAreaView style={ styles.droidSafeArea}/>
          <Text style={styles.title}>Feed Screen</Text>
          <FlatList
            data={stories}
            keyExtractor={(item, index) => {
              return index.toString();
            }}
            renderItem={this.renderItem}
          />
        </View>
      );
    } else {
      return <AppLoading />;
    }
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin:2,
    borderWidth:2,
    backgroundColor: "#0009ff",
    borderRadius: 20,
    margin: 10,
    
  },
  droidSafeArea: { marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35) },
  title:{
    fontFamily: "bubblegum-sans",
    fontSize: RFValue(20),
    color: "white",
    borderWidth: 2,
    borderRadius: 5,
    margin:10,
    textAlign:'center'
  }
});
