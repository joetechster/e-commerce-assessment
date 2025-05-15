import { View, TextInput } from 'react-native';
import React from 'react';

interface InputFieldProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  containerClassName?: string;
  className?: string;
  Icon?: React.ReactNode;
  placeholder?: string;
}

export default function InputField({
  value,
  onChangeText,
  className,
  containerClassName,
  Icon,
  placeholder,
}: InputFieldProps) {
  return (
    <View className={containerClassName}>
      {Icon}
      <TextInput
        placeholder={placeholder}
        className={className}
        onChangeText={onChangeText}
        value={value}
      />
    </View>
  );
}
