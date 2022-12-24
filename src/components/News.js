import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general',
    apiKey: '439f2438279f42a2b47bbbae2b53888e'
  }
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  // in class based components, we use this keyword to access any variable or function inside the class
  // in class based components we use constructor to initialize the state
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  // async is used to make the function asynchronous and await is used to wait for the data to be fetched from the api
  // in class based components we use componentDidMount to fetch data from the api
  async updateNews() {
    // fetch data from the url and convert it into json and the update our articles variable which is initialized in constructor setState 
    // await is used to wait for the data to be fetched and then only the next line will be executed
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json();
    // console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
  }

  async componentDidMount() {
    this.updateNews();
  }
  handlePrevClick = async () => {
    await this.setState({ page: this.state.page - 1 });
    this.updateNews();
  }
  handleNextClick = async () => {
    await this.setState({ page: this.state.page + 1 });
    this.updateNews();
  }

  render() {
    return (
      <div className='container my-3'>
        <h2 className='text-center' style={{ margin: "30px" }}>NewsBuster - Top Headlines</h2>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading && this.state.articles.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
