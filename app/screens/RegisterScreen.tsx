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

/**
 * 🧾 Pantalla de Registro
 * Valida nombre, correo, contraseña y confirmación usando Zod.
 */
export default function RegisterScreen() {
  const router = useRouter();

  // Estados de los campos
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Estado de errores
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  // Función de envío del formulario
  const handleSubmit = () => {
    try {
      // Limpia errores previos
      setErrors({});

      // Valida cada campo con los esquemas de Zod
      nameSchema.parse(name);
      emailSchema.parse(email);
      passwordSchema.parse(password);

      // Confirmación de contraseña dinámica
      const confirmSchema = createConfirmPasswordSchema(password);
      confirmSchema.parse(confirmPassword);

      // Si todo es correcto:
      Alert.alert("✅ Registro exitoso", `Bienvenido, ${name}`);
      // Aquí podrías guardar datos en Firebase o redirigir:
      // router.push("/screens/LoginScreen");

    } catch (err: any) {
      // Recolecta los mensajes de error de Zod
      const newErrors: any = {};
      if (err.errors) {
        err.errors.forEach((e: any) => {
          const field = e.path?.[0] || "form";
          newErrors[field] = e.message;
        });
      } else {
        // Si fue un solo error (por ejemplo, de confirmPassword)
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
      >
        <View className="p-6">
          <Text className="text-3xl font-bold text-center mb-8 text-green-600">
            Crear Cuenta
          </Text>

          {/* Campo Nombre */}
          <CustomInput
            label="Nombre completo"
            placeholder="Tu nombre"
            value={name}
            onChangeText={setName}
            error={errors.name}
          />

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

          {/* Campo Confirmar Contraseña */}
          <CustomInput
            label="Confirmar contraseña"
            placeholder="********"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            error={errors.confirmPassword}
          />

          {/* Botón de registro */}
          <View className="mt-6">
            <Button title="Registrarse" onPress={handleSubmit} />
          </View>

          {/* Ir a login */}
          <View className="mt-6 items-center">
            <Text
              className="text-green-500 underline"
              onPress={() => router.push("/screens/LoginScreen")}
            >
              ¿Ya tienes cuenta? Inicia sesión
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
