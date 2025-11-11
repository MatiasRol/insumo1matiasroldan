import React from "react";
import { Text, TextInput, View } from "react-native";

type Props = {
  label?: string;
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  error?: string;
};

export default function CustomInput({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  error,
}: Props) {
  return (
    <View className="mb-4">
      {label && <Text className="text-gray-700 mb-1">{label}</Text>}

      <TextInput
        className={`border px-4 py-3 rounded-2xl text-base bg-gray-50 ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#9ca3af"
      />

      {error ? (
        <Text className="text-red-500 text-sm mt-1">{error}</Text>
      ) : null}
    </View>
  );
}
