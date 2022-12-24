import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export default class App extends Component {
  API = process.env.REACT_APP_NEWS_API;
  pageSize = 9;
  state = {
    progress: 0
  }
  setProgress = (progress) => {
    this.setState({ progress: progress })
  }
  render() {
    return (
      <Router>
        <div>
          <LoadingBar
            height={3}
            color='#f11946'
            progress={this.state.progress}
          />
          <NavBar />
          <Routes>
            {/* we use key here because if we don't use it, than react will see that News is already opened and mounted, so it will not mount the different page again beause all values are same */}
            {/* so we use a key here for each news component to make them different and force mount*/}
            <Route exact path='/' element={
              <News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" apiKey={this.API} />
            } />
            <Route exact path='/business' element={
              <News setProgress={this.setProgress} key="business" pageSize={this.pageSize} country="in" category="business" apiKey={this.API} />
            } />
            <Route exact path='/entertainment' element={
              <News setProgress={this.setProgress} key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" apiKey={this.API} />
            } />
            <Route exact path='/general' element={
              <News setProgress={this.setProgress} key="general" pageSize={this.pageSize} country="in" category="general" apiKey={this.API} />
            } />
            <Route exact path='/health' element={
              <News setProgress={this.setProgress} key="health" pageSize={this.pageSize} country="in" category="health" apiKey={this.API} />
            } />
            <Route exact path='/science' element={
              <News setProgress={this.setProgress} key="science" pageSize={this.pageSize} country="in" category="science" apiKey={this.API} />
            } />
            <Route exact path='/sports' element={
              <News setProgress={this.setProgress} key="sports" pageSize={this.pageSize} country="in" category="sports" apiKey={this.API} />
            } />
            <Route exact path='/technology' element={
              <News setProgress={this.setProgress} key="technology" pageSize={this.pageSize} country="in" category="technology" apiKey={this.API} />
            } />
          </Routes>
        </div>
      </Router>
    )
  }
}
