import { StyleSheet, Text, View ,TextInput, } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from "@expo/vector-icons";

const Search = () => {
    const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    // Handle search functionality
  };

  return (
    <View style={styles.searchcontainer}>
          <Ionicons
            name="search"
            size={24}
            color="#777"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Your Event"
            placeholderTextColor="#777"
            onChangeText={(query) => setSearchQuery(query)}
            value={searchQuery}
            onSubmitEditing={handleSearch}
          />
          {searchQuery ? (
            <Ionicons
              name="close-circle"
              size={24}
              color="#777"
              style={styles.clearIcon}
              onPress={() => setSearchQuery("")}
            />
          ) : null}
        </View>
  )
}

export default Search

const styles = StyleSheet.create({
    searchcontainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f1f1f1",
        borderRadius: 20,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        marginTop: 20,
        borderWidth: 1,
        elevation: 20,
        marginTop: 100,
      },
      searchIcon: {
        marginRight: 10,
      },
    
      searchInput: {
        flex: 1,
        color: "#333",
        fontSize: 16,
        paddingVertical: 10,
      },
      clearIcon: {
        marginLeft: 10,
      },
})