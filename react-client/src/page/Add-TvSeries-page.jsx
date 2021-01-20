import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { ADD_TV_SERIES } from '../config/gql/TvSeries-gql'
import { openNav, closeNav } from '../style/animation/Home-page'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import Swal from 'sweetalert2'

function AddTvSeries() {
  const history = useHistory()
  const [AddTvSeriesSubmit] = useMutation(ADD_TV_SERIES)
  const[addTvSeriues, setAddTvSeries] = useState({
    title: '',
    overview: '',
    poster_path: '',
    popularity: null,
    tags: ['']
  })

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

  function handleChangePage(page) {
    history.push(`/${page}`)
  }

  function handelAddTvSeries(e) {
    let key = e.target.name
    let value = e.target.value
    if(key === 'popularity') {
      value = Number(value)
    }
    if(key === 'tags') {
      value = [value]
    }
    setAddTvSeries({
      ...addTvSeriues,
      [key]: value
    })
    
  }

  function handelAddTvSeriesSubmit(e) {
    e.preventDefault()
    AddTvSeriesSubmit({
      variables: {
        newTvSeries: addTvSeriues
      }
    })
    history.push('/tvseries')
    Toast.fire({
      icon: 'success',
      title: 'Successfully'
    })
  }

  return (
    <div className="addPageApp  w3-animate-opacity">
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
            <p onClick={() => handleChangePage('movies/favorites')}>Favorites</p>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-5  mb-2 p-3">
          <div className="text-center">
            <h1 className="text-light titleMovie">Form Add Tv Series</h1>
          </div>
        </div>
        <div className="text-center" style={{ backgroundColor: 'rgb(0, 0, 0, 0.6)', borderRadius: '10px', padding: '10px', marginTop: '40px' }}>
          <div className="d-flex row">
            <div className="col-5">
                <img style={{width: "50%"}} src={addTvSeriues.poster_path} alt={addTvSeriues.title}/>
            </div>
            <div className="col-7">
              <form onSubmit={(e) => handelAddTvSeriesSubmit(e)} className="form text-center">
                <input value={addTvSeriues.title} onChange={(e) => handelAddTvSeries(e)} className="form-control my-3" type="text" placeholder="Title" name="title"></input>
                <input value={addTvSeriues.overview} onChange={(e) => handelAddTvSeries(e)} className="form-control my-3" type="text" placeholder="Overview" name="overview"></input>
                <input value={addTvSeriues.poster_path} onChange={(e) => handelAddTvSeries(e)} className="form-control my-3" type="text" placeholder="Poster Path" name="poster_path"></input>
                <input value={addTvSeriues.Popularity} onChange={(e) => handelAddTvSeries(e)} className="form-control my-3" type="number" min="0" max="100" placeholder="Popularity" name="popularity"></input>
                <input value={addTvSeriues.tags} onChange={(e) => handelAddTvSeries(e)} className="form-control my-3" type="text" placeholder="Tags" name="tags"></input>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
                {/* <button type="submit" className="btn btn-primary">Submit</button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddTvSeries