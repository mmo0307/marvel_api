import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';

import useMarvelService from '../../../services/MarvelService';
import Spinner from '../../spinner/Spinner';
import ErrorMessage from '../../errorMessage/ErrorMessage';
import Skeleton from '../../skeleton/Skeleton'

import './singleComicPage.scss';

const SingleComicPage = (props) => {
    const {comicId} = useParams();
    const [comics, setComics] = useState(null);
    const {loading, error, getComics, clearError} = useMarvelService();

    useEffect(() => {
        updateComics();
    }, [comicId]);

    const updateComics = () => {
        if (!comicId) {
            return;
        }
        clearError();
        getComics(comicId)
            .then(onComicLoaded);
    }

    const onComicLoaded = (comics) => {
        setComics(comics);
    }

    const skeleton = comics || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comics) ? <View comics={comics}/> : null;

    return (
        <>
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </>
    )


}

const View = ({comics}) => {
    const {title, description, thumbnail, prices, id, urls, pageCount} = comics;

    return (
        <div className="single-comic" data-id={id}>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount + 'pages'}</p>
                <p className="single-comic__descr">Language: en-us</p>
                <div className="single-comic__price">{prices + '$'}</div>
                <a className="single-comic__link" href={urls}>Info</a>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
    
}

export default SingleComicPage;