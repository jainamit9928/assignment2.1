import React from 'react'
import InputSearch from './inputsearch.component'
import { getData } from '../apis/api'
import VisibleTechieList from './visibletechielist.component'
import ErrorComponent from './showerror.component'
import Loader from 'react-loader'
import {LOADER_OPTIONS} from '../constants/constants'

class SearchComponent extends React.PureComponent {
    constructor(props) {
        super(props)
        console.log("visible techies",this.props.visibleTechies)
    }
    componentDidMount() {
        this.props.actions.getDataRequest();
    }
    render() {
        return (
          <Loader loaded={ !this.props.isFetching } className='spinner' options={LOADER_OPTIONS}>
                {
                this.props.techies.length>0 ? 
                (<Search techies={ this.props.techies } queryParam={ this.props.match.params.id ? this.props.match.params.id:"noparam" } searchKey ={ this.props.searchKey } actions ={ this.props.actions } visibleTechies = { this.props.visibleTechies } />)
                : (<ErrorComponent className='error'  errorMessage ={ this.props.errorMessage }  dataNotFetched={ this.props.techies.length>0  ? false : true }/> )
                }
           </Loader>
        )
    }
}

const Search = (props) => {
    return (

        <div className='component-block'>
                <div className='col-md-12'>
                    <InputSearch setSearchKey={ props.actions.setSearchKey } searchKey={ props.searchKey } clearSearchKey={ props.actions.clearSearchKey } />
                    <VisibleTechieList queryParam={ props.queryParam } visibleTechies={ props.visibleTechies } />
                </div>
        </div>
    )
}
export default SearchComponent
