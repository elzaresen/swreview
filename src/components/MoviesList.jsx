import PropTypes from 'prop-types';
import {Menu} from "antd";
import {memo} from "react";

const MoviesList = memo((props) => {
    const {selectedMovie, selectMovie, movies} = props;

    return (
        <Menu mode="inline" defaultSelectedKeys={[selectedMovie]}>
            {movies.map(movie =>
                <Menu.Item key={movie.url} onClick={() => selectMovie('' + movie.url)}>
                    {movie.title}
                </Menu.Item>
            )}
        </Menu>
    )
})

MoviesList.propTypes = {
    selectedMovie: PropTypes.string.isRequired,
    selectMovie: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired
}

export default MoviesList