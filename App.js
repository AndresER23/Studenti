import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, AsyncStorage } from '@react-navigation/native';
import Index from './app/login/index';
import AddTask from './app/modal/addTask';
import IndexLogOut from './app/logout';

export default function App() {
  const Stack = createStackNavigator();

  const haveUser = async () => {
    try {
      let data = await AsyncStorage.getItem("user")
      let user = JSON.parse(data)
      return user
    } catch (error) {
      return  null
    }
  }
  return (
    <NavigationContainer>
      {
        haveUser()["name"] ? <Stack.Navigator>
        <Stack.Screen name="Home" component={Index} options={{
          headerShown:false
        }}/>
        <Stack.Screen name="AddTask" component={AddTask} options={{presentation:"modal", title:"Add a new task"}} />
      </Stack.Navigator> : 
      (<Stack.Navigator>
        <Stack.Screen  name="logIn" component={IndexLogOut} options={{
          headerShown:false
        }}/>
      </Stack.Navigator>)
      }
    </NavigationContainer>
  );
}


