import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function Index() {
  const router: any = useRouter();

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 px-6">
      <Text className="text-3xl font-bold text-gray-800 mb-10">
        Bienvenido 👋
      </Text>

      <Pressable
        className="w-full bg-blue-600 py-4 rounded-2xl mb-4"
        onPress={() => router.push("/screens/LoginScreen")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Iniciar Sesión
        </Text>
      </Pressable>

      <Pressable
        className="w-full bg-green-600 py-4 rounded-2xl"
        onPress={() => router.push("/screens/RegisterScreen")}
      >
        <Text className="text-white text-center text-lg font-semibold">
          Registrarse
        </Text>
      </Pressable>
    </View>
  );
}
