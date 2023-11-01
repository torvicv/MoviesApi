import axios from 'axios';
import { View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const Movies = async () => {

    const options = {
        method: 'GET',
        url: 'https://movies-app1.p.rapidapi.com/api/movies',
        headers: {
          'X-RapidAPI-Key': '1ecd5ecbe9msh0868147917f7022p1152f9jsn8234e9606adf',
          'X-RapidAPI-Host': 'movies-app1.p.rapidapi.com'
        }
      };
      
      try {
          const response = await axios.request(options);
          console.log(response.data);
      } catch (error) {
          console.error(error);
      }


    return (
        <View>
            <FlatList data={response.data} />
        </View>
    );
}