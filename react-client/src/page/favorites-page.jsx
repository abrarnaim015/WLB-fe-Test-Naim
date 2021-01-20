import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GET_COLLECTIONS } from '../config/gql/Movies-gql'
import { openNav, closeNav } from '../style/animation/Home-page'
import client from '../config/graphql'
import Tooltip from '@material-ui/core/Tooltip'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'

function FavoritePage(props) {
  const history = useHistory()
  const [dataCache, setDataCache] = useState([])

  useEffect(() => {
    const { favorites } = client.readQuery({
      query: GET_COLLECTIONS,
    })
    setDataCache(favorites)
  }, [])

  function handleChangePage(page) {
    history.push(`/${page}`)
  }

  if(dataCache.length === 0) {
    return (
      <div className="w3-animate-opacity">
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
              <p onClick={() => handleChangePage('tvseries')}>Tv Series</p>
              <p onClick={() => handleChangePage('addmovie')}>Add Movie</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div style={{ padding: '10px', margin: '10px', borderRadius: '10px' }}>
          </div>
          <div style={{ marginTop: '20%', padding: '10px', borderRadius: '10px'}}>
            <ErrorOutlineIcon style={{ marginLeft: '48%' }} fontSize="large" color="error" />
            <h1 className="text-center titleMovie text-light">Empty Favorites Data...</h1>
          </div>
        </div>
      </div>
    )
  } else {
    return (
      <div className="w3-animate-opacity">
        <div className="navbarApp">
          <div className="fixed-top">
            <Tooltip title="NavBar" arrow>
              <button className="btn btn-light ml-3 mt-3 px-4" onClick={() => openNav()}>&#9776;</button>
            </Tooltip>
          </div>
          <div id="myNav" className="overlay">
            <a href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
            <div className="overlay-content">
              <p onClick={() => handleChangePage('')}>Home</p>
              <p onClick={() => handleChangePage('movies')}>Movies</p>
              <p onClick={() => handleChangePage('tvseries')}>Tv Series</p>
              <p onClick={() => handleChangePage('addmovie')}>Add Movie</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div style={{ padding: '10px', margin: '10px', borderRadius: '10px' }}>
            <div>
              <h1 className="text-center titleMovie text-light my-3">You'r Faforite Movies</h1>
            </div>
            <div style={{  backgroundColor: 'rgb(0, 0, 0, 0.6)' }} className="mt-5">
              <div>
                <table className="table text-light text-center">
                  { dataCache.map((dataFav) => (
                    <tr key={dataFav._id}>
                      <th>
                        <img style={{ height: '300px' }} src={dataFav.poster_path} alt={dataFav.title}/>
                      </th>
                      <th>
                        <h3 style={{ marginTop: '20%' }}>{dataFav.title}</h3>
                      </th>
                      {/* <th>
                        <button style={{ marginTop: '90%' }} className="btn btn-outline-danger fa fa-hom"><i className="fa fa-trash"></i></button>
                      </th> */}
                    </tr>
                  ))}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default FavoritePage