import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, Button, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Sample menu data
const menuItems = [
  { id: '1', name: 'Beef Steak', price: '$12', image: 'https://example.com/beef_steak.jpg' },
  { id: '2', name: 'Margarita Pizza', price: '$9', image: 'https://example.com/pizza.jpg' },
  { id: '3', name: 'Mint Chicken Burger', price: '$11', image: 'https://example.com/chicken_burger.jpg' },
];

function MenuScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter menu items based on the search query
  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>MENU PAGE</Text>
      
      {/* Search bar */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={searchQuery}
        onChangeText={text => setSearchQuery(text)}
      />

      {/* List of menu items */}
      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.menuInfo}>
              <Text style={styles.menuText}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </View>
        )}
      />

      {/* Back and Next Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Next" onPress={() => navigation.navigate('NextScreen')} />
      </View>
    </View>
  );
}

function NextScreen() {
  return (
    <View style={styles.container}>
      <Text>Next Screen</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="NextScreen" component={NextScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#e0f7f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
  },
  menuInfo: {
    flexDirection: 'column',
  },
  menuText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
