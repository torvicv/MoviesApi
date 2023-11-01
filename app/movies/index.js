import axios from 'axios';
import { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, View, Text } from 'react-native';

export default function Movies() {

    const [data, setData] = useState({});

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDg1Yzg1NmQ3NjM0ZGRiNDljYjA4NTU2NGQ5NTZlNiIsInN1YiI6IjY1NDIzMTY3NmJlYWVhMDEwYjMwZTBiOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ss_RfwsHoYaSei6K9n8zTQgNjmBvQzEQKMWPLstq6Rc'
        }
      };
      
      try {
          axios.request(options)
            .then((response) => {
                console.log(JSON.stringify(response.data.results));
                setData(response.data.results);
            });
      } catch (error) {
          console.error(error);
      }

      const Item = ({title}) => (
        <View>
          <Text>{title}</Text>
        </View>
      );

    return (
        <SafeAreaView>
            <FlatList data={data} 
                renderItem={({item}) => <Item title={item.title} />} />
        </SafeAreaView>
    );
}