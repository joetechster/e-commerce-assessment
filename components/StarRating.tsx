import { FontAwesome } from '@expo/vector-icons';
import { View } from 'react-native';

export default function StarRating({ rating }: { rating: number }) {
  return (
    <View className="flex-row space-x-1">
      {[...Array(5)].map((_, i) => {
        let iconName: 'star' | 'star-half-o' | 'star-o' = 'star-o';

        if (i < Math.floor(rating)) {
          iconName = 'star';
        } else if (i < rating) {
          iconName = 'star-half-o';
        }

        return <FontAwesome key={i} name={iconName} size={16} color="#facc15" />;
      })}
    </View>
  );
}
