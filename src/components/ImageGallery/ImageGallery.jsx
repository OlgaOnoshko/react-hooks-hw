import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';

export default function ImageGallery({ images, onOpenModal }) {
    return (
        <Gallery>
                {images.map((image) => (
                <ImageGalleryItem openModal={onOpenModal} image={image}
                 
                />
       ))}
        </Gallery>
    )
};

ImageGallery.propTypes = {
    onOpenModal: PropTypes.func,
    images: PropTypes.arrayOf(PropTypes.shape),
};