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

import { Ionicons } from "@expo/vector-icons";

import {
  sendEmailVerification,
  createUserWithEmailAndPassword,
  deleteUser,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const handleResetPasswordEmail = () => {
    setShowLoader(true);

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setShowLoader(false);
        router.push("signin/resetPassword");
        console.log("email sent...");
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(" Error sending email...", error.message);
        switch (error.code) {
          case "auth/missing-email":
            setErrorMessage("Please enter your email address*");
            break;
          case "auth/invalid-email":
            setErrorMessage("Email address is not valid*");
            break;
          default:
            setErrorMessage("Some unexpected error occured*");
            break;
        }
      });
  };

  return (
    <>
      <View className="flex-1 items-center justify-center bg-[url('/assets/main-bg.png')]">
        <ImageBackground
          source={require("../../assets/main-bg.png")}
          resizeMode="cover"
          className=" flex h-full w-full items-center justify-center"
        >
          <View className="m-6 flex items-center justify-center ">
            <Image
              source={require("../../assets/icon.png")}
              className="h-20 w-20 rounded-xl"
            />
            <Text className="mt-10 w-full text-3xl font-medium  text-white">
              Password Reset
            </Text>
          </View>
          <View className="mx-4 flex w-full max-w-[350px]  flex-col items-center">
            <TextInput
              onFocus={() => setErrorMessage("")}
              className=" mb-2 w-full 	border-b border-white p-2 text-lg text-white"
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255 , 0.8)"
              onChangeText={(newText) => {
                setErrorMessage("");
                setEmail(newText);
              }}
              defaultValue={email}
            />

            <Text className="my-1 text-red-500">{errorMessage}</Text>
            <Pressable
              onPress={handleResetPasswordEmail}
              className=" mt-2 flex h-12 w-full items-center justify-center rounded-full border-2 border-white bg-white p-2"
            >
              {showLoader ? (
                <ActivityIndicator size="small" color="#9070BF" />
              ) : (
                <Text className="text-primary text-lg font-medium">Submit</Text>
              )}
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
