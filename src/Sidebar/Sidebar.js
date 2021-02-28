import React,{Fragment} from 'react'
import ReposWrapper from './ReposWrapper'
import './Sidebar.css'
import {connect} from 'react-redux'
 
const sidebar = props => {
    return(
        <Fragment>
        <input type="checkbox" checked={props.showSidebar}  name="checkbox" id="checkbox"/>
        {/* {React.createElement('input',{type: 'checkbox',  defaultChecked: false, name:"checkbox", id:"checkbox"})} */}
        <aside id="sidebar">
              <main className="navbar-body">
                  <ReposWrapper scrollable="1" />
              </main>
          </aside>
          
        <aside id="sidebar-lg">
              <main className="navbar-body-lg">
                  <a href="https://github.com/farshid-taran">
                      <img className="profilePicture" src="https://avatars.githubusercontent.com/u/79798160" alt="Profile Image"/>
                  </a>
                  <ReposWrapper scrollabe="2" />
              </main>
          </aside>
        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        showSidebar:state.showSidebar
    }
}

export default connect(mapStateToProps)(sidebar)