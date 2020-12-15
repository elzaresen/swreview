import {Col, Layout, Result, Row} from "antd";
import MoviesList from "./components/MoviesList";
import {useState, useEffect} from "react";
import {LoadingOutlined} from '@ant-design/icons';
import MovieCard from "./components/MovieCard";

const {Content, Sider} = Layout;

const App = () => {
    const [selectedMovie, selectMovie] = useState('')
    const [movies, setMovies] = useState([])
    const [movie, setMovie] = useState({})
    const [initializing, setInitializing] = useState(true)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        selectedMovie && loadMovie(selectedMovie).then(res => setMovie(res))
    }, [selectedMovie])


    useEffect(() => {
        loadMoviesList().then(res => setMovies(res))
    }, [])

    const loadMoviesList = async () => {
        setInitializing(true)
        const response = await fetch('https://swapi.dev/api/films/')
        if (response.ok) {
            const data = await response.json();
            setInitializing(false)
            return data.results
        }
    }

    const loadMovie = async (movieUrl) => {
        setLoading(true)
        const response = await fetch(movieUrl)
        if (response.ok) {
            const data = await response.json();
            setLoading(false)
            return data
        }
    }

    return (
        initializing
            ? <Result
                icon={<LoadingOutlined/>}
                title="Initializing App"
            /> :
            <Layout style={{minHeight: '100vh', backgroundColor: '#b3b3b3'}}>
                <Sider>
                    <MoviesList
                        movies={movies}
                        selectedMovie={selectedMovie}
                        selectMovie={selectMovie}
                    />
                </Sider>
                <Content style={{padding: 16}}>
                    {
                        loading
                            ? <LoadingOutlined/>
                            : <Row gutter={[16, 16]}>
                                <Col xs={24} sm={24} md={12} lg={12} xxl={6}>
                                    {movie.title && <MovieCard data={movie}/>}
                                </Col>
                            </Row>
                    }
                </Content>
            </Layout>
    );
}

export default App;
