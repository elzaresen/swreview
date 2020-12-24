import { useState, useEffect } from 'react';
import { Col, Layout, message, Result, Row } from 'antd';
import MoviesList from './components/MoviesList';
import { LoadingOutlined } from '@ant-design/icons';
import MovieCard from './components/MovieCard';
import { getMoviesList, getMovie } from './api/movies';

const { Content, Sider } = Layout;

const App = () => {
	const [selectedMovie, selectMovie] = useState('');
	const [movies, setMovies] = useState([]);
	const [movie, setMovie] = useState({});
	const [initializing, setInitializing] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		selectedMovie && loadMovie(selectedMovie).then(res => setMovie(res));
	}, [selectedMovie]);

	useEffect(() => {
		loadMoviesList();
	}, []);

	const loadMoviesList = () => {
		setInitializing(true);
		getMoviesList()
			.then(res =>
				setMovies(res)
			)
			.catch(error =>
				message.error(error.message)
			)
			.finally(() =>
				setInitializing(false)
			);
	};

	const loadMovie = async (movieUrl) => {
		setLoading(true);
		getMovie(movieUrl)
			.then(res =>
				setMovie(res)
			)
			.catch(error =>
				message.error(error.message)
			)
			.finally(() =>
				setLoading(false)
			);
	};

	return (
		initializing
			? <Result
				icon={ <LoadingOutlined/> }
				title='Initializing App'
			/> :
			<Layout style={ { minHeight: '100vh', backgroundColor: '#b3b3b3' } }>
				<Sider className='sider'>
					<MoviesList
						loading={ loading }
						movies={ movies }
						selectedMovie={ selectedMovie }
						selectMovie={ selectMovie }
					/>
				</Sider>
				<Content style={ { padding: 16 } }>
					{
						loading
							? <LoadingOutlined/>
							: <Row gutter={ [16, 16] }>
								<Col xs={ 24 } sm={ 24 } md={ 12 } lg={ 12 } xxl={ 6 }>
									{ movie.title && <MovieCard data={ movie }/> }
								</Col>
							</Row>
					}
				</Content>
			</Layout>
	);
};

export default App;
