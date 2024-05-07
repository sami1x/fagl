import { auth } from "@/config/firebaseConfig";
import {
  ImageBackground,
  Image,
  Text,
  View,
  Pressable,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Stack, Link } from "expo-router";
import { useState } from "react";
import { router } from "expo-router";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";

import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export default function Page() {
  return (
    <>
      <View className="flex-1 items-center justify-center bg-[url('/assets/main-bg.png')]">
        <ImageBackground
          source={require("../../assets/main-bg.png")}
          resizeMode="cover"
          className=" flex h-full w-full items-center justify-center"
        >
          <View className="m-6 flex items-center justify-center ">
            <MaterialIcons name="verified-user" size={80} color="white" />
            <Text className="mt-10 max-w-full text-center text-2xl font-medium  text-white">
              A verification email is sent to you, click the link in the email
              to verify your account.
            </Text>
          </View>
          <View className="mx-4 flex w-full max-w-[350px]  flex-col items-center">
            <Pressable
              onPress={() => router.push("signin")}
              className=" mt-4 flex h-12 w-full items-center justify-center rounded-full border-2 border-white bg-white p-2"
            >
              <Text className="text-primary text-lg font-medium">Login</Text>
            </Pressable>
          </View>
        </ImageBackground>
      </View>

      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
    </>
  );
}
