import React, {Component} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const FeedInfo = props =>(

    <tr>
        <td>{props.feedinfo.username}</td>
        <td>{props.feedinfo.feedTime.substring(0,10)}</td>
        <td>{new Date(props.feedinfo.feedTime).toTimeString().substring(0,8)}</td>
        <td>{props.feedinfo.feedLocation}</td>
        <td>{props.feedinfo.foodType}</td>
        <td>{props.feedinfo.foodCategory}</td>
        <td>{props.feedinfo.numberOfDucks}</td>
        <td>{props.feedinfo.foodQuantity}</td>
        <td>
            <Link to={"/edit/"+props.feedinfo._id}>Edit</Link> | <a href="#" onClick={()=> {props.deleteFeedInfo(props.feedinfo._id)}}>Delete</a>
        </td>
    </tr>
)


export default class FeedInfoList extends Component{

    constructor(props){
        super(props);


        this.deleteFeedInfo =  this.deleteFeedInfo.bind(this);
        this.state = {feedinfo:[]};

    }

    componentDidMount(){
        axios.get('http://localhost:5000/feeddata')
        .then( response =>{
            this.setState({
                feedinfo :response.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
    feedinformationList(){
        return this.state.feedinfo.map( currentFeedData =>{
            return <FeedInfo feedinfo={currentFeedData} deleteFeedInfo={this.deleteFeedInfo} key={currentFeedData._id}/>
        })
    }

    deleteFeedInfo(id){
        axios.delete('http://localhost:5000/feeddata/'+id)
        .then( res => {
            console.log(res.data)
        });
        this.setState({
            feedinfo : this.state.feedinfo.filter(el => el.id !== id)
        })
    }

    render(){
        return(
            <div>
                <h3>
                    Logged Duck Feed Information 
                </h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                           <th>Username</th>
                           <th>Date</th>
                           <th>Time</th>
                           <th>Location</th>
                           <th>Food Type</th>
                           <th>Category</th>
                           <th>Number of Ducks</th>
                           <th>Quantity(in grams):</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.feedinformationList()}
                    </tbody>
                </table>
            </div>
        )
    }
} 