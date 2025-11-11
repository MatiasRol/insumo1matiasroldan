import React from "react";
import { Text, TextInput, View } from "react-native";

/**
 * CustomInput - Componente reutilizable para formularios.
 * 
 * Props:
 * - label (opcional): texto arriba del campo.
 * - placeholder: texto guía dentro del input.
 * - value: valor actual del campo.
 * - onChangeText: función para actualizar el valor.
 * - secureTextEntry (opcional): para contraseñas.
 * - error (opcional): mensaje de error a mostrar en rojo.
 */

type CustomInputProps = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  error?: string | null;
};

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error = null,
}: CustomInputProps) {
  return (
    <View className="mb-4 w-full">
      {/* Etiqueta opcional */}
      {label && (
        <Text className="text-gray-700 text-base mb-1 font-semibold">
          {label}
        </Text>
      )}

      {/* Campo de texto */}
      <TextInput
        className={`border px-3 py-2 rounded-lg text-base bg-white ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#9ca3af"
      />

      {/* Mensaje de error */}
      {error ? (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      ) : null}
    </View>
  );
}
