import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client'
import { GET_TVSERIES, DELETE_TV_SERIES, GET_COLLECTION_TV_SERIES, EDIT_TV_SERIES } from '../config/gql/TvSeries-gql'
import { openNav, closeNav } from '../style/animation/TvSeries-page'
import React, { useEffect } from 'react'
import Swal from 'sweetalert2'
import client from '../config/graphql'
import '../style/css/TvSeries-page.css'
import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

function TvSeriesPage(props) {
  const history = useHistory()
  const { loading: loadingGetData, error: errorGetData, data: dataGetTvSeries, refetch } = useQuery(GET_TVSERIES)
  const [deleteTvSeriesMu] = useMutation(DELETE_TV_SERIES)

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
  }, [dataGetTvSeries, refetch])

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

  async function handleDeleteTvSeries(id) {
    try {
      await deleteTvSeriesMu({
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

  function handleEdit(dataEdit) {
    client.writeQuery({
      query: EDIT_TV_SERIES,
      data: {
        editTvSeries: [dataEdit]
      }
    })
    history.push('/tvseries/edit')
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

  function handelFavorites(dataFavorite) {
    const { tvseriies } = client.readQuery({
      query: GET_COLLECTION_TV_SERIES
    })

    if(cekDataFavorite(tvseriies, dataFavorite) === false) {
      client.writeQuery({
        query: GET_COLLECTION_TV_SERIES,
        data: {
          tvseriies: [ ...tvseriies,
            {
              _id: dataFavorite._id,
              title: dataFavorite.title,
              poster_path: dataFavorite.poster_path
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

  function handleDetail(dataDetail) {
    Swal.fire({
      imageUrl: dataDetail.poster_path,
      imageHeight: 400,
      imageAlt: dataDetail.title,
      title: dataDetail.title,
      text: `${dataDetail.overview}  ${dataDetail.tags}`
    })
  }

  return (
    <div className="TvSeriesPage w3-animate-opacity">
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
            <p onClick={() => handleChangePage('movies')}>Movies</p>
            <p onClick={() => handleChangePage('tvseries/favorites')}>Favorites</p>
            <p onClick={() => handleChangePage('addtvseries')}>Add Tv Series</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div style={{ padding: '1px' }}>
          <div style={{ backgroundColor: 'rgb(0, 0, 0, 0.6)', padding: '1px', borderRadius: '10px' }} className="text-center mt-5">
            <h1 className="titleMovie text-light m-3">Tv Series Page</h1>
          </div>
        </div>
        <div className="d-flex row mt-3 pl-5">
          { dataGetTvSeries.series.map((serie) => (
            <div className="col-4 mb-4 text-light">
              <div key={serie._id} className="card" style={{width: '18em', backgroundColor: 'rgb(0, 0, 0, 0.6)'}}>
                <img src={serie.poster_path} className="card-img-top" alt={serie.title}/>
                <div className="card-body">
                    <div className="d-flex justify-content-between">
                      <h5 className="card-title">{serie.title}</h5>
                      <h5 className="card-text w3-right-align"> <img style={{ width: '15px' }} src={'https://www.flaticon.com/svg/static/icons/svg/1828/1828884.svg'} alt="Star"/> {serie.popularity}</h5>
                    </div>
                    <div className="d-flex justify-content-between">
                      <Tooltip title="Delete Tv Series" arrow>
                        <button onClick={() => handleDeleteTvSeries(serie._id)} className="btn btn-outline-danger fa fa-hom"><i className="fa fa-trash"></i></button>
                      </Tooltip>
                      <Tooltip title="Edit Tv Series" arrow>
                        <button onClick={() => handleEdit(serie)} className="btn btn-outline-success fa fa-hom"><i className="fa fa-refresh"></i></button>
                      </Tooltip>
                      <Tooltip title="Add To Your Favorites Tv Series" arrow>
                        <button onClick={() => handelFavorites(serie)} className="btn btn-outline-warning fa fa-hom"><i className="fa fa-truck"></i></button>
                      </Tooltip>
                      <Tooltip title="Detail Tv Series" arrow>
                        <button onClick={() => handleDetail(serie)} className="btn btn-outline-info fa fa-hom"><i className="fa fa-search"></i></button>
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

export default TvSeriesPage