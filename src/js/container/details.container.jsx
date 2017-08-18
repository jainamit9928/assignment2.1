import React, { Component } from 'react'
import * as stateActions from '../actions/actions'
import { connect } from 'react-redux'
import TechieDetails from '../components/details.component'
import { bindActionCreators } from 'redux'
import Loader from 'react-loader'
import {LOADER_OPTIONS} from '../constants/constants'
import ErrorComponent from '../components/showerror.component'

const mapStateToProps = state => {
 return {
     filteredTechie:state.details.filteredTechie,
     isFetching:state.details.isFetching,
     errorMessage:state.details.errorMessage
 }
}

const mapDispatchToProps = (dispatch, ownProps) => {
      return {
       actions:bindActionCreators(stateActions,dispatch)
    }
}



class DetailsContainer extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
         this.props.actions.getFilteredDataRequest(this.props.match.params.id);
    }

    render() {
        return (
              <Loader loaded={ !this.props.isFetching } className='spinner' options={LOADER_OPTIONS}>
              <ErrorComponent className='error' dataNotFetched={ Object.keys(this.props.filteredTechie).length > 0 ? false : true } errorMessage={ this.props.errorMessage } />
                {
                   Object.keys(this.props.filteredTechie ).length > 0 && <TechieDetails params ={ this.props.match.params.id } isFetching ={ this.props.isFetching } filteredTechie={ this.props.filteredTechie }  actions={ this.props.actions } />
                }
                
            </Loader>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailsContainer);