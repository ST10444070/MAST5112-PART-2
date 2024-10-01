import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Sample dynamic menu data
const dynamicMenuData = [
  { id: '1', name: 'Grilled Salmon', description: 'Delicious grilled salmon', course: 'Main', price: 25 },
  { id: '2', name: 'Caesar Salad', description: 'Classic Caesar salad', course: 'Starter', price: 10 },
  { id: '3', name: 'Chocolate Cake', description: 'Rich chocolate dessert', course: 'Dessert', price: 12 },
  { id: '4', name: 'Chicken Wings', description: 'Spicy chicken wings', course: 'Starter', price: 15 },
  { id: '5', name: 'Steak', description: 'Juicy grilled steak', course: 'Main', price: 30 },
  { id: '6', name: 'Apple Pie', description: 'Warm apple pie with cinnamon', course: 'Dessert', price: 8 },
];

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

// Menu Screen Component
function MenuScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(dynamicMenuData);
  const [selectedCourse, setSelectedCourse] = useState(null);

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

  return (
    <View style={styles.container}>
      {/* Average Price Component */}
      <AveragePrice menuData={dynamicMenuData} />

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
            <Text style={styles.menuText}>
              {item.name} - {item.description} - ${item.price}
            </Text>
          </View>
        )}
      />

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button title="Back" onPress={() => navigation.goBack()} />
        <Button
          title="Next"
          onPress={() => Alert.alert('Navigating to Next screen!')}
        />
        <Button
          title="View Full Menu"
          onPress={() => Alert.alert('Displaying Full Menu')}
        />
      </View>
    </View>
  );
}

// Navigation Setup
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  averagePriceContainer: {
    marginBottom: 20,
  },
  averagePriceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  averagePriceText: {
    fontSize: 16,
  },
});
