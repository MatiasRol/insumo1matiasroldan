import CustomInput from "@/components/CustomInput";
import { LoginSchema } from "@/lib/schemas/authSchemas";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from "react-native";

export default function LoginScreen() {
  const router: any = useRouter(); // ✅ corregido

  // ✅ define tipo de errores
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({
    email: "",
    password: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    try {
      setErrors({}); // limpia errores
      LoginSchema.parse({ email, password });

      Alert.alert("✅ Inicio de sesión exitoso", `Bienvenido de nuevo, ${email}`);
      // router.push("/pantallaPrincipal") // ejemplo
    } catch (err: any) {
      if (err.errors) {
        const newErrors: Record<string, string> = {};
        err.errors.forEach((e: any) => {
          const field = e.path?.[0];
          if (field) newErrors[field] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View className="p-6">
          <Text className="text-3xl font-bold text-center mb-8 text-blue-600">
            Iniciar Sesión
          </Text>

          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@mail.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email || ""}
          />

          <CustomInput
            label="Contraseña"
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password || ""}
          />

          <View className="mt-6">
            <Button title="Iniciar sesión" onPress={handleSubmit} />
          </View>

          <View className="mt-6 items-center">
            <Text
              className="text-blue-500 underline"
              onPress={() => router.push("/screens/RegisterScreen")}
            >
              ¿No tienes cuenta? Regístrate
            </Text>
          </View>

          <View className="mt-4 items-center">
            <Text
              className="text-gray-500 underline"
              onPress={() => router.push("/")}
            >
              Volver al inicio
            </Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
