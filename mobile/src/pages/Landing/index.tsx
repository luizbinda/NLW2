import React from "react";
import { View, Image, Text } from "react-native";

import styles from "./styles";

import landingImg from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <View style={styles.container}>
      <Image source={landingImg} style={styles.banner} />
      <Text style={styles.title}>
        Seja Bem-Vindo, {"\n"}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>

      <View style={styles.buttonsContainer}>
        <RectButton
          style={[styles.buttons, styles.buttonsPrimary]}
          onPress={() => navigate("Study")}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>
        <RectButton
          style={[styles.buttons, styles.buttonsSecondary]}
          onPress={() => navigate("GiveClasses")}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Dar Aulas</Text>
        </RectButton>
      </View>
      <Text style={styles.total}>
        Total de 200 conexões já realizadas {"  "}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
