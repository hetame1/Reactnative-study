import React from "react";
import { Button, Text, View } from "react-native";

export class ScreenA extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Screen A</Text>

        <Button
          title="Go to Screen B"
          onPress={() => {
            // console.log("Go to Screen B");
            this.props.navigation.navigate("ScreenB", {
              value: "Hello, ScreenB!",
            });
          }}
        />

        <Button
          title="Go to Screen C"
          onPress={() => {
            // console.log("Go to Screen B");
            // this.props.navigation.navigate("ScreenB", {
            //   value: "Hello, ScreenB!",
            // });
            this.props.navigation.navigate("Nested", { screen: "ScreenC" });
          }}
        />
      </View>
    );
  }
}
