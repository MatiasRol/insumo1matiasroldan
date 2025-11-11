import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { LoginSchema } from "@/lib/schemas/authSchemas";
import CustomInput from "@/components/CustomInput";

/**
 * 🧠 Pantalla de Login
 * Validación con Zod, manejo de errores y simulación de inicio de sesión.
 */
export default function LoginScreen() {
  const router = useRouter();

  // Estados de los campos
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Estado de errores
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Función de envío
  const handleSubmit = () => {
    try {
      // Limpia errores previos
      setErrors({});

      // Valida con Zod
      LoginSchema.parse({ email, password });

      // Si todo pasa, muestra alerta de éxito
      Alert.alert("✅ Inicio de sesión exitoso", `Bienvenido de nuevo, ${email}`);
      // Aquí podrías redirigir a otra pantalla:
      // router.push("/(tabs)/home");

    } catch (err: any) {
      if (err.errors) {
        const newErrors: any = {};
        err.errors.forEach((e: any) => {
          const field = e.path?.[0];
          newErrors[field] = e.message;
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
      >
        <View className="p-6">
          <Text className="text-3xl font-bold text-center mb-8 text-blue-600">
            Iniciar Sesión
          </Text>

          {/* Campo Email */}
          <CustomInput
            label="Correo electrónico"
            placeholder="ejemplo@mail.com"
            value={email}
            onChangeText={setEmail}
            error={errors.email}
          />

          {/* Campo Contraseña */}
          <CustomInput
            label="Contraseña"
            placeholder="********"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            error={errors.password}
          />

          {/* Botón */}
          <View className="mt-6">
            <Button title="Iniciar sesión" onPress={handleSubmit} />
          </View>

          {/* Navegación a registro */}
          <View className="mt-6 items-center">
            <Text
              className="text-blue-500 underline"
              onPress={() => router.push("/screens/RegisterScreen")}
            >
              ¿No tienes cuenta? Regístrate
            </Text>
          </View>

          {/* Volver al inicio */}
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
