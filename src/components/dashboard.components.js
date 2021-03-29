import React, {Component} from 'react';
import axios from 'axios';
import { AgGridReact } from 'ag-grid-react';


import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import 'ag-grid-enterprise';

import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';



export default class DashBoardReporting extends Component{
    constructor(props){
        super(props);
        this.state = {
            /*columnDefs:[
                {headerName: 'User', field: 'username', sortable: true, filter:true},
                {headerName: 'Location', field: 'feedLocation', sortable: true, filter:true},
                {headerName: 'Date', field: 'feedTime', sortable: true, filter:true, valuFormatter:this.ConvertDate},
                {headerName: 'Time', field: 'feedTime', sortable: true, filter:true, valuFormatter:this.ConverTime},
                {headerName: 'Category', field: 'foodCategory', sortable: true, filter:true},
                {headerName: 'Food Quantity', field: 'foodQuantity', sortable: true, filter:true},
                {headerName: 'Number of Ducks', field: 'numberOfDucks', sortable: true, filter:true},
            ],
            */
            rowData: null,
            /*
            rowData:[
                {make:'Toyota',model:'Celica',price:35000},
                {make:'Ford',model:'Mondeo',price:28000},
                {make:'Porsche',model:'Boxter',price:23000},
            ]*/
        };
    }
    componentDidMount(){
        axios.get('https://duck-feed-be.herokuapp.com/feeddata')
        .then( response =>{
            //console.log(response.data);
            this.setState({
                rowData :response.data
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
        
    ConvertDate(params){
        return params.value.substring(0,10);
    }
    ConverTime(params){
        return new Date(params.value).toTimeString().substring(0,8);
    }
    render(){
        return(
            <div>
                <h3>Welcome to Reporting Dashboard</h3>
                <div className="ag-theme-balham"
                style={{
                    width:1100,
                    height:400
                }}
                >
                    <AgGridReact
                    rowData={this.state.rowData}
                    sideBar
                    enableCharts
                    enableRangeSelection
                    >
                <AgGridColumn headerName='User'
                 field= 'username'
                 sortable= {true} 
                 filter={true}
                 />
                <AgGridColumn 
                headerName= 'Location' field= 'feedLocation' sortable= {true} filter={true}/>
                <AgGridColumn headerName= 'Date' field= 'feedTime' sortable= {true} filter={true}  valueFormatter={this.ConvertDate}/>
                <AgGridColumn headerName= 'Time' field= 'feedTime' sortable= {true} filter={true} valueFormatter={this.ConverTime}/>
                <AgGridColumn headerName= 'Category' field= 'foodCategory' sortable= {true} filter={true}/>
                <AgGridColumn headerName= 'Food Quantity' field= 'foodQuantity' sortable= {true} filter={true}/>
                <AgGridColumn headerName= 'Number of Ducks' field= 'numberOfDucks' sortable= {true} filter={true}/>
                    </AgGridReact>
                </div>
            </div>
        )
    }
}
