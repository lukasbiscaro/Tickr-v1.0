import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { TabNavigator } from './components/navigation/navigator'
import { Provider } from "./components/globalContext/globalContext.js";

const App = () => {

  return (
    <Provider>
      <View className="flex-1">
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </View>
    </Provider>

  )
}

export default App;