import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Dashboard from './pages/Dashboard/Dashboard';
import Movies from './pages/Movies/Movies';
import MovieDetail from './pages/MovieDetail/MovieDetail';
import styles from './App.module.scss'
import Search from "./pages/Search/Search";

function App() {
  return (
      <BrowserRouter>
        <div className={styles.container}>
          <Header></Header>
          <main>
            <Routes>
              <Route path='/' element={<Dashboard/>} />
              <Route path="/detail/:id" element={<MovieDetail />} />
              <Route path="/upcoming-movies/" element={<Movies category='upcoming' />} />
              <Route path="/popular-movies/" element={<Movies category='popular' />} />
              <Route path="/top-rated-movies/" element={<Movies category='rated' />} />
              <Route path="/search/" element={<Search />} />
            </Routes>
          </main>
          <Footer></Footer>
        </div>
      </BrowserRouter>
  );
}

export default App;