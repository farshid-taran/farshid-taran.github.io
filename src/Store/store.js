import {createStore} from 'redux'

const initialState = {
    fetchedData:{
        reposList:[]
    },
    showSidebar:false,
    showSpinner:true,
    showMarkDown:false
}

const reducer = (state=initialState,action)=>{
    if(action.type === 'repos'){
        return {
            ...state,
            fetchedData:{
                reposList: action.payload
            }
        }
        
    }

    if(action.type === 'hide'){
        return {
            ...state,
            showSidebar:false
        }
    }

    if(action.type === 'toggle'){
        if(state.showSidebar === false) {
            return {
                ...state,
                showSidebar:true
            }
        }
        return {
            ...state,
            showSidebar:false
        }
    }

    if(action.type === 'showSpinner'){
        return {
            ...state,
            showSpinner:true
        }
    }

    if(action.type === 'hideSpinner'){
        return {
            ...state,
            showSpinner:false
        }
    }
    
    if(action.type === 'showMarkDown'){
        return {
            ...state,
            showMarkDown:true
        }
    }
    
    if(action.type === 'hideMarkDown'){
        return {
            ...state,
            showMarkDown:false
        }
    }

    return state
    
}



const store = createStore(reducer)

export default store

