import React,{Component} from 'react'
import axios from'axios'
import './RepoRoute.css'
import {connect} from 'react-redux'
import Spinner from './Spinner'
import ReactMarkdown from 'react-markdown'
import CodeBlock from './CodeBlock'
import { postTypes, defaultRoute, aboutRoute } from '../../constants'

class Repo extends Component {

    state = {
        showMarkDown: false,
        repos:this.props.repos,
        src:'',
        created:'',
        updated:'',
        name: ''  
    }

    fetchPost = props => {
        
        const fetchedRepo = this.state.repos.filter(el => {
            return el.id === props.match.params.id
        })[0];       

        this.setState({
            name: fetchedRepo.name,
            src:fetchedRepo.html_url,
            created:fetchedRepo.created_at,
            updated:fetchedRepo.updated_at,
            showMarkDown: false,
        })

        if(fetchedRepo.fetchedContent !== null){
            this.setResult(fetchedRepo,fetchedRepo.fetchedContent);
            return;
        }

        if(fetchedRepo.postType === postTypes.github){
            axios
            .get(fetchedRepo.readMe)
            .then(res => this.setResult(fetchedRepo,res.data))
            .catch(err => this.setResult(fetchedRepo,null));               
        }

        if(fetchedRepo.postType === postTypes.gist){
            var readMe = Object.keys(fetchedRepo.files).find(key => key ==='README.md');
            if(readMe)
            {
                axios.get(fetchedRepo.files[readMe].raw_url)                
                .then(res =>this.setResult(fetchedRepo,res.data))
                .catch(err => this.setResult(fetchedRepo,null));               
            }
            else
            {
                this.setResult(fetchedRepo,null);
            }
        }
    }

    setResult(fetchedRepo, fetchedContent)
    {
        if(fetchedContent === null)
        {   
            fetchedContent = fetchedRepo.name;
            console.log(fetchedRepo.html_url);
        }

        this.props.hideSpinner();
        fetchedRepo.fetchedContent = fetchedContent
        this.setState({
            fetchedContent: fetchedContent ,
            showMarkDown: true
        })
    }

    componentDidMount(){
        if(this.props.repos.length === 0 ){
            this.props.history.replace(defaultRoute);
        }
        else {
            this.fetchPost(this.props)
        }    
    }

    componentWillReceiveProps(nextProps){
        this.fetchPost(nextProps)               
     }

    render(){
        
        let style = this.state.showMarkDown ? {visibility:'visible'} : {visibility:'hidden'} 

        return(
            <div className="repoRoute" style={style}>
                <Spinner />
                {this.state.fetchedContent && !this.state.fetchedContent.startsWith('#') && <h3>{this.state.name}</h3>}
                <ReactMarkdown source={this.state.fetchedContent} escapeHtml={true} renderers={{ code: CodeBlock }} />

                <div className="repo-details">
                    <span className="postDates"> {this.state.created} </span>
                    <a target="_blank" href={this.state.src}  className="sourceLink" >Source</a>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    
    return {
        repos:state.fetchedData.reposList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideSpinner: () => dispatch({type:'hideSpinner'})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Repo)