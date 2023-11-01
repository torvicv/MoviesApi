import axios from 'axios';
import { useEffect, useState } from 'react';
import { ScrollView, FlatList, View, Text, Image } from 'react-native';

export default function Movies() {

    const [data, setData] = useState({});

    const options = {
        method: 'GET',
        url: 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',
        headers: {
            accept: 'application/json',
            Authorization: process.env.EXPO_PUBLIC_AUTHORIZATION
        }
      };
      
      try {
          axios.request(options)
            .then((response) => {
                const results = response.data.results.map((item) => {
                  var data = item;
                  data.url_image = 'https://image.tmdb.org/t/p/w500/'+item.poster_path;
                  return data;
                });
                setData(results);
            });
      } catch (error) {
          console.error(error);
      }

      const Item = ({title, url_image}) => (
        <View>
          <Image source={{uri: url_image}} style={{ width: 200, height: 200 }} />
          <Text style={{ fontSize: 20 }}>{title}</Text>
        </View>
      );

    return (
        <ScrollView>
            <FlatList data={data} 
                renderItem={
                  ({item}) => <Item url_image={item.url_image} title={item.title} />
                  } />
        </ScrollView>
    );
}