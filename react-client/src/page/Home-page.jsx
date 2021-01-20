import React from 'react'
import { useHistory } from 'react-router-dom'
import '../style/css/Home-Page.css'

function HomePage(props) {
  const history = useHistory()

  function handleChangePage(page) {
    history.push(`/${page}`)
  }

  return (
    <div className="container w3-animate-opacity">
      <div className="text-center mt-5">
        <div style={{marginTop: '12%', backgroundColor: 'rgb(0, 0, 0, 0.6)', padding: '10px', borderRadius: '10px'}}>
          {/* <h1 className="text-light titleMovie m-3">Sainapa Cinema</h1> */}
          <div className=" text-center d-flex">
            <div className="containerImgKi">
              <img className="image" src={'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80'} alt={'Movie'}/>
              <div onClick={() => handleChangePage('movies')} className="overlayKi">
                <div className="text titleMovie"> Movies</div>
              </div>
            </div>
            <div className="containerImgKa">
              {/* <img className="image" src={'https://images.unsplash.com/photo-1561352294-4f08a9963b8b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1504&q=80'} alt={'TvSeries'}/> */}
              <img className="image" src={'https://images.unsplash.com/photo-1568085823039-e823e87197e3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80'} alt={'TvSeries'}/>
              <div onClick={() => handleChangePage('tvseries')} className="overlayKa">
                <div className="text titleMovie">Tv Series</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage