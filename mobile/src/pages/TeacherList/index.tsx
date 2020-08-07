import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";

import PageHeader from "../../components/PageHeader";
import styles from "./styles";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import {
  ScrollView,
  TextInput,
  BorderlessButton,
} from "react-native-gesture-handler";

import { useFocusEffect } from "@react-navigation/native";

import AsyncStorage from "@react-native-community/async-storage";

import { Feather } from "@expo/vector-icons";
import api from "../../services/api";
const TeacherList: React.FC = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [teachers, setTeachers] = useState([]);

  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const [favorites, setFavorites] = useState<Number[]>([]);

  async function getClasses(subject: string, week_day: string, time: string) {
    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });
    response.data.length > 0 && setFiltersVisible(false);
    setTeachers(response.data);
  }

  const loadFavorites = () => {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => teacher.id
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  };

  useEffect(() => {
    if (subject !== "" && week_day !== "" && time !== "") {
      loadFavorites();
      getClasses(subject, week_day, time);
    }
  }, [subject, week_day, time]);

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton>
            <Feather
              name="filter"
              size={20}
              color="#fff"
              onPress={() => setFiltersVisible(!filtersVisible)}
            />
          </BorderlessButton>
        }
      >
        {filtersVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              style={styles.input}
              placeholder="Qual a matéria?"
              placeholderTextColor="#c1bccc"
              value={subject}
              onChangeText={(text) => setSubject(text)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da Semana</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual o dia?"
                  placeholderTextColor="#c1bccc"
                  value={week_day}
                  onChangeText={(text) => setWeekDay(text)}
                />
              </View>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Qual a Horário?"
                  placeholderTextColor="#c1bccc"
                  value={time}
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      >
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TeacherList;
