import { ImageBackground, Image, Text, View, Pressable } from "react-native";
import { Stack, Link } from "expo-router";
import { router, Redirect } from "expo-router";
import { auth } from "@/config/firebaseConfig";
import { User } from "firebase/auth";

import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
SplashScreen.preventAutoHideAsync();

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      SplashScreen.hideAsync();
    });

    return unsubscribe;
  }, []);

  if (user) {
    return <Redirect href="home" />;
  } else {
    return (
      <>
        <View className="flex-1 items-center justify-center bg-[url('/assets/main-bg.png')]">
          <ImageBackground
            source={require("../assets/main-bg.png")}
            resizeMode="cover"
            className=" flex h-full w-full items-center justify-center"
          >
            <View className="m-8 flex items-center justify-center">
              <Image
                source={require("../assets/icon.png")}
                className="h-20 w-20 rounded-xl"
              />
              <Text className="mt-6 text-4xl font-medium text-white">
                Welcome!
              </Text>
              <Text className="mt-4 text-center text-lg text-white">
                Introducing <Text className="font-bold">Fagal</Text> your go-to
                resource for immediate, location-specific first aid assistance.
                Seamlessly integrating comprehensive guidance with GPS
                technology, this user-friendly tool empowers timely responses to
                emergencies, whether you're at home, on the road, or in the
                outdoors.
              </Text>
            </View>
            <View className="m-4 flex w-full max-w-[350px]  flex-col items-center">
              <Pressable
                onPress={() => {
                  router.push("signin");
                }}
                className=" flex w-full items-center justify-center rounded-full border-2 border-white bg-white p-2"
              >
                <Text className="text-primary text-lg font-medium">Login</Text>
              </Pressable>
              <Text className="my-3 text-lg font-medium text-white">Or</Text>
              <Pressable
                onPress={() => {
                  router.push("signup");
                }}
                className=" flex w-full items-center justify-center rounded-full border-2 border-white  p-2"
              >
                <Text className="text-lg font-medium text-white">Sign up</Text>
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
}
