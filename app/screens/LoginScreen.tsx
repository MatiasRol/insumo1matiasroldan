import CustomInput from "@/components/CustomInput";
import { LoginSchema } from "@/lib/schemas/authSchemas";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function LoginScreen() {
  const router: any = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const handleSubmit = () => {
    try {
      setErrors({});
      LoginSchema.parse({ email, password });
      Alert.alert("✅ Inicio de sesión exitoso", `Bienvenido ${email}`);
    } catch (err: any) {
      const newErrors: any = {};
      if (err.errors) {
        err.errors.forEach((e: any) => {
          newErrors[e.path[0]] = e.message;
        });
      }
      setErrors(newErrors);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1 justify-center px-6">
          <Text className="text-3xl font-bold text-center mb-8 text-blue-600">
            Iniciar Sesión
          </Text>

          <CustomInput
            label="Correo electrónico"
            placeholder="usuario@email.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          <CustomInput
            label="Contraseña"
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            error={errors.password}
          />

          <Pressable
            className="bg-blue-600 py-4 rounded-2xl mt-6"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Entrar
            </Text>
          </Pressable>

          <Pressable
            className="mt-6"
            onPress={() => router.push("/screens/RegisterScreen")}
          >
            <Text className="text-center text-blue-500">
              ¿No tienes cuenta? Regístrate
            </Text>
          </Pressable>

          <Pressable
            className="mt-3"
            onPress={() => router.push("/")}
          >
            <Text className="text-center text-gray-400">Volver al inicio</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
