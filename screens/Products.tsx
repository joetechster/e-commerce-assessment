import { ListRenderItem, FlatList, Text, View } from 'react-native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'components/Header';
import { ProductType } from 'utils/type';
import SortFilter from 'components/SortFilter';
import SelectCategory from 'components/SelectCategory';
import SearchInput from 'components/SearchInput';
import ProductCard, { ProductCardLoading } from 'components/ProductCard';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function Products() {
  const category = useSelector((state: RootState) => state.product.category);
  const sortBy = useSelector((state: RootState) => state.product.sortBy);
  const search = useSelector((state: RootState) => state.product.search);
  const order = useSelector((state: RootState) => state.product.order);
  const minPrice = useSelector((state: RootState) => state.product.minPrice);
  const maxPrice = useSelector((state: RootState) => state.product.maxPrice);
  const [products, setProducts] = useState<ProductType[]>([]);
  const [perPage, setPerPage] = useState(12);
  const [page, setPage] = useState(0);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [hasMoreProducts, setHasMoreProducts] = useState(true);

  useEffect(() => {
    const getProducts = async () => {
      setProducts([]);
      setLoadingProducts(true);
      const prepend = `limit=${perPage}&sortBy=${sortBy}&order=${order}`;
      let url;
      if (search !== '' && search?.length && search.length > 2) {
        url = `https://dummyjson.com/products/search?q=${search}&${prepend}`;
      } else {
        url = `https://dummyjson.com/products/category/${category}?${prepend}`;
      }
      const response = await fetch(url).then((res) => res.json());
      setProducts(response.products);
      setHasMoreProducts(response.skip + response.limit < response.total);
      setPage(0);
      setLoadingProducts(false);
    };
    getProducts();
  }, [category, search, sortBy, order]);

  const fetchMoreProducts = async () => {
    if (loadingProducts || !hasMoreProducts) return;
    setLoadingProducts(true);
    const prepend = `limit=${perPage}&skip=${(page + 1) * perPage}&sortBy=${sortBy}&order=${order}`;
    let url;
    if (search !== '' && search?.length && search.length > 2) {
      url = `https://dummyjson.com/products/search?q=${search}&${prepend}`;
    } else {
      url = `https://dummyjson.com/products/category/${category}?${prepend}`;
    }
    const response = await fetch(url).then((res) => res.json());
    setProducts((previousProducts) => [...previousProducts, ...response.products]);
    setHasMoreProducts(response.skip + response.limit < response.total);
    setPage((previousPage) => previousPage + 1);
    setLoadingProducts(false);
  };

  const renderProduct: ListRenderItem<ProductType> = useCallback(
    ({ item }) => <ProductCard product={item} />,
    []
  );
  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) => product.price >= parseInt(minPrice) && product.price <= parseInt(maxPrice)
    );
  }, [products, minPrice, maxPrice]);

  return (
    <SafeAreaView className="flex-1">
      <Header name="Products" />
      <SearchInput />
      <SelectCategory />
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString() + item.title}
        onEndReached={fetchMoreProducts}
        onEndReachedThreshold={1}
        ListFooterComponent={
          <>
            {!hasMoreProducts && filteredProducts.length > 0 ? (
              <Text className="rounded  bg-white py-6 pb-32 text-center font-poppinsSemiBold text-black">
                No more products
              </Text>
            ) : (
              loadingProducts && <ProductsLoading />
            )}
          </>
        }
        ListEmptyComponent={
          !loadingProducts ? (
            <View className="flex-1 items-center justify-center">
              <Text className="font-poppinsSemiBold">Couldn't find any product</Text>
              <Text className="font-poppinsRegular text-sm">
                Try changing your search / filter options
              </Text>
            </View>
          ) : null
        }
        numColumns={2}
        columnWrapperClassName="gap-2 mb-2"
        className="flex-1 px-2"
        contentContainerClassName="grow"
        ListFooterComponentClassName="mt-auto"
      />
      <SortFilter />
    </SafeAreaView>
  );
}

const ProductsLoading = () => {
  return (
    <FlatList
      data={[1, 2, 3, 4, 5, 6]}
      renderItem={() => <ProductCardLoading />}
      keyExtractor={(item) => item.toString()}
      numColumns={2}
      columnWrapperClassName="gap-2 mb-2"
      className="flex-1 px-2"
    />
  );
};
