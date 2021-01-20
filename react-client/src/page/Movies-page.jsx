import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_MOVIE, DELETE_MOVIE, EDIT_MOVIE, GET_COLLECTIONS } from '../config/gql/Movies-gql'
import { openNav, closeNav } from '../style/animation/Home-page'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import client from '../config/graphql'
import '../style/css/Movie-Page.css'
import CircularProgress from '@material-ui/core/CircularProgress'
import Tooltip from '@material-ui/core/Tooltip';



function MoviesPage(props) {
  const history = useHistory()
  const { loading: loadingGetData, error: errorGetData, data: dataGetMovie, refetch } = useQuery(GET_MOVIE)
  const [deleteMovieMu] = useMutation(DELETE_MOVIE)

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  useEffect(() => {
    refetch()
  }, [dataGetMovie, refetch])

  if(loadingGetData) return (
    <div className="container">
      <div className="text-center" style={{ marginTop: '20%' }}>
        <h1 className="titleMovie text-light">Loading...</h1>
        <CircularProgress color="secondary" />
      </div>
    </div>
  )

  if(errorGetData) return (
    <div className="container">
      <div className="text-center" style={{marginTop: '250px'}}>
        <h1>{errorGetData.message}</h1>
      </div>
    </div>
  )

  function handleChangePage(page) {
    history.push(`/${page}`)
  }

  async function handleDeleteMovie(id) {
    try {
      await deleteMovieMu({
        variables: {
          id
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Successfully'
      })
      refetch()
    } catch (err) {
      Toast.fire({
        icon: 'error',
        title: 'Opps Sorry, internal server Error'
      })
      console.log(err)
    }
  }

  function handleDetail(dataDetail) {
    Swal.fire({
      imageUrl: dataDetail.poster_path,
      imageHeight: 400,
      imageAlt: dataDetail.title,
      title: dataDetail.title,
      text: `${dataDetail.overview}  ${dataDetail.tags}`
    })
  }

  function cekDataFavorite(data1, data2) {
    let falidate = false
    data1.find(el => {
      if(el.title === data2.title) {
        falidate = true
      }
    })
    return falidate
  }

  function handelFavorites(favoritesData) {
    const { favorites } = client.readQuery({
      query: GET_COLLECTIONS
    })
    
    if(cekDataFavorite(favorites, favoritesData) === false) {
      client.writeQuery({
        query: GET_COLLECTIONS,
        data: {
          favorites: [ ...favorites,
            {
              _id: favoritesData._id,
              title: favoritesData.title,
              poster_path: favoritesData.poster_path
            }
          ]
        }
      })
      Toast.fire({
        icon: 'success',
        title: 'Successfully'
      })
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Opps Sorry'
      })
    }
  }

  function handleEdit(dataEdit) {
    client.writeQuery({
      query: EDIT_MOVIE,
      data: {
        editMovie: [dataEdit]
      }
    })
    history.push('/movies/edit')
  }

  return (
    <div className="moviePage w3-animate-opacity">
      <div className="navbarApp">
        <div className="fixed-top">
          <Tooltip title="NavBar" arrow>
            <button className="btn btn-light ml-3 mt-3 px-4" onClick={() => openNav()}>&#9776;</button>
          </Tooltip>
        </div>
        <div id="myNav" className="overlay">
          <a style={{ textDecoration: 'none' }} href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
          <div className="overlay-content">
            <p onClick={() => handleChangePage('')}>Home</p>
            <p onClick={() => handleChangePage('movies/favorites')}>Favorites</p>
            <p onClick={() => handleChangePage('tvseries')}>Tv Series</p>
            <p onClick={() => handleChangePage('addmovie')}>Add Movie</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div style={{ padding: '1px' }}>
          <div style={{ backgroundColor: 'rgb(0, 0, 0, 0.6)', padding: '1px', borderRadius: '10px' }} className="text-center mt-5">
            <h1 className="titleMovie text-light m-3">Movies</h1>
          </div>
        </div>
        <div className="d-flex row mt-3 pl-5">
          { dataGetMovie.movies.map((movie) => (
            <div className="col-4 mb-4 text-light">
              <div key={movie._id} className="card" style={{width: '18em', backgroundColor: 'rgb(0, 0, 0, 0.6)'}}>
                <img src={movie.poster_path} className="card-img-top" alt={movie.title}/>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{movie.title}</h5>
                      <h5 className="card-text w3-right-align"> <img style={{ width: '15px' }} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828884.svg'} alt="Star"/> {movie.popularity}</h5>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Tooltip title="Delete Movie" arrow>
                        <button onClick={() => handleDeleteMovie(movie._id)} className="btn btn-outline-danger fa fa-hom"><i className="fa fa-trash"></i></button>
                      </Tooltip>
                      <Tooltip title="Edit Movie" arrow>
                        <button onClick={() => handleEdit(movie)} className="btn btn-outline-success fa fa-hom"><i className="fa fa-refresh"></i></button>
                      </Tooltip>
                      <Tooltip title="Add To Your Favorite Movie" arrow>
                        <button onClick={() => handelFavorites(movie)} className="btn btn-outline-warning fa fa-hom"><i className="fa fa-truck"></i></button>
                      </Tooltip>
                      <Tooltip title="Detail Movie" arrow>
                        <button onClick={() => handleDetail(movie)} className="btn btn-outline-info fa fa-hom"><i className="fa fa-search"></i></button>
                      </Tooltip>
                    </div>
                </div>
              </div>
            </div>
          )) }
        </div>
      </div>
      <div>
        <footer className="page-footer font-small mt-3">
        <div style={{ backgroundColor: 'rgb(0, 0, 0, 0.6)' }} className=" footer-copyright text-center py-3 text-light">
          <p>© 2021 Copyright: Abrar Na'im</p>
        </div>
        </footer>
      </div>
    </div>
  )
}

export default MoviesPage