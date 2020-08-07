import React, { useState, useEffect } from "react";
import { View } from "react-native";

import PageHeader from "../../components/PageHeader";
import styles from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import AsyncStorage from "@react-native-community/async-storage";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        setFavorites(favoritedTeachers);
      }
    });
  };

  useEffect(() => {
    loadFavorites();
  }, [favorites]);

  return (
    <View style={styles.container}>
      <PageHeader title="Favoritos" />
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {favorites.map((teacher: Teacher) => {
          return <TeacherItem key={teacher.id} teacher={teacher} favorited />;
        })}
      </ScrollView>
    </View>
  );
};

export default Favorites;
