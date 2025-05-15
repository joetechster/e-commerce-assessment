import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ProductType } from 'utils/type';
import StarRating from './StarRating';
import React from 'react';
import { useDispatch } from 'react-redux';
import { productActions } from 'store/slices/productSlice';

const ProductCard = ({ product }: { product: ProductType }) => (
  <TouchableOpacity className="max-w-[49%] flex-1 gap-2 overflow-hidden rounded-lg bg-white">
    <Image
      source={{ uri: product.thumbnail }}
      resizeMode="cover"
      className="w-full flex-1 "
      height={144}
    />
    <View className="gap-1 p-2">
      <Text className="font-poppinsRegular">{product.title}</Text>
      <Text className="font-poppinsSemiBold text-lg">
        {formatCurrency(product.price)}
        {'  '}
        <Text className="font-poppinsRegular text-sm text-gray-500 line-through">
          {formatCurrency(product.price + product.price * 0.3)}
        </Text>
      </Text>
      <View className="flex-row gap-2">
        <StarRating rating={product.rating / 2} />
        <Text className="ml-2 text-xs text-gray-500">({(product.rating / 2).toFixed(2)} )</Text>
      </View>
    </View>
    <View className="p-2">
      <AddToCart />
    </View>
  </TouchableOpacity>
);

export default ProductCard;

const AddToCart = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      onPress={() => dispatch(productActions.incrementCart())}
      className="w-full items-center justify-center  rounded bg-orange-500 p-2">
      <Text className=" font-semibold text-white">Add to Cart</Text>
    </TouchableOpacity>
  );
};
export const ProductCardLoading = React.memo(() => {
  return (
    <View className="flex-1 gap-2 overflow-hidden rounded-lg bg-white">
      <View className="h-36 w-full bg-gray-200" />
      <View className="gap-1 p-3">
        <View className="h-6 w-4/5 rounded bg-gray-200" />
        <View className="h-9 w-2/3 rounded bg-gray-200" />
        <View className="h-5 w-3/4 rounded bg-gray-200" />
      </View>
      <View className="p-2">
        <View className="h-9 w-full items-center justify-center rounded bg-gray-200" />
      </View>
    </View>
  );
});

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount);
