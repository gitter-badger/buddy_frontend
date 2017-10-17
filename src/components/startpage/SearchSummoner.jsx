import React, { Component } from 'react';
import { Select, Input, Form, Button } from 'semantic-ui-react'
import { GET_SUMMONER_INFO } from '../../config/API'
import { GET_SUMMONER_INFO_MOCK2 } from '../../config/API'

const options = [
  { key: 'euwest', text: 'EU West', value: 'euw' },
  { key: 'na', text: 'NA', value: 'na' },
  { key: 'kr', text: 'KR', value: 'kr' },
]

class SearchSummoner extends Component {
    constructor(props) {
        super(props)
        this.state = {
            region: "euw",
            fetchData: {},
            loading: false
        }
    }

    fetchSummoner = () => {
        var that = this;
        
        const region = this.state.region
        const name = (this.state.value).replace(/\s/g,''); //Remove spaces from name
        const url = GET_SUMMONER_INFO + region + "/" + name;
        
        this.setState({
            loading: true
        })
        console.log("Getting summoner...")
        console.log("Calling: " + url)

        fetch(url).then(function(response) { 
            return response.json();
        }).then(function(data) {
            that.props.getSummonerByName(data);
            that.setState({
                loading: false
            })
        })
    }

    fetchSummonerMock = () => {
     this.props.getSummonerByName(GET_SUMMONER_INFO_MOCK2);
    }

    handleChangeName = (event) => this.setState({value: event.target.value})
    
    handleChangeRegion = (e, { value }) => this.setState({ region: value })

    render() {
        return (
            <div id="search-bar">
                <Form onSubmit={this.fetchSummoner}>
                    <Input fluid type='text' placeholder='Find summoner' action onChange={this.handleChangeName}>
                        <input />
                        <Select className="region-select" 
                                compact 
                                onChange={this.handleChangeRegion} 
                                options={options} 
                                defaultValue={this.state.region}/>
                        <Button primary loading={this.state.loading} type='submit'>Search</Button>  
                    </Input>
                </Form>           
            </div>
        );
    }
}

export default SearchSummoner;
