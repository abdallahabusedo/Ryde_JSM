import { icons } from "@/constants";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Maps from "./Maps";
const RideLayout = ({
  children,
  title,
  snapPoints,
}: {
  children: React.ReactNode;
  title: string;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = React.useRef<BottomSheet>(null);
  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white ">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="absolute z-10 flex flex-row items-center justify-start px-5 top-16">
            <TouchableOpacity onPress={() => router.back()}>
              <View className="items-center justify-center w-10 h-10 bg-white rounded-full">
                <Image
                  source={icons.backArrow}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </View>
            </TouchableOpacity>
            <Text className="ml-5 text-xl font-JakartaSemiBold">
              {title || "Go Back"}
            </Text>
          </View>
          <Maps />
        </View>
        <BottomSheet
          keyboardBehavior="extend"
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["50%", "80%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
