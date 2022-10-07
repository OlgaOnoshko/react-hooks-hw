import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { Overlay, ModalContent } from './Modal.Styled'
// import './Modal.css'


const modalRoot = document.querySelector('#modal-root')

export default class Modal extends Component {

    componentDidMount() {
        window.addEventListener('keydown', this.onEscClose)
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.onEscClose);
    };

    onEscClose = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    };

    handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
    };
    
    render() {
        return createPortal(
            <Overlay onClick={this.handleBackdropClick}>
                <ModalContent>
                    {this.props.children}
                </ModalContent>
            </Overlay>, modalRoot,)
    }
};

Modal.propTypes = {
    onClose: PropTypes.func,
};

