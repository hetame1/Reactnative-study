import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ScreenA } from "./src/ScreenA";
import { ScreenB } from "./src/ScreenB";
import { NestedStackNavigator } from "./src/NestedStachNavigator";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { TabA } from "./src/TabA";
import { TabB } from "./src/TabB";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabNavigator } from "./src/BottomTabNavigator";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name="ScreenA" component={ScreenA} />
//         <Stack.Screen name="ScreenB" component={ScreenB} />
//         <Stack.Screen name="Nested" component={NestedStackNavigator} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={"Nested"} component={BottomTabNavigator} />
        <Stack.Screen name="ScreenB" component={ScreenB} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
