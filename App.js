import { createStackNavigator } from "@react-navigation/stack";
import {
  NavigationContainer,
  StackActions,
  useNavigation,
} from "@react-navigation/native";
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
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetModalProvider>
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
                      name="document-attach-outline"
                      size={30}
                      style={{ color: colors.primaryColor, right: 25 }}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
          </Stack.Navigator>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
}
