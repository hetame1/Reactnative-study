import React from "react";
import { Button, Text, View } from "react-native";

export class ScreenB extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Screen B {this.props.route.params.value} </Text>

        <Button
          title="뒤록가기"
          onPress={() => {
            this.props.navigation.goBack();
          }}
        />
      </View>
    );
  }
}
