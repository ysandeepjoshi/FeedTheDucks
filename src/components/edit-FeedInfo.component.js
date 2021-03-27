import React, {Component} from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class EditFeedInfo extends Component{
    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangefeedLocation = this.onChangefeedLocation.bind(this);
        this.onChangefeedTime = this.onChangefeedTime.bind(this);
        this.onChangefoodCategory = this.onChangefoodCategory.bind(this);
        this.onChangefoodQuantity = this.onChangefoodQuantity.bind(this);
        this.onChangefoodType = this.onChangefoodType.bind(this);
        this.onChangenumberOfDucks = this.onChangenumberOfDucks.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
        username : '',    
        feedTime : new Date(),
        feedLocation : '',
        foodType : '',
        foodCategory : '',
        numberOfDucks : 0,
        foodQuantity : 0,
        users: []
        }
    }

    componentDidMount(){
        axios.get('https://duck-feed-be.herokuapp.com/feeddata/'+this.props.match.params.id)
        .then(response =>{
            
                this.setState({
                    username : response.data.username,
                    feedTime : new Date(response.data.feedTime),
                    feedLocation : response.data.feedLocation,
                    foodType : response.data.foodType,
                    foodCategory : response.data.foodCategory,
                    numberOfDucks : response.data.numberOfDucks,
                    foodQuantity : response.data.foodQuantity,
                })
        })
        .catch(function(error){
            console.log(error);
        })
        axios.get('https://duck-feed-be.herokuapp.com/users')
        .then(response =>{
            if(response.data.length>0){
                this.setState({
                    users : response.data.map(user => user.username),
                })
            }
        })
    }

    onChangeUsername(e){
        this.setState({
            username : e.target.value
        });
    }
    onChangefeedTime(date){
        this.setState({
            feedTime : date
        });
    }
    onChangefeedLocation(e){
        this.setState({
            feedLocation : e.target.value
        });
    }
    onChangefoodType(e){
        this.setState({
            foodType : e.target.value
        });
    }
    
    onChangefoodCategory(e){
        this.setState({
            foodCategory : e.target.value
        });
    }
    
    onChangenumberOfDucks(e){
        this.setState({
            numberOfDucks : e.target.value
        });
    }
    
    onChangefoodQuantity(e){
        this.setState({
            foodQuantity : e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();

        const FeedInformation = {
            username : this.state.username,
            feedTime : this.state.feedTime,
            feedLocation : this.state.feedLocation,
            foodType : this.state.foodType,
            foodCategory : this.state.foodCategory,
            numberOfDucks : this.state.numberOfDucks,
            foodQuantity : this.state.foodQuantity,
        }
        console.log(FeedInformation);
        axios.post('https://duck-feed-be.herokuapp.com/feeddata/update/'+this.props.match.params.id,FeedInformation)
        .then(res => console.log(res.data));
        window.location = '/';
    }

    render(){
        return(
            <div>
                <h3>Update Feed Data</h3>
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <select ref="userInput"
                        required
                        className ="form-control" 
                        value={this.state.username}
                        onChange ={this.onChangeUsername}>
                            {
                                this.state.users.map(function(user){
                                    return <option
                                    key={user}
                                    value={user}>{user}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <div>
                            <DatePicker
                            selected={this.state.feedTime}
                            onChange={this.onChangefeedTime}
                            showTimeSelect
                            dateFormat="MMMM d, yyyy h:mm aa"
                            timeInputLabel="Time:"
                            />
                        </div>

                    </div>
                    <div className="form-group">
                    <label>Location: </label>
                    <input type="text" className="form-control"
                    value={this.state.feedLocation}
                    onChange={this.onChangefeedLocation}
                    />
                    </div>
                    <div className="form-group">
                    <label>Food Type: </label>
                    <input type="text" className="form-control"
                    value={this.state.foodType}
                    onChange={this.onChangefoodType}
                    />
                    </div>
                    <div className="form-group">
                    <label>Category: </label>
                    <input type="text" className="form-control"
                    value={this.state.foodCategory}
                    onChange={this.onChangefoodCategory}
                    />
                    </div>
                    <div className="form-group">
                    <label>Number of Ducks: </label>
                    <input type="text" className="form-control"
                    value={this.state.numberOfDucks}
                    onChange={this.onChangenumberOfDucks}
                    />
                    </div>
                    
                    <div className="form-group">
                    <label>Quantity(in grams): </label>
                    <input type="text" className="form-control"
                    value={this.state.foodQuantity}
                    onChange={this.onChangefoodQuantity}
                    />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Feed Data" className="btn btn-primary"/>

                    </div>
                      </form>
            </div>
        )
    }
} 