import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-50">
      <Text className="text-3xl font-bold text-gray-800 mb-10">
        Bienvenido 👋
      </Text>

      <Pressable
        className="bg-blue-500 px-6 py-3 rounded-xl mb-4"
        onPress={() => router.push("/screens/LoginScreen")}
      >
        <Text className="text-white text-lg font-semibold">Iniciar Sesión</Text>
      </Pressable>

      <Pressable
        className="bg-green-500 px-6 py-3 rounded-xl"
        onPress={() => router.push("/screens/RegisterScreen")}
      >
        <Text className="text-white text-lg font-semibold">Registrarse</Text>
      </Pressable>
    </View>
  );
}
