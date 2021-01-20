import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'
import { openNav, closeNav } from '../style/animation/TvSeries-page'
import { EDIT_TV_SERIES, SAVE_EDIT_TV_SERIES } from '../config/gql/TvSeries-gql'
import client from '../config/graphql'
import Swal from 'sweetalert2'
import Tooltip from '@material-ui/core/Tooltip'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'

function EditMoviePage(props) {
  const history = useHistory()
  const [saveDataEdit] = useMutation(SAVE_EDIT_TV_SERIES)
  const[dataEdit, setDataEdit] = useState({
    id: '',
    title: '',
    overview: '',
    poster_path: '',
    popularity: null,
    tags: ['']
  })

  useEffect(() => {
    const { editTvSeries } = client.readQuery({
      query: EDIT_TV_SERIES,
    })
    setDataEdit({
      id: editTvSeries[0]._id,
      title: editTvSeries[0].title,
      overview: editTvSeries[0].overview,
      poster_path: editTvSeries[0].poster_path,
      popularity: editTvSeries[0].popularity,
      tags: editTvSeries[0].tags
    })
  }, [])

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

  function handleEdit(e) {
    let key = e.target.name
    let value = e.target.value
    if(key === 'popularity') {
      value = Number(value)
    }
    setDataEdit({
      ...dataEdit,
      [key]: value
    })
  }

  function handleEditSubmiit(e) {
    e.preventDefault()
    saveDataEdit({
      variables: {
        id: dataEdit.id,
        title: dataEdit.title,
        overview: dataEdit.overview,
        poster_path: dataEdit.poster_path,
        popularity: dataEdit.popularity,
        tags: dataEdit.tags,
      }
    })
    history.push('/tvseries')
    Toast.fire({
      icon: 'success',
      title: 'Successfully'
    })
  }

  if(dataEdit.length === 0) {
    return (
      <div className="container w3-animate-opacity">
        <div className="text-center" style={{ marginTop: '20%' }}>
          <h1 className="titleMovie text-light">Loading...</h1>
          <CircularProgress color="secondary" />
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
            <a style={{ textDecoration: 'none' }} href="javascript:void(0)" className="closebtn" onClick={() => closeNav()}>&times;</a>
            <div className="overlay-content">
              <p onClick={() => handleChangePage('')}>Home</p>
              <p onClick={() => handleChangePage('tvseries/favorites')}>Favorites</p>
              <p onClick={() => handleChangePage('tvseries')}>Tv Series</p>
              <p onClick={() => handleChangePage('addtvseries')}>Add Tv Series</p>
            </div>
          </div>
        </div>
        <div className="container">
          <div style={{ padding: '1px', borderRadius: '10px', margin: '10px' }}>
            <div>
              <h1 className="titleMovie text-center text-light m-3">Edit Form</h1>
            </div>
          </div>
          <div className="d-flex justify-content-center row text-center mt-3">
            <div className="col-5">
              <img style={{ width: '70%'}} src={dataEdit.poster_path} alt={dataEdit.title}/>
            </div>
            <div style={{ backgroundColor: 'rgb(0, 0, 0, 0.6)', borderRadius: '10px' }} className="col-7">
              <form className="form" onSubmit={(e) => handleEditSubmiit(e)}>
                <label className="col-form-label text-light">Title Tv Series</label>
                <input onChange={(e) => handleEdit(e)} type="text" className="form-control" value={dataEdit.title} name="title"></input>
                <label className="col-form-label text-light">Overview Tv Series</label>
                <input onChange={(e) => handleEdit(e)} type="text" className="form-control" value={dataEdit.overview} name="overview"></input>
                <label className="col-form-label text-light">Poster Path Tv Series</label>
                <input onChange={(e) => handleEdit(e)} type="text" className="form-control" value={dataEdit.poster_path} name="poster_path"></input>
                <label className="col-form-label text-light">Popularity Tv Series</label>
                <input onChange={(e) => handleEdit(e)} type="number" className="form-control" value={dataEdit.popularity} name="popularity"></input>
                <label className="col-form-label text-light">Tags Tv Series</label>
                <input onChange={(e) => handleEdit(e)} type="text" className="form-control mb-3" value={dataEdit.tags} name="tags"></input>
                <Button type="submit" variant="contained" color="primary">Submit</Button>
                {/* <button className="btn btn-info" type="submit">Submit</button> */}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default EditMoviePage