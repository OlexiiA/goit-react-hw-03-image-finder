import React from "react";

export const ImageGalleryItems = ({ webformatURL, largeImageURL, onClick }) => {

    return (
        <li>
            <img src={webformatURL} onClick={() => onClick(largeImageURL)}alt="" />
        </li>
    )

}