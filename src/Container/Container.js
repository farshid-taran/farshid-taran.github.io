import React from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import Repo from './Routes/RepoRoute'
import './Container.css'

const container = props => {
    return(
        <div className="container">
            <Switch className="routes">
                <Route path="/repo/:id" component={Repo} />
            </Switch>
        </div>
    )
}

export default container