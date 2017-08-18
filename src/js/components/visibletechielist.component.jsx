import React from 'react'
import Techie from './techie.component'
import PropTypes from 'prop-types'
import ErrorComponent from './showerror.component'

const VisibleTechieList = (props) => {
    let noData =false;
    if(props.queryParam != 'noparam' && !props.visibleTechies.length > 0){
        noData =true
     }
    return (
        <div>
            { props.visibleTechies.length>0 ?(props.visibleTechies.map(techie => <Techie key={ techie.id } techie={ techie } />)) : (<ErrorComponent  noDataFound={ noData } />) }
        </div>
    )

}

VisibleTechieList.propTypes = {
   visibleTechies:PropTypes.array.isRequired
};
export default VisibleTechieList