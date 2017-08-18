import React from 'react'
import Techie from './techie.component'
import InputSearch from './inputsearch.component'
import { getData, postData } from '../apis/api'
import ErrorComponent from './showerror.component'
import Loader from 'react-loader'
import {LOADER_OPTIONS} from '../constants/constants'

export default class Home extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.actions.getDataRequest();
    }

    render() {
        return (
        <Loader loaded={ !this.props.isFetching } className='spinner' options={LOADER_OPTIONS}>
            <div className='component-block'>
                { <ErrorComponent className='error'  errorMessage={ this.props.errorMessage }  dataNotFetched={ this.props.techies.length>0 ? false : true }/> }
                { this.props.techies.length > 0 && (
                    <div className='col-md-12'>
                        <InputSearch setSearchKey={ this.props.actions.setSearchKey } searchKey={ this.props.searchKey } clearSearchKey={ this.props.actions.clearSearchKey } />
                        { this.props.techies.map((techie) => (
                            <Techie key={ techie.id } techie={ techie } />
                        ))
                }
                    </div>
                )
                }
            </div>
        </Loader>
        )
    }
}

