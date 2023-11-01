import axios from 'axios';
import { useEffect, useState } from 'react';
import { View, FlatList, ScrollView, Image, Text } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const Shorts = () => {

    const [data, setData] = useState({});
    const [genres, setGenres] = useState({});
    const bearer_api = process.env.EXPO_PUBLIC_AUTHORIZATION;

    const call = (url_api, search = false) => {
        const options = {
            method: 'GET',
            url: url_api, 
            headers: {
                accept: 'application/json',
                Authorization: bearer_api
            }
        };

        if (!search) {
            try {
                axios.request(options)
                    .then((response) => {
                        const generos = response.data.genres.map((genre) => {
                            return {value: genre.name, key: genre.id};
                        });
                        setGenres(generos);
                    })
                    .catch(err => console.error(err));
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                axios.request(options)
                .then((response) => {
                    const filtered = response.data.results.filter((item) => {
                        return item.genre_ids.includes(search);
                    });
                    const results = filtered.map((item) => {
                        var data = item;
                        data.url_image = 'https://image.tmdb.org/t/p/w500/'+item.poster_path;
                        return data;
                    });
                    setData(results);
                });
            } catch (error) {
                console.error(error);
            }
        }
        
    }

    useEffect(() => {
        call('https://api.themoviedb.org/3/genre/movie/list?language=en');
    }, []);
        
      
    const Item = ({title, url_image}) => (
      <View style={{ marginTop: 30 }}>
        <Image source={{uri: url_image}} style={{ width: 200, height: 200 }} />
        <Text style={{ fontSize: 20 }}>{title}</Text>
      </View>
    );

    return (
        <ScrollView contentContainerStyle={{ flex: 1, justifyContent: "center", shadowColor: 'grey', marginTop: 20, shadowOffset: 30}}>
            <SelectList 
                setSelected={(key) => call('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', key)}
                data={genres} 
                save="key"
            />
            <FlatList data={data} 
                style={{ width: "75%"}}
                renderItem={
                  ({item}) => <Item url_image={item.url_image} title={item.title} />
                  } />
        </ScrollView>
    );
}

export default Shorts;