import React, { Component } from 'react';
import { Segment, Form, Label } from 'semantic-ui-react';
import history from '../../../config/History';
import Positions from './CriteriaListSection/Positions';
import VoiceChat from './CriteriaListSection/VoiceChat';
import AgeGroups from './CriteriaListSection/AgeGroups';
import AllLanguages from './CriteriaListSection/AllLanguages';

export default class CriteriaList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            positions: {
                top: false,
                jungle: false,
                mid: false,
                marksman: false,
                support: false
            },
            ageGroups: {
                interval1: false,
                interval2: false,
                interval3: false,                
            },
            voiceChat: {
                YES: false,
                NO: false
            },
            ignoreLanguage: true
        }
    }

    componentDidMount = () => {    
        if(!this.props.criteria){
             history.push('/')
        } else {
            this.setState({
                positions: this.props.criteria.positions,
                ageGroups: this.props.criteria.ageGroups,
                voiceChat: this.props.criteria.voiceChat,
                ignoreLanguage: true
            })
        } 
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (this.state !== nextState)
      }
    
    componentDidUpdate = () => {
        this.props.onChangeCriteria(this.state)
    }

    setInitialPositions = (player) => {
        const positions = {
            top: false,
            jungle: false,
            mid: false,
            marksman: false,
            support: false
        };    

        for (var key in positions){
            positions[key] = !player.userInfo.selectedRoles[key]
        }

        return positions
    }

    setInitialAgeGroup = (player) => {
        const ageGroups = {
            interval1: false,
            interval2: false,
            interval3: false
        }

        if (player.userInfo.agegroup === "13-19") ageGroups.interval1 = true
        if (player.userInfo.agegroup === "20-29") ageGroups.interval2 = true
        if (player.userInfo.agegroup === "29+") ageGroups.interval3 = true

        return ageGroups
    }

    setInitialVoiceChat = (player) => {
        const voiceChat = {
            YES: false,
            NO: false
        }

        if (player.userInfo.voicechat) voiceChat.YES = true
        if (!player.userInfo.voicechat) voiceChat.NO = true

        return voiceChat
    }

    onChangePositions = (event) => {
        const pos = event.target.name;
    
        let positions = {...this.state.positions};
        positions[pos] = !positions[pos];
    
        this.setState({
            positions: positions
        });
    }

    onChangeAgeGroup = (event, {name}) => {    
        let ageGroups = {...this.state.ageGroups};
        ageGroups[name] = !ageGroups[name];
    
        this.setState({
            ageGroups: ageGroups
        });
    }

    onChangeVoiceChat = (event, {label}) => {    
        let voiceChat = {...this.state.voiceChat};
        voiceChat[label] = !voiceChat[label];
    
        this.setState({
            voiceChat: voiceChat
        });
    }

    onChangeAllLanguages = () => {           
        this.setState({
            ignoreLanguage: !this.state.ignoreLanguage
        });
    }

    render () {
        return (
            <div style={{width: "100%"}}>
                <Form inverted>
                    <Segment id="criteria-bar" raised inverted>
                        <Label id="criteria-header" color='orange' floating>Filters</Label>
                        <Positions onChange={this.onChangePositions} positions={this.state.positions} />
                        <AgeGroups onChange={this.onChangeAgeGroup} ageGroups={this.state.ageGroups} />
                        <AllLanguages onChange={this.onChangeAllLanguages} ignoreLanguage={this.state.ignoreLanguage} />
                        <VoiceChat onChange={this.onChangeVoiceChat} voiceChat={this.state.voiceChat}/>
                    </Segment>
                </Form>
            </div>
        );
    }
}