import React from "react";
import { View, ImageBackground, Text } from "react-native";

import styles from "./styles";

import GiveClassesBgImage from "../../assets/images/give-classes-background.png";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

const GiveClasses: React.FC = () => {
  const { goBack } = useNavigation();
  return (
    <View style={styles.container}>
      <ImageBackground
        source={GiveClassesBgImage}
        resizeMode="contain"
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>

        <Text style={styles.descripition}>
          Para começar, voçê precisa se cadastrar como professor na nossa
          plataforma web
        </Text>
      </ImageBackground>
      <RectButton style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Tudo bem</Text>
      </RectButton>
    </View>
  );
};

export default GiveClasses;
