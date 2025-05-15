import { View } from 'react-native';
import { useEffect, useState } from 'react';
import InputField from './InputField';
import { IconSymbol } from './IconSymbol';
import { useDispatch } from 'react-redux';
import { productActions } from 'store/slices/productSlice';

export default function SearchInput() {
  const [search, setSearch] = useState<string>('');
  const dispatch = useDispatch();

  useEffect(() => {
    const handler = setTimeout(() => {
      dispatch(productActions.setSearch(search));
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [search, dispatch]);

  return (
    <InputField
      value={search}
      onChangeText={setSearch}
      placeholder="Search for a product..."
      containerClassName="bg-white overflow-hidden mx-2 mt-2 rounded-full flex-row gap-2 items-center"
      className="flex-1 pl-12"
      Icon={
        <View className="absolute left-3">
          <IconSymbol color="gray" size={24} name="magnifyingglass" />
        </View>
      }
    />
  );
}
