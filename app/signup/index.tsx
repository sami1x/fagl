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
  signOut,
} from "firebase/auth";

export default function Page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showLoader, setShowLoader] = useState(false);

  const addUser = () => {
    setShowLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;

        sendEmailVerification(user)
          .then(() => {
            signOut(auth)
              .then(() => {
                router.push("signup/emailVerificationPage");
              })
              .catch((error) => {
                deleteUser(user)
                  .then(() => {
                    setErrorMessage(
                      "Try again or use a different email address*",
                    );
                    setShowLoader(false);
                  })
                  .catch((error) => {
                    setErrorMessage(
                      "Try again or use a different email address*",
                    );
                  });
                console.log("Error occured signing out the user", error);
              });
          })
          .catch(() => {
            deleteUser(user)
              .then(() => {
                setErrorMessage("Try again or use a different email address*");
              })
              .catch((error) => {
                setErrorMessage("Try again or use a different email address*");
              });
          });
      })
      .catch((error) => {
        console.log("this is the error object", error.message);
        console.log("error adding user", error.code);
        setShowLoader(false);

        switch (error.code) {
          case "auth/missing-password":
            setErrorMessage("Please enter a password*");
            break;
          case "auth/invalid-email":
            setErrorMessage("Email address is not valid*");
            break;
          case "auth/weak-password":
            setErrorMessage("Password should be at least 6 characters*");
            break;
          case "auth/email-already-in-use":
            setErrorMessage("This email is already in use*");
            break;
          default:
            setErrorMessage("Some unexpected error occured*");
            break;
        }
        // ..
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
              Create an account!
            </Text>
          </View>
          <View className="mx-4 flex w-full max-w-[350px]  flex-col items-center">
            <TextInput
              onFocus={() => setErrorMessage("")}
              className=" mb-4 w-full 	border-b border-white p-2 text-lg text-white"
              placeholder="Email"
              placeholderTextColor="rgba(255,255,255 , 0.8)"
              onChangeText={(newText) => {
                setErrorMessage("");
                setEmail(newText);
              }}
              defaultValue={email}
            />
            <View className="mb-2 flex w-full flex-row items-center border-b border-white">
              <TextInput
                onFocus={() => setErrorMessage("")}
                className="  flex-1 p-2 text-lg text-white"
                placeholder="Password"
                placeholderTextColor="rgba(255,255,255 , 0.8)"
                onChangeText={(newText) => {
                  setErrorMessage("");
                  setPassword(newText);
                }}
                secureTextEntry={!passwordVisible}
                defaultValue={password}
              />
              <View className="mx-2">
                <Ionicons
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  className="mx-2"
                  name={`${
                    !passwordVisible ? "eye-off-outline" : "eye-outline"
                  }`}
                  size={24}
                  color="white"
                />
              </View>
            </View>
            <Text className="my-1 text-red-500">{errorMessage}</Text>
            <Pressable
              onPress={addUser}
              className=" mt-2 flex h-12 w-full items-center justify-center rounded-full border-2 border-white bg-white p-2"
            >
              {showLoader ? (
                <ActivityIndicator size="small" color="#9070BF" />
              ) : (
                <Text className="text-primary text-lg font-medium">
                  Sign up
                </Text>
              )}
            </Pressable>
            <Text className="mt-4 text-base text-white">
              Already have an account?{" "}
              <Text
                onPress={() => {
                  router.push("signin");
                }}
                className="font-bold underline"
              >
                Sign in
              </Text>
            </Text>
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
