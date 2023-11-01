import { View } from 'react-native';
import { Link } from 'expo-router';

export default function Page() {
  return (
    <View>
      <Link href="/movies">Movies</Link>

      <Link href="/movies/shorts">Shorts</Link>
    </View>
  );
}