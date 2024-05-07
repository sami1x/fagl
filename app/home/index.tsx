import {
  View,
  Text,
  ImageBackground,
  Alert,
  BackHandler,
  Pressable,
} from "react-native";
import React, { useEffect } from "react";
import { Stack, Link } from "expo-router";
import { Tabs, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "@/config/firebaseConfig";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { signOut } from "firebase/auth";
import GetLocationInfo from "@/app/(components)/GetLocationInfo";
export default function Page() {
  const user = auth.currentUser;
  const userName = auth.currentUser?.displayName;

  const userEmail = auth.currentUser?.email;
  useEffect(() => {
    const backAction = () => {
      Alert.alert("", "Are you sure you want to exit?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.replace("/");
      })
      .catch((error) => {
        console.log("Error occured signing out the user", error);
      });
  };

  return (
    <>
      <ImageBackground
        source={require("../../assets/homebg.png")}
        resizeMode="cover"
        className="  h-full w-full "
      >
        <SafeAreaView className="flex flex-row items-center justify-between  p-4">
          <MaterialCommunityIcons
            name="dots-horizontal"
            size={35}
            color="white"
          />
          <Pressable onPress={handleLogout}>
            <View className="flex h-8 w-8 items-center justify-center rounded-3xl bg-white">
              <FontAwesome
                name="user"
                size={20}
                color="#9070BF"
                className="m-0 p-0"
              />
            </View>
          </Pressable>
        </SafeAreaView>
        <View className=" mx-4 ">
          <Text className="text-sm text-white">Name</Text>
          <Text className="pb-2 pl-2 text-2xl font-bold text-white">
            ZiaUllah
          </Text>
          <Text className="text-sm text-white">Email</Text>
          <Text className="pb-2 pl-2 text-2xl font-bold text-white">
            {userEmail}
          </Text>
        </View>
        <View className="mx-5 mt-4 rounded-3xl bg-white p-4">
          <GetLocationInfo />
        </View>
        <Tabs.Screen
          options={{
            headerShown: false,
          }}
        />
      </ImageBackground>
    </>
  );
}
