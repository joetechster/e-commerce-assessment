import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Pressable,
  ToastAndroid,
} from 'react-native';
import { IconSymbol } from './IconSymbol';
import { ReactNode, useContext, useEffect, useRef, useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { SortBy } from 'utils/type';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store';
import { productActions } from 'store/slices/productSlice';

export default function SortFilter() {
  const modalVisible = useSelector((state: RootState) => state.product.modalVisible);
  const dispatch = useDispatch();
  const modalRef = useRef<ReactNode>(<></>);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    if (modalVisible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withTiming(0, { duration: 300 });
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      translateY.value = withTiming(50, { duration: 200 });
    }
  }, [modalVisible]);

  return (
    <>
      <View
        className="absolute bottom-8 left-[50%]  w-[200px] flex-row justify-center rounded-full bg-gray-800 py-4"
        style={{ transform: [{ translateX: -100 }] }}>
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-2 border-r border-gray-600"
          onPress={() => {
            modalRef.current = <SortByModal />;
            dispatch(productActions.toggleModal());
          }}>
          <IconSymbol name="arrow.up.arrow.down.circle.fill" color="white" size={24} />
          <Text className="font-poppinsSemiBold text-white">Sort</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-1 flex-row items-center justify-center gap-2"
          onPress={() => {
            modalRef.current = <FilterModal />;
            dispatch(productActions.toggleModal());
          }}>
          <Text className="font-poppinsSemiBold text-white">Filter</Text>
          <IconSymbol name="line.3.horizontal.decrease.circle.fill" color="white" size={24} />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="none"
        transparent
        visible={modalVisible}
        onRequestClose={() => dispatch(productActions.toggleModal())}>
        <View className="flex-1 justify-end bg-black/30">
          <Pressable
            onPress={() => dispatch(productActions.toggleModal())}
            className="min-h-36 grow"
          />
          <Animated.View style={animatedStyle} className=" shrink rounded-t-2xl bg-white">
            {modalRef.current}
          </Animated.View>
        </View>
      </Modal>
    </>
  );
}

const SortByModal = () => {
  const sortBy = useSelector((state: RootState) => state.product.sortBy);
  const order = useSelector((state: RootState) => state.product.order);
  const dispatch = useDispatch();
  const sortOptions: SortBy[] = ['title', 'price', 'rating'];

  return (
    <FlatList
      data={sortOptions}
      keyExtractor={(item) => item}
      ListHeaderComponent={() => (
        <View className="flex-row justify-between p-4 pb-2">
          <Text className="font-poppinsBold text-lg">Sort</Text>

          <TouchableOpacity
            className="flex-row items-center gap-2 rounded bg-gray-50 p-2"
            onPress={() =>
              order === 'asc'
                ? dispatch(productActions.setOrder('desc'))
                : dispatch(productActions.setOrder('asc'))
            }>
            <Text className="font-poppinsRegular">
              {order === 'asc' ? 'Ascending' : 'Descending'}
            </Text>
            <IconSymbol
              color="black"
              size={20}
              name={order === 'asc' ? 'arrow.up' : 'arrow.down'}
            />
          </TouchableOpacity>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="py- flex-row justify-between p-4"
          onPress={() => dispatch(productActions.setSortBy(item))}>
          <Text
            className={`capitalize ${sortBy === item ? 'font-poppinsBold' : 'font-poppinsRegular'}`}>
            {item}
          </Text>
          {sortBy === item ? (
            <IconSymbol name="largecircle.fill.circle" color="#facc15" />
          ) : (
            <IconSymbol name="circle" color="#facc15" />
          )}
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View className="w-full border-t border-gray-100" />}
    />
  );
};

const FilterModal = () => {
  const category = useSelector((state: RootState) => state.product.category);
  const categories = useSelector((state: RootState) => state.product.categories);
  const dispatch = useDispatch();
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.slug}
      ListHeaderComponent={() => (
        <>
          <View className="flex-row justify-between p-4 pb-2">
            <Text className="font-poppinsBold text-lg">Filter</Text>
          </View>
          <PriceRange />
        </>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          className="py- flex-row justify-between p-4"
          onPress={() => {
            dispatch(productActions.setCategory(item.slug));
            dispatch(productActions.toggleModal());
            ToastAndroid.show('Products filtered', ToastAndroid.SHORT);
          }}>
          <Text
            className={`capitalize ${category === item.slug ? 'font-poppinsBold' : 'font-poppinsRegular'}`}>
            {item.name}
          </Text>
          {category === item.slug ? (
            <IconSymbol name="largecircle.fill.circle" color="#facc15" />
          ) : (
            <IconSymbol name="circle" color="#facc15" />
          )}
        </TouchableOpacity>
      )}
      ItemSeparatorComponent={() => <View className="w-full border-t border-gray-100" />}
    />
  );
};

const PriceRange = () => {
  const _minPrice = useSelector((state: RootState) => state.product.minPrice);
  const _maxPrice = useSelector((state: RootState) => state.product.maxPrice);
  const [minPrice, setMinPrice] = useState(_minPrice);
  const [maxPrice, setMaxPrice] = useState(_maxPrice);
  const dispatch = useDispatch();

  const applyPrice = () => {
    dispatch(productActions.setMinPrice(minPrice));
    dispatch(productActions.setMaxPrice(maxPrice));
    dispatch(productActions.toggleModal());
    ToastAndroid.show('Products filtered', ToastAndroid.SHORT);
  };

  return (
    <View className="p-4  pb-0">
      <Text className="font-poppinsSemiBold">Choose Price Range</Text>
      <View className="mb-4 flex-row gap-2">
        <TextInput
          className="flex-1 rounded border border-gray-300 p-2"
          keyboardType="numeric"
          placeholder="Min Price"
          value={minPrice}
          onChangeText={(value) => setMinPrice(value ? parseInt(value).toString() : '0')}
        />
        <TextInput
          className="flex-1 rounded border border-gray-300 p-2"
          keyboardType="numeric"
          placeholder="Max Price"
          value={maxPrice}
          onChangeText={(value) => setMaxPrice(value ? parseInt(value).toString() : '0')}
        />
      </View>
      <TouchableOpacity
        onPress={applyPrice}
        className="mb-4 items-center rounded bg-orange-600 p-2">
        <Text className="font-poppinsSemiBold text-white">Apply Price Filter</Text>
      </TouchableOpacity>
      <Text className="pb-6 pt-2 font-semibold">Select Category</Text>
    </View>
  );
};
