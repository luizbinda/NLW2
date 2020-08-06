import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Landing from "../pages/Landing";
import GiveClasses from "../pages/GiveClasses";
import StuduTabs from "./StudyTabs";

const { Navigator, Screen } = createStackNavigator();

const AppStack = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="Landing" component={Landing} />
        <Screen name="GiveClasses" component={GiveClasses} />
        <Screen name="Study" component={StuduTabs} />
      </Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
