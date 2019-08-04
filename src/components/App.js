import React from 'react';
import SearchBar from './SearchBar';
import PhotoList from './PhotoList';
const API_KEY = 'b7389b2757283fd027784b50f6043f492789c87acb18fd5814ab667281e946e8';

class App extends React.Component {
  constructor(props){
    super(props)

    this.state={
      photos: [],
      term: ''
    }
  }

  componentDidMount() {
    if (this.state.term !== "") {
      this.fetchPhotos(this.state.term)
    } else {
      this.fetchPhotos('coding')
    }
  }

  fetchPhotos = (term) => {
    fetch(`https://api.unsplash.com/search/photos?page=1&query=${term}&client_id=${API_KEY}`)
      .then(resp => { return resp.json() })
      .then(data => {
        this.setState({
          photos: data.results
        })
      })
  }

  changeSearchTermState = (event) => {
    this.setState({
      term: event.target.value
    }, () => {this.state.term === "" ? this.fetchPhotos('coding') : this.fetchPhotos(this.state.term)})
  }

  render() {
    return (
      <div>
        <SearchBar changeSearchTermState={this.changeSearchTermState} value={this.state.term} />
        <PhotoList photos={this.state.photos} />
      </div>
    )
  }
}

export default App;