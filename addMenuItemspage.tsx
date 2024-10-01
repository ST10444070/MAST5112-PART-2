import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as ImagePicker from 'react-native-image-picker';

// Sample dynamic menu data
const dynamicMenuData = [
  { id: '1', name: 'Grilled Salmon', description: 'Delicious grilled salmon', course: 'Main', price: 25, image: 'https://example.com/salmon.jpg' },
  { id: '2', name: 'Caesar Salad', description: 'Classic Caesar salad', course: 'Starter', price: 10, image: 'https://example.com/salad.jpg' },
  { id: '3', name: 'Chocolate Cake', description: 'Rich chocolate dessert', course: 'Dessert', price: 12, image: 'https://example.com/cake.jpg' },
];

const Stack = createStackNavigator();

// Component to display the average price of each course
const AveragePrice = ({ menuData }) => {
  const courseData = ['Starter', 'Main', 'Dessert'];
  const getAveragePrice = (course) => {
    const filteredItems = menuData.filter((item) => item.course === course);
    const total = filteredItems.reduce((sum, item) => sum + item.price, 0);
    return (total / filteredItems.length).toFixed(2);
  };

  return (
    <View style={styles.averagePriceContainer}>
      <Text style={styles.averagePriceTitle}>Average Prices by Course</Text>
      {courseData.map((course) => (
        <Text key={course} style={styles.averagePriceText}>
          {course}: ${getAveragePrice(course)}
        </Text>
      ))}
    </View>
  );
};

// Home Screen Component
function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Christoffel Palate Pleasure</Text>
      <Button title="Next" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}

// Manage Menu Screen Component
function ManageMenuScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Menu Page</Text>
      <Button title="Back to Menu" onPress={() => navigation.navigate('Menu')} />
    </View>
  );
}

// Menu Screen Component
function MenuScreen({ navigation }) {
  const [menuItems, setMenuItems] = useState(dynamicMenuData);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(dynamicMenuData);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  // Dropdown Picker state
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Starter', value: 'Starter' },
    { label: 'Main', value: 'Main' },
    { label: 'Dessert', value: 'Dessert' },
  ]);

  // Filter menu items based on the search query and course
  const handleSearch = (text) => {
    setSearchQuery(text);
    filterMenu(text, selectedCourse);
  };

  const handleCourseChange = (course) => {
    setSelectedCourse(course);
    filterMenu(searchQuery, course);
  };

  const filterMenu = (text, course) => {
    const filtered = dynamicMenuData.filter(
      (item) =>
        (item.name.toLowerCase().includes(text.toLowerCase()) ||
          item.description.toLowerCase().includes(text.toLowerCase())) &&
        (!course || item.course === course)
    );
    setFilteredMenu(filtered);
  };

  // Add new menu item
  const addMenuItem = (name, description, course, price, imageUri) => {
    const newMenuItem = {
      id: (menuItems.length + 1).toString(),
      name,
      description,
      course,
      price: parseFloat(price),
      image: imageUri,
    };
    setMenuItems([...menuItems, newMenuItem]);
    setFilteredMenu([...menuItems, newMenuItem]);
  };

  // Select image using ImagePicker
  const selectImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <AveragePrice menuData={menuItems} />

      {/* Search Bar */}
      <TextInput
        style={styles.input}
        placeholder="Search Menu"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {/* Dropdown Picker for course */}
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={handleCourseChange}
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
            <Image source={{ uri: item.image }} style={styles.menuImage} />
            <Text style={styles.menuText}>
              {item.name} - {item.description} - ${item.price}
            </Text>
          </View>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button title="Manage Menu" onPress={() => navigation.navigate('ManageMenu')} />
      </View>

      {/* Add New Menu Item */}
      <View style={styles.addMenuContainer}>
        <TouchableOpacity onPress={selectImage}>
          <Text>Select Image</Text>
        </TouchableOpacity>
        <TextInput placeholder="Dish Name" style={styles.input} />
        <TextInput placeholder="Description" style={styles.input} />
        <TextInput placeholder="Price" style={styles.input} keyboardType="numeric" />
        <Button title="Add New Menu Item" onPress={() => addMenuItem('Dish Name', 'Description', 'Course', 20, imageUri)} />
      </View>
    </View>
  );
}

// Navigation Setup
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="ManageMenu" component={ManageMenuScreen} />
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
    fontSize: 24,
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
  menuImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  addMenuContainer: {
    marginTop: 20,
  },
});
