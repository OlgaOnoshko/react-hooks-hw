import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Component } from "react";
import Searchbar from "./Searchbar";
// import getImages from './Services';
import { Audio } from 'react-loader-spinner';
import ImageGallery from "./ImageGallery/ImageGallery";
import LoadMoreBtn from "./LoadMoreBtn/LoadMoreBtn";
import Modal from './Modal';
import getImages from '../service-api/images-api';
import { Gallery } from './App.styled'


export class App extends Component {
  state = {
    status: 'idle',
    searchQuery: '',
    images: [],
    page: 1,
    isModalOpen: false,
    modalImage: '',
    tags: '',
    error: null,
  }

  async componentDidUpdate(prevProps, prevState) {
    const { searchQuery, page } = this.state;
    if (searchQuery !== prevState.searchQuery) {
      this.setState({ page: 1 })
      this.setState({ images: [] });
      this.fetchImages();
    }
    if (page !== prevState.page) {
      this.fetchImages();
    }
  }

    fetchImages = () => {
    const { searchQuery, page } = this.state
    
    this.setState({ status: 'pending' });
      try {
        getImages(searchQuery, page)
          .then(data => {
            const images = data.hits.map(({ id, tags, webformatURL, largeImageURL }) => {
              return {
                id,
                tags,
                webformatURL,
                largeImageURL
              }
              
            })
            if (images.length === 0) {
              toast.error('Nothing found on request!')
            }
            this.setState(prevState => ({ images: [...prevState.images, ...images] }))
            this.scrollDown();
            this.setState({ status: 'resolved' });
          })
      } catch (error) {
      this.setState({ error, status: 'rejected' });
    }
  };

  scrollDown = () => {
    window.scrollTo({
      top: 1000,
      behavior: "smooth",
    });
  };

  onFormSubmit = (inputContent) => {
      this.setState({ searchQuery: inputContent })
  }

  onLoadMoreBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page += 1}))
  }

  toggleModal = () => {
    this.setState(prevState => ({isModalOpen: !prevState.isModalOpen}))
  }

  setModalImage = (largeImageURL, tags) => {
    this.setState({ modalImage: largeImageURL });
    this.setState({ tags });
    this.toggleModal();
  }
   
  render() {
    const { status, images, modalImage, isModalOpen, tags, error, page } = this.state;
    const { onLoadMoreBtnClick, onFormSubmit, setModalImage, toggleModal } = this;
    const nextPage = page + 1;
    
    if (status === 'idle') {
      return (
      <>
      <Searchbar onSubmit={onFormSubmit} />
          <ToastContainer theme='dark' />
      </>
      )
    }

    if (status === 'pending') {
      return <Audio />
    }
    
    if (status === 'rejected') {
      return <h1>{error.message}</h1>
    }

    if (status === 'resolved') {
      return (
        <Gallery>
        <Searchbar onSubmit={onFormSubmit} />
        <ImageGallery images={images} onOpenModal={setModalImage} />
        {images.length > 0 && images.length % 12 === 0 && <LoadMoreBtn onClick={onLoadMoreBtnClick} nextpage={nextPage}/>}
        {isModalOpen && <Modal onClose={toggleModal}>
          <img src={modalImage} alt={tags} />
        </Modal> }
        <ToastContainer theme='dark' />
        </Gallery>
      )
    };

   
  }  
};
