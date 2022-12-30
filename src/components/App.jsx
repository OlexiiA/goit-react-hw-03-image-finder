import React, { Component } from "react";
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Searchbar } from './Searchbar/Searchbar'
import { Modal } from "./Modal/Modal";
import { fetchImg } from "../services/api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader"
import { Wrapper } from "./App.styled";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


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
          throw new Error('Images with your query was not found');
        }
        this.setState(prevState => ({
          images: [...prevState.images, ...res.data.hits],
          status: 'finished'
        }))
      }

    } catch (error) {
      toast.error(error.message, {
        position: "top-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      this.setState({ status: 'idle' });

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
        <ImageGallery images={images} onClick={this.toggleModal} />
        {status === 'loading' && <Loader />}
        {status === 'finished' && <Button loadMore={this.loadMore} />}
        {modalImg && <Modal image={modalImg} onModalClose={this.toggleModal} />}
        <ToastContainer />
      </Wrapper>
    )
  }
}
