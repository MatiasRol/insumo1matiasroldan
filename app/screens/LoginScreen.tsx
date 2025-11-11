import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      <Text className="text-3xl font-bold text-center mb-6 text-blue-600">
        Iniciar Sesión
      </Text>

      <View className="mt-10 items-center">
        <Text className="text-gray-600 mb-2">Pantalla de Login</Text>
        <Pressable
          className="bg-blue-500 px-6 py-3 rounded-xl mt-4"
          onPress={() => router.push("/screens/RegisterScreen")}
        >
          <Text className="text-white font-semibold">Ir a Registro</Text>
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
