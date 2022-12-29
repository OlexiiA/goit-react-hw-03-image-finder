import React from "react";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem"
import { List } from './ImageGallery.styled'

export const ImageGallery = ({ images, ...otherProps }) => {
    return (
        <List>
            {images.map(({ id, webformatURL, largeImageURL }) =>
                <ImageGalleryItem key={id} webformatURL={webformatURL} largeImg={largeImageURL} {...otherProps} />)}
        </List>
    )
}