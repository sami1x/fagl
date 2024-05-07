import React, { useState, useEffect } from "react";
import { Platform, Pressable, Text, View, StyleSheet } from "react-native";

import * as Location from "expo-location";
import { LocationObject } from "expo-location";

export default function GetLocationInfo() {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [latitude, setLatitude] = useState<number | null>();
  const [longitude, setLongitude] = useState<number | null>();
  const [accuracy, setAccuracy] = useState<number | null>();
  const [altitude, setAltitude] = useState<number | null>();

  const handleGetLocation = async () => {
    console.log("this is error message", errorMsg);
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
    setLatitude(location.coords?.latitude);
    setLongitude(location.coords?.longitude);
    setAccuracy(location.coords?.accuracy);
    setAltitude(
      location.coords?.altitude
        ? Number(location.coords.altitude.toFixed(7))
        : null,
    );
  };

  return (
    <View className="flex items-center">
      <Pressable
        onPress={handleGetLocation}
        className=" flex w-28 items-center justify-center rounded-full border-2 border-white bg-primary  p-2"
      >
        <Text className="text-lg font-medium text-white">Location</Text>
      </Pressable>
      {!errorMsg ? (
        <View className=" w-full py-4 ">
          <View className="mt-2 flex flex-row">
            <View className="flex-1 gap-y-1 ">
              <Text className="w-full text-center text-gray-400">Latitude</Text>
              <Text className="w-full text-center text-xl font-bold text-primary">
                {latitude}
              </Text>
            </View>
            <View className="flex-1 gap-y-1">
              <Text className="w-full text-center text-gray-400">
                Longitude
              </Text>
              <Text className="w-full text-center text-xl font-bold text-primary">
                {longitude}
              </Text>
            </View>
          </View>
          <View className="mt-5 flex flex-row">
            <View className="flex-1 gap-y-1">
              <Text className="w-full text-center text-gray-400">Accuracy</Text>
              <Text className="w-full text-center text-xl font-bold text-primary">
                {accuracy}
              </Text>
            </View>
            <View className="flex-1 gap-y-1">
              <Text className="w-full text-center text-gray-400">Altitude</Text>
              <Text className="w-full text-center text-xl font-bold text-primary">
                {altitude}
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <Text className="mt-4 text-red-500">{errorMsg}</Text>
      )}
    </View>
  );
}
