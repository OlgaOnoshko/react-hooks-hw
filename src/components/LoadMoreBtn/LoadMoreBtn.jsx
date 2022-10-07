import React from 'react';
import PropTypes from 'prop-types';
import { LoadMore } from './LoadMoreBtn.Styled'

export default function LoadMoreBtn({ onClick, nextpage }) {

    return (
        <LoadMore type='button' onClick={onClick}>
        Load more images from page {nextpage}
        </LoadMore>
    )
};

LoadMoreBtn.propTypes = {
    onClick: PropTypes.func,
    nextpage: PropTypes.number,
};