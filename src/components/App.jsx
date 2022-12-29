import React, { Component } from "react";
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Searchbar } from './Searchbar/Searchbar'
import { Modal } from "./Modal/Modal";
import { fetchImg } from "../services/api";
import { Button } from "./Button/Button";
import { Wrapper } from "./App.styled";
import {Loader} from "./Loader/Loader"
// import { ToastContainer, toast } from 'react-toastify';


export class App extends Component {

  state = {
    search: '',
    page: 1,
    images: [],
    modalImg: '',
    status: 'idle',
  }

  async componentDidUpdate(_, prevState) {
    const { page, search } = this.state
    try {
      if (prevState.search !== search || prevState.page !== page) {
        this.setState({ status: 'loading' })
        const res = await fetchImg(search, page);
        if (res.data.total === 0) {
          throw alert('Images with your querry was not found');
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits],
          status: 'finished'
        }))
      }

    } catch (error) {

    }
  }

  hadleSubmit = (value) => {
    this.setState({
      search: value.search,
      images: [],
      page: 1,
    })
  }

  toggleModal = (image) => {
    this.setState({ modalImg: image });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }))
  }



  render() {
    const { images, modalImg, status } = this.state;

    return (
      <Wrapper>
        <Searchbar onSubmit={this.hadleSubmit} />
        <ImageGallery images={images} onClick={this.toggleModal}/>
        {status === 'loading' && <Loader />}
        {status === 'finished' && <Button loadMore={this.loadMore} />}
        {modalImg && <Modal image={this.modalImg} onModalClose={this.toggleModal} />}
      </Wrapper>
    )
  }
}
