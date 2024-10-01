import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Welcome Screen Component
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: 'img/chef.jpg' }} // Replace with your image link
        style={styles.image}
      />
      <Text style={styles.title}>
        WELCOME AT CHRISTOFFEL PALATE PLEASURE
      </Text>
      <Button 
        title="Next" 
        onPress={() => navigation.navigate('Menu')} // Navigates to the next screen
      />
    </View>
  );
}

// Placeholder for Menu screen
function MenuScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.menuText}>Menu Screen</Text>
    </View>
  );
}

// Setting up stack navigation
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles for the welcome screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  menuText: {
    fontSize: 24,
  },
});
