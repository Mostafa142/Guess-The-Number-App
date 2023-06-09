import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import BackgroundImage from "./assets/images/background.png";
import StartGameScreen from "./screens/StartGameScreen/StartGameScreen";
import GameScreen from "./screens/GameScreen/GameScreen";
import Colors from "./constants/Colors";
import GameOverScreen from "./screens/GameOverScreen/GameOverScreen";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";
export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(true);
  const [guessRounds, setGuessRound] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  const pickedNumberHandler = (pickedNumber) => {
    setUserNumber(pickedNumber);
    setGameIsOver(false);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGameIsOver(true);
    setGuessRound(numberOfRounds);
  };

  const handleStartNewGame = () => {
    setUserNumber(null);
    setGuessRound(0);
  };

  let screen = <StartGameScreen pickedNumberHandler={pickedNumberHandler} />;

  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} gameOverHandler={gameOverHandler} />
    );
  }
  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        handleStartNewGame={handleStartNewGame}
      />
    );
  }
  return (
    <>
      {/* <StatusBar style="auto" /> */}
      <LinearGradient
        colors={[Colors.Primary700, Colors.accent500, Colors.Primary700]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={BackgroundImage}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.BackgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  BackgroundImage: {
    opacity: 0.15,
  },
});
