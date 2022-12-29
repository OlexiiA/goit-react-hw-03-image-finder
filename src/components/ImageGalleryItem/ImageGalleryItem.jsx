import React from "react";
import { ItemGallery, Img } from "./ImageGalleryItem.styled"

export const ImageGalleryItem = ({ webformatURL, largeImageURL, onClick }) => {

    return (
        <ItemGallery>
            <Img src={webformatURL} onClick={() => onClick(largeImageURL)} alt="" />
        </ItemGallery>
    )

}