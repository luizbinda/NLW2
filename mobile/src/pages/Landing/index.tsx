import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";

import styles from "./styles";

import landingImg from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import heartIcon from "../../assets/images/icons/heart.png";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";
import api from "../../services/api";

const Landing: React.FC = () => {
  const { navigate } = useNavigation();

  const [totalConnection, setTotalConnection] = useState(0);

  useEffect(() => {
    async function getConnections() {
      await api
        .get("connections")
        .then((response) => setTotalConnection(response.data.total));
    }
    getConnections();
  }, []);

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
        Total de {totalConnection} conexões já realizadas {"  "}
        <Image source={heartIcon} />
      </Text>
    </View>
  );
};

export default Landing;
