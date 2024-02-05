import React from "react";
import { TabA } from "./TabA";
import { NestedStackNavigator } from "./NestedStachNavigator";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const BottomTab = createBottomTabNavigator();

export class BottomTabNavigator extends React.Component {
  render() {
    return (
      <BottomTab.Navigator>
        <BottomTab.Screen
          name="TabA"
          component={TabA}
          options={{
            tabBarIcon: () => <Ionicons name="home" size={20} />,
          }}
        />
        <BottomTab.Screen
          name="TabB"
          component={NestedStackNavigator}
          options={{
            tabBarIcon: () => <Ionicons name="settings" size={20} />,
          }}
        />
      </BottomTab.Navigator>
    );
  }
}
