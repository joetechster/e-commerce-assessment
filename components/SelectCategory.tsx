import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import React, { useCallback, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { CategoryType } from 'utils/type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { productActions } from 'store/slices/productSlice';
import { ListRenderItem } from 'react-native';

export default function SelectCategory() {
  const category = useSelector((state: RootState) => state.product.category);
  const categories = useSelector((state: RootState) => state.product.categories);
  const search = useSelector((state: RootState) => state.product.search);
  const dispatch = useDispatch();
  const [loadingCategories, setLoadingCategories] = useState(false);

  useLayoutEffect(() => {
    const getProductsCategories = async () => {
      setLoadingCategories(true);
      const response = await fetch('https://dummyjson.com/products/categories').then((res) =>
        res.json()
      );
      dispatch(productActions.setCategories(response));
      setLoadingCategories(false);
    };
    getProductsCategories();
  }, []);

  const changeCategory = (slug: string) => {
    dispatch(productActions.setCategory(slug));
  };

  const renderItem: ListRenderItem<CategoryType> = useCallback(
    ({ item }) => (
      <TouchableOpacity className="rounded bg-white p-2" onPress={() => changeCategory(item.slug)}>
        <Text className={`${item.slug === category ? 'font-poppinsBold' : 'font-poppinsRegular'}`}>
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [category]
  );

  return (
    <FlatList
      data={search ? [] : categories}
      keyExtractor={(category) => category.slug}
      renderItem={renderItem}
      horizontal={true}
      contentContainerClassName="gap-2"
      ListFooterComponent={<>{loadingCategories && <SelectCategoryLoading />}</>}
      className="m-2 flex-initial"
    />
  );
}
const SelectCategoryLoading = () => {
  return (
    <View className="flex-row gap-2 px-2">
      <View className="h-11 w-28 rounded bg-gray-200 p-3"></View>
      <View className="h-11 w-28 rounded bg-gray-200 p-3"></View>
      <View className="h-11 w-28 rounded bg-gray-200 p-3"></View>
      <View className="h-11 w-28 rounded bg-gray-200 p-3"></View>
    </View>
  );
};
