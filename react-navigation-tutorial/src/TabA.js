import React from "react";
import { Text, View } from "react-native";

export class TabA extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Tab A</Text>
      </View>
    );
  }
}