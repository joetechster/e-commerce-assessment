import { View, Text } from 'react-native';
import { IconSymbol } from './IconSymbol';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function Header({ name }: { name: string }) {
  const cartCount = useSelector((state: RootState) => state.product.cartCount);
  return (
    <View className="flex-row items-center justify-between p-2 pb-0">
      <Text className="font-poppinsBold text-xl">{name}</Text>
      <View className="rounded-full bg-white p-3 ">
        <IconSymbol color="black" size={20} name="cart.fill" />
      </View>
      <Text className="absolute bottom-0 right-2 aspect-square h-5 items-center justify-center rounded-full bg-red-700 text-center font-poppinsSemiBold text-sm text-white">
        {cartCount}
      </Text>
    </View>
  );
}
