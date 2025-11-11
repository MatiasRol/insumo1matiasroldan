import CustomInput from "@/components/CustomInput";
import {
  createConfirmPasswordSchema,
  emailSchema,
  nameSchema,
  passwordSchema,
} from "@/lib/schemas/authSchemas";
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

export default function RegisterScreen() {
  const router: any = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<any>({});

  const handleSubmit = () => {
    try {
      setErrors({});
      nameSchema.parse(name);
      emailSchema.parse(email);
      passwordSchema.parse(password);
      createConfirmPasswordSchema(password).parse(confirmPassword);

      Alert.alert("✅ Registro exitoso", `Bienvenido ${name}`);
      router.push("/screens/LoginScreen");
    } catch (err: any) {
      const newErrors: any = {};
      if (err.errors) {
        err.errors.forEach((e: any) => {
          newErrors[e.path[0]] = e.message;
        });
      } else if (err.message) {
        newErrors.confirmPassword = err.message;
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
      >
        <View className="flex-1 justify-center px-6">
          <Text className="text-3xl font-bold text-center mb-8 text-green-600">
            Crear Cuenta
          </Text>

          <CustomInput
            label="Nombre completo"
            placeholder="Tu nombre"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

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

          <CustomInput
            label="Confirmar contraseña"
            placeholder="********"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={errors.confirmPassword}
          />

          <Pressable
            className="bg-green-600 py-4 rounded-2xl mt-6"
            onPress={handleSubmit}
          >
            <Text className="text-white text-center text-lg font-semibold">
              Registrarse
            </Text>
          </Pressable>

          <Pressable
            className="mt-6"
            onPress={() => router.push("/screens/LoginScreen")}
          >
            <Text className="text-center text-green-500">
              ¿Ya tienes cuenta? Inicia sesión
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
