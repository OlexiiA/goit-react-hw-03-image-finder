import React, { Component } from "react";

export class Modal extends Component {
  
    componentDidMount() {
        window.addEventListener("keydown", this.handleKeyDown);
      }
    
      componentWillUnmount() {
        window.removeEventListener("keydown", this.handleKeyDown);
      }
    
      handleKeyDown = (e) => {
        if (e.code === "Escape") {
          this.props.onCloseEsc();
        }
      };
    
      handleBackdropClick = (e) => {
        if (e.currentTarget === e.target) {
          this.props.onCloseEsc();
        }
      };

    render(){
        const { image } = this.props;
        return(
            <div className="overlay">
            <div className="modal">
              <img src={image} alt="" />
            </div>
          </div>
        )
    }
}