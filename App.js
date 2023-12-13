import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import Index from "./app/login/index";
import AddTask from "./app/modal/addTask";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import colors from "./commons/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { TouchableOpacity } from "react-native";
export default function App() {
  const Stack = createStackNavigator();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={Index}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="AddTask"
              component={AddTask}
              options={{
                presentation: "card",
                title: "Add a new task",
                headerStyle: {
                  backgroundColor: colors.backgroundColor,
                  height: 100,
                },
                headerTitleStyle: { color: "#fff" },
                headerBackTitleStyle: { color: colors.primaryColor },
                headerBackImage: () => (
                  <Ionicons
                    name="chevron-back-outline"
                    size={20}
                    color={colors.primaryColor}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity>
                    <Ionicons
                      name="checkmark-circle"
                      color={colors.primaryColor}
                      size={35}
                      style={{ paddingRight: 10 }}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
