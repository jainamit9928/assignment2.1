import React from 'react'
import { Link } from 'react-router-dom'

const InputSearch = (props) => {
return(
<div className='form-inline'>
                <div className='form-group has-feedback'>
                    <input type='text' className='form-control' value={ props.searchKey } onChange={ (e) => props.setSearchKey(e.target.value) }></input>
                    { props.searchKey && <span className='glypho' onClick={ props.clearSearchKey }>x</span> }
                </div>
                <Link  to={ `/search/${props.searchKey}` }><input  type='button'  className='btn btn-info' value='Search' /></Link>
            </div>
)
}

export default InputSearch