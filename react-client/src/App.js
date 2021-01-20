import './App.css';
import { Route, Switch } from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './config/graphql'
import HomePage from './page/Home-page'
import MoviesPage from './page/Movies-page'
import TvSeriesPage from './page/TvSeries-page'
import AddMoviePage from './page/Add-Movie-page'
import Favorites from './page/favorites-page'
import EditMoviePage from './page/Edit-Movie-page'
import AddTvSeriesPage from './page/Add-TvSeries-page'
import FavoriteTvSeries from './page/favorites-TvSeries-page'
import EditTvSeriesPage from './page/Edit-TvSeries-page'

function App() {
  return (
    <ApolloProvider client={ client }>
      <Switch>
        <Route path="/tvseries/edit">
          <EditTvSeriesPage/>
        </Route>
        <Route path="/movies/edit">
          <EditMoviePage/>
        </Route>
        <Route path="/tvseries/favorites">
          <FavoriteTvSeries/>
        </Route>
        <Route path="/movies/favorites">
          <Favorites/>
        </Route>
        <Route path="/addtvseries">
          <AddTvSeriesPage/>
        </Route>
        <Route path="/addmovie">
          <AddMoviePage/>
        </Route>
        <Route path="/movies">
          <MoviesPage/>
        </Route>
        <Route path="/tvseries">
          <TvSeriesPage/>
        </Route>
          <Route path="/">
            <HomePage/>
          </Route>
      </Switch>
    </ApolloProvider>
  );
}

export default App;
