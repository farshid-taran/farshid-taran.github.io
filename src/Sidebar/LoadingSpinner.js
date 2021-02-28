import React from 'react'
import loadingSpinner from './loading-spinner.png'
import './LoadingSpinner.css'


const loading = ()=> {
    return(
        <img src={loadingSpinner} className="loading-spinner" />
    )
}

export default loading