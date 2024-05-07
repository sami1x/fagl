import { View, Text } from "react-native";
import React from "react";
import { auth } from "@/config/firebaseConfig";

import { sendPasswordResetEmail, User } from "firebase/auth";

export default function Page() {
  return (
    <View>
      <Text>Page</Text>
    </View>
  );
}
