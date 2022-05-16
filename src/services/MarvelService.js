import {useHttp} from '../hooks/http.hook';

const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=267dca8be28896e0176d799adb1c9c7d'; //267dca8be28896e0176d799adb1c9c7d
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res =  await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    }

    const getComics = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComics(res.data.results[0]);
    }

    const _transformComics = (res) => {
        return{
            id: res.id,
            title: res.title,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            prices: res.prices[0].price,
            urls: res.urls[0].url,
            pageCount: res.pageCount,
        }
    }

    const _transformCharacter = (res) => {
        return{
            id: res.id,
            name: res.name,
            description: res.description,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homepage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }

    return {loading, error, getAllCharacters, getCharacter, getAllComics, getComics, clearError};
}

export default useMarvelService;