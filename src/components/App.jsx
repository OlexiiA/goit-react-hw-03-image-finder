import React, { Component } from "react";
// import axios from 'axios';
import { ImageGallery } from './ImageGallery/ImageGallery'
import { Searchbar } from './Searchbar/Searchbar'
import { Modal } from "./Modal/Modal";
import { fetchImg } from "../services/api";



// axios.defaults.baseURL = 'https://pixabay.com/api/';
// axios.defaults.headers.common['x-api-key'] = process.env.REACT_APP_API_KEY;




export class App extends Component {
  state = {
    search: '',
    page: 1,
    images: [],
    showModal: false,
    status: 'idle',
  }

  // async componentDidMount() {
  //   try {
  //     const response = await axios.get('https://pixabay.com/api/?q=cat&page=1&key=31231655-992b28151641be737833166f6&image_type=photo&orientation=horizontal&per_page=12')
  //     this.setState({ images: response.data.hits })
  //   } catch (error) {

  //   }
  // }


  async componentDidUpdate(_, prevState) {
    const {page, search} = this.state
   try {
    const res = fetchImg(search, page);
    this.setState(prevState => ({
      images:[...prevState.images, ...this.images(res.data.hits)]
    }))
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

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal
    }))
  }



  render() {
    const { images, showModal  } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.hadleSubmit}/>
        <ImageGallery images={images} />
       { showModal && <Modal onCloseEsc={this.toggleModal}/>}
      </>
    )
  }
}
