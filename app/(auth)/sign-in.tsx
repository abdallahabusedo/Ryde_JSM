import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { Link } from "expo-router";
import { useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onSignInPress = () => {
    console.log("Sign Up");
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold bottom-5 left-5">
            Welcome 🌟
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={icons.email}
            value={form.email}
            onChangeText={(value: string) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            icon={icons.lock}
            value={form.password}
            secureTextEntry={true}
            onChangeText={(value: string) =>
              setForm({ ...form, password: value })
            }
          />

          <CustomButton
            title="Sign In"
            onPress={onSignInPress}
            className="mt-5"
          />

          <OAuth />
          <Link
            href="/(auth)/sign-up"
            className="flex flex-row items-center justify-center mt-3"
          >
            <View className="flex flex-row items-center justify-center gap-2">
              <Text>Don't have an account?</Text>
              <Text className="text-primary-500 font-JakartaSemiBold">
                Sign Up
              </Text>
            </View>
          </Link>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
