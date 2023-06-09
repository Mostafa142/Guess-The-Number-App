import React from "react";
import { StyleSheet, Text } from "react-native";
import Colors from "../../../constants/Colors";

const InstructionText = ({ children, style }) => {
  return <Text style={[style, styles.instructionText]}>{children}</Text>;
};

export default InstructionText;

const styles = StyleSheet.create({
  instructionText: {
    color: Colors.accent500,
    fontSize: 24,
    fontFamily: "open-sans",
  },
});
