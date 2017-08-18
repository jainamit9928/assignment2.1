import React from 'react'
import { getData, getVisibleTechies, updateData } from '../apis/api'
import PropTypes from 'prop-types'
import Modal from './modal.component.jsx'
import TechieInfoEdit from './techieinfoedit.component'
import TechiInfo from './techieinfo.component'
import { HEADER } from '../constants/constants'


class TechieDetails extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isModalOpen: false,
            techie: {}
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onUpdate = this.onUpdate.bind(this)
    }

    componentDidMount() {
        this.setState({ techie: Object.assign({}, this.props.filteredTechie) })
    }

    onUpdate() {
        this.props.actions.updatDataRequest(this.state.techie.id, this.state.techie)
        this.closeModal()
        
    }

    onChange(e) {
        let temp = this.state.techie
        let key = e.target.name
        temp[key] = e.target.value
        this.setState({ techie: Object.assign({}, temp) })
    }
    openModal() {
        this.setState({ isModalOpen: true })
    }

    closeModal() {
        this.setState({ isModalOpen: false })

    }

    render() {
        return (
            
            <div>
                {
                    Object.keys(this.props.filteredTechie).length > 0 && (
                        <div>
                            <TechiInfo techie={ this.props.filteredTechie } />
                            <button type='button' className='btn btn-info col-md-offset-5' value='edit' onClick={ () => this.openModal() }>Edit</button>
                            <Modal header={ HEADER } isOpen={ this.state.isModalOpen } onClose={ () => this.closeModal() }>
                                <TechieInfoEdit onChange={ this.onChange } techie={ this.state.techie } onUpdate={ this.onUpdate } onClose={ this.closeModal } />
                            </Modal>
                        </div>
                    )
                }
            </div>

        )
    }

}


export default TechieDetails
