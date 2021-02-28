import React, {Component} from 'react'
import Repo from './Repo'
import './ReposWrapper.css'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner'
import {connect} from 'react-redux'
import {postTypes, githubToken, aboutRoute} from '../constants'
import { withRouter } from "react-router-dom";

class ReposWrapper extends Component {
    state={
        page:1,
        perPage:30,
        hasMore:true,
        reposList:[],
        userName:'farshid-taran'
    }


    sortResults = arr => {
        return arr.sort((a, b) => {
            return new Date(b.created_at) - new Date(a.created_at);
        })
    }

    mapPost = (el, postType) => {
        if(el.description === null || el.description === '')
        {
            console.log(el.html_url);
            return null;
        }
        return {
            name: el.description,
            fetchedContent: null,
            id: String(el.id),
            url: el.url,
            html_url: el.html_url,
            created_at: new Date(el.created_at).toLocaleDateString(),
            updated_at: new Date(el.updated_at).toLocaleDateString(),
            postType: postType,
            files: el.files,
            readMe: postType === postTypes.gist ?
            `https://gist.githubusercontent.com/${this.state.userName}/${el.id}/raw/README.md` :
            `https://raw.githubusercontent.com/${this.state.userName}/${el.name}/master/README.md`              
        }
    }

    fetchLists = ()=> {
            const {page,perPage,userName} = this.state;
            const config = {headers:{'Authorization': githubToken}}
            axios.get(`https://api.github.com/users/${userName}/repos?page=${page}&per_page=${perPage}&sort=updated`,config)
            .then(response => {
                if(response.data.length === 0){
                    this.setState({
                        hasMore:false
                    })
                    return
                }
                axios.get(`https://api.github.com/users/${userName}/gists?page=${page}&per_page=${perPage}`,config)
                .then(res => {
                    
                    const removedPosts = ["254476713", "343130915", "254476713"]
                    
                    var gists = res.data.map(el => this.mapPost(el,postTypes.gist));
                    var githubs = response.data.map(el => this.mapPost(el,postTypes.github));
                    var replacedPosts = [...this.state.reposList,...gists,...githubs].filter(el => el !== null && !removedPosts.includes(el.id));
                    const sortedArr = this.sortResults(replacedPosts);
                    
                    this.setState({ reposList: sortedArr},() => {
                        this.props.storeRepos(sortedArr);
                    })
                })
            })
    }


    componentDidMount(){
        this.fetchLists();
    }
    
    componentDidUpdate(prevProps, prevState, snapshot) {
        
        if (this.props.location.pathname === "/" && this.props.totalList.length > 0)
        {
            this.props.history.push(aboutRoute);
        }
    }

    loadNext = ()=> {
        this.setState(prevState=> ({page:prevState.page +1}),this.fetchLists);
    }


    render(){
        const renderRepos = this.props.totalList.map(el => {
           return <Repo name={el.name} key={el.id} id={el.id} url={el.url} created_at={el.created_at} />
        })

        return(
            <div className="reposWrapper" id={`target${this.props.scrollable}`}>
                <InfiniteScroll 
                dataLength={this.props.totalList.length}
                next={this.loadNext}
                hasMore={this.state.hasMore}
                loader={<LoadingSpinner/>}>
                     {renderRepos} 
                </InfiniteScroll>  
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        totalList:state.fetchedData.reposList
    }
}

const mapDispatchToProps = dispatch => {

    return {
        storeRepos: (reposPayload)=> dispatch({type:'repos',payload:reposPayload})
    }
    
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ReposWrapper))