import React from "react";
import { View, Text, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-6 text-green-600">
        Registro
      </Text>

      <View className="mt-10 items-center">
        <Text className="text-gray-600 mb-2">Pantalla de Registro</Text>
        <Pressable
          className="bg-green-500 px-6 py-3 rounded-xl mt-4"
          onPress={() => router.push("/screens/LoginScreen")}
        >
          <Text className="text-white font-semibold">Ir a Login</Text>
        </Pressable>
      </View>

      <Pressable
        className="mt-10 items-center"
        onPress={() => router.push("/")}
      >
        <Text className="text-gray-500 underline">Volver al inicio</Text>
      </Pressable>
    </View>
  );
}
