import React from "react";
import {ImageGalleryItems} from "../ImageGalleryItem/ImageGalleryItem"


export const ImageGallery = ({ images}) => {
    console.log(images)
    return (
        <ul>
            {images.map(({id, webformatURL, largeImageURL}) => 
            <ImageGalleryItems key={id} webformatURL={webformatURL} largeImg={largeImageURL}/>)}
        </ul>
    )
}