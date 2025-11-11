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
import CustomInput from "@/components/CustomInput";
import {
  nameSchema,
  emailSchema,
  passwordSchema,
  createConfirmPasswordSchema,
} from "@/lib/schemas/authSchemas";

export default function RegisterScreen() {
  const router: any = useRouter(); // ✅ corregido

  // ✅ define tipo de errores
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    try {
      setErrors({});

      nameSchema.parse(name);
      emailSchema.parse(email);
      passwordSchema.parse(password);
      createConfirmPasswordSchema(password).parse(confirmPassword);

      Alert.alert("✅ Registro exitoso", `Bienvenido, ${name}`);
      // router.push("/screens/LoginScreen");
    } catch (err: any) {
      const newErrors: Record<string, string> = {};
      if (err.errors) {
        err.errors.forEach((e: any) => {
          const field = e.path?.[0] || "form";
          if (field) newErrors[field] = e.message;
        });
      } else if (err.message) {
        newErrors.confirmPassword = err.message;
      }
      setErrors(newErrors);
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
          <Text className="text-3xl font-bold text-center mb-8 text-green-600">
            Crear Cuenta
          </Text>

          <CustomInput
            label="Nombre completo"
            placeholder="Tu nombre"
            value={name}
            onChangeText={setName}
            error={errors.name || ""}
          />

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

          <CustomInput
            label="Confirmar contraseña"
            placeholder="********"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword || ""}
          />

          <View className="mt-6">
            <Button title="Registrarse" onPress={handleSubmit} />
          </View>

          <View className="mt-6 items-center">
            <Text
              className="text-green-500 underline"
              onPress={() => router.push("/screens/LoginScreen")}
            >
              ¿Ya tienes cuenta? Inicia sesión
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
