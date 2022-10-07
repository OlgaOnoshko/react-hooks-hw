import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.Styled'

export default function ImageGalleryItem({ image, openModal }) {
    const {id, tags, webformatURL, largeImageURL } = image;
    return (
        <GalleryItem key={id} onClick={() => openModal(largeImageURL, tags)}>
                    <GalleryImage src={webformatURL} alt={tags}
                    
            />
        </GalleryItem>
    )
};

ImageGalleryItem.propTypes = {
    image: PropTypes.shape({
        id: PropTypes.number,
        tags: PropTypes.string,
        webformatURL: PropTypes.string,
        largeImageURL: PropTypes.string,
    }),
    openModal: PropTypes.func,
};