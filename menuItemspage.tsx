import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Sample menu data
const menuData = [
  { id: '1', name: 'Grilled Salmon', description: 'Delicious grilled salmon', course: 'Main', price: 25 },
  { id: '2', name: 'Caesar Salad', description: 'Classic Caesar salad', course: 'Starter', price: 10 },
  { id: '3', name: 'Chocolate Cake', description: 'Rich chocolate dessert', course: 'Dessert', price: 12 },
  // Add more menu items as needed
];

// Welcome Screen
function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>WELCOME AT CHRISTOFFEL PALATE PLEASURE</Text>
      <Button title="Next" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}

// Menu Screen
function MenuScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(menuData);

  // Filter menu items based on the search query
  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = menuData.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()) ||
      item.description.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredMenu(filtered);
  };

  // Dropdown Picker state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Starter', value: 'starter' },
    { label: 'Main', value: 'main' },
    { label: 'Dessert', value: 'dessert' },
  ]);

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search Menu"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Dropdown Picker */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder="Select Course"
        containerStyle={styles.dropdown}
      />

      {/* List of Filtered Menu Items */}
      <FlatList
        data={filteredMenu}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuText}>
              {item.name} - {item.description} - ${item.price}
            </Text>
          </View>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Next" onPress={() => alert('Next Screen')} />
      </View>
    </View>
  );
}

// Navigation Setup
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

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  dropdown: {
    marginBottom: 20,
  },
  menuItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  menuText: {
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
