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
        this.scheduleAutoEntry = this.scheduleAutoEntry.bind(this);
        this.deleteScheduleEntry = this.deleteScheduleEntry.bind(this);

        this.state = {
        username : '',    
        feedTime : new Date(),
        feedLocation : '',
        foodType : '',
        foodCategory : '',
        numberOfDucks : 0,
        foodQuantity : 0,
        users: [],
        successMessage : '',
        schedules: [],
        scheduled: false,
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

        
        //get the user and admin status        
        let user = JSON.parse(sessionStorage.getItem('token'))?.user;
        let admin = JSON.parse(sessionStorage.getItem('token'))?.admin;

        axios.get('https://duck-feed-be.herokuapp.com/users')
        .then(response =>{
            if(response.data.length>0){
                if(admin){
                    this.setState({
                        users : response.data.map(user => user.username),
                        username : response.data[0].username
                    })
                }else{
                let filterData = response.data.filter((item)=>item.username===user);
                this.setState({
                    users : filterData.map(user => user.username),
                    username : filterData[0].username
                })
            }
        }
        })
        
        axios.get('https://duck-feed-be.herokuapp.com/schedules')
        .then(response =>{
            if(response.data.length>0){
                let filteredSchedule = response.data.filter((d)=>d.username === this.state.username);
                if(filteredSchedule.length>0){
                this.setState({
                    scheduled : filteredSchedule[0].scheduled
                })
            }
            }
        })
    }
    deleteScheduleEntry(e){
        e.preventDefault();     
        const FeedInformation = {
            username : this.state.username,
            scheduled: true,
            feedTime : this.state.feedTime,
            feedLocation : this.state.feedLocation,
            foodType : this.state.foodType,
            foodCategory : this.state.foodCategory,
            numberOfDucks : this.state.numberOfDucks,
            foodQuantity : this.state.foodQuantity,
        }
        console.log(FeedInformation);
        axios.post('https://duck-feed-be.herokuapp.com/schedules/delete',FeedInformation)
        .then(res => {
            console.log(res.data)
            this.setState({
                successMessage : 'Scheduler deleted Successfully!'
            })
            setTimeout(function(){ window.location = '/';},1000);
        });
    }
    scheduleAutoEntry(e){
        
        e.preventDefault();     
        const FeedInformation = {
            username : this.state.username,
            scheduled: true,
            feedTime : this.state.feedTime,
            feedLocation : this.state.feedLocation,
            foodType : this.state.foodType,
            foodCategory : this.state.foodCategory,
            numberOfDucks : this.state.numberOfDucks,
            foodQuantity : this.state.foodQuantity,
        }
        console.log(FeedInformation);
        axios.post('https://duck-feed-be.herokuapp.com/schedules/add',FeedInformation)
        .then(res => {
            console.log(res.data)
            this.setState({
                successMessage : 'Scheduler updated Successfully!'
            })
            setTimeout(function(){ window.location = '/';},1000);
        });
    }
    onChangeUsername(e){
        this.setState({
            username : e.target.value,
            successMessage : ''
        });
    }
    onChangefeedTime(date){
        this.setState({
            feedTime : date,
            successMessage : ''
        });
    }
    onChangefeedLocation(e){
        this.setState({
            feedLocation : e.target.value,
            successMessage : ''
        });
    }
    onChangefoodType(e){
        this.setState({
            foodType : e.target.value,
            successMessage : ''
        });
    }
    
    onChangefoodCategory(e){
        this.setState({
            foodCategory : e.target.value,
            successMessage : ''
        });
    }
    
    onChangenumberOfDucks(e){
        this.setState({
            numberOfDucks : e.target.value,
            successMessage : ''
        });
    }
    
    onChangefoodQuantity(e){
        this.setState({
            foodQuantity : e.target.value,
            successMessage : ''
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
        .then(res => {
            console.log(res.data)
            this.setState({
                successMessage : 'Data updated Successfully!'
            })
            setTimeout(function(){ window.location = '/';},1000);
        });
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
                    required
                    />
                    </div>
                    <div className="form-group">
                    <label>Food Type: </label>
                    <input type="text" className="form-control"
                    value={this.state.foodType}
                    onChange={this.onChangefoodType}
                    required
                    />
                    </div>
                    <div className="form-group">
                    <label>Category: </label>
                    <input type="text" className="form-control"
                    value={this.state.foodCategory}
                    onChange={this.onChangefoodCategory}
                    required
                    />
                    </div>
                    <div className="form-group">
                    <label>Number of Ducks: </label>
                    <input type="number" className="form-control"
                    value={this.state.numberOfDucks}
                    onChange={this.onChangenumberOfDucks}
                    required
                    min='0'
                    />
                    </div>
                    
                    <div className="form-group">
                    <label>Quantity(in grams): </label>
                    <input type="number" className="form-control"
                    value={this.state.foodQuantity}
                    onChange={this.onChangefoodQuantity}
                    required
                    min='0'
                    />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Update Feed Data" className="btn btn-primary"/>
                        <input type="button"  value={this.state.scheduled? "Edit Auto Data Entry":"Automate This"} onClick={this.scheduleAutoEntry}  className="btn btn-primary float-right"/>
                        <input type="button"  hidden ={!this.state.scheduled} value={"Stop Auto Data Entry"} onClick={this.deleteScheduleEntry}  className="btn btn-primary float-right"/>

                    </div>
                      </form>
            </div>
        )
    }
} 