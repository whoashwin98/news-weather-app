import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Weather from './components/Weather';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// using the react-top-loading-bar package for showing the top loading bar
import LoadingBar from 'react-top-loading-bar'

export default function App() {

  // state for handling the progress in top loading bar
  const [progress, setProgress] = useState(0);
  // API key is taken from environment variable
  const apiKey = process.env.REACT_APP_NEWS_API;
  const weatherApiKey = process.env.REACT_APP_WEATHER_API;

  return (
    <div>
      {/* showing the loading bar on top of the web-page */}
      <LoadingBar
        color='#ffffff'
        progress={progress}
      />
      {/* using react router to enable navigation between different components and pages without having to reload */}
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<News apiKey={apiKey} setProgress={setProgress} key="general" pageSize={6} country="in" category="general" />} />
          <Route exact path="/business" element={<News apiKey={apiKey} setProgress={setProgress} key="business" pageSize={6} country="in" category="business" />} />
          <Route exact path="/entertainment" element={<News apiKey={apiKey} setProgress={setProgress} key="entertainment" pageSize={6} country="in" category="entertainment" />} />
          <Route exact path="/health" element={<News apiKey={apiKey} setProgress={setProgress} key="health" pageSize={6} country="in" category="health" />} />
          <Route exact path="/science" element={<News apiKey={apiKey} setProgress={setProgress} key="science" pageSize={6} country="in" category="science" />} />
          <Route exact path="/sports" element={<News apiKey={apiKey} setProgress={setProgress} key="sports" pageSize={6} country="in" category="sports" />} />
          <Route exact path="/technology" element={<News apiKey={apiKey} setProgress={setProgress} key="technology" pageSize={6} country="in" category="technology" />} />
          <Route exact path="/weather" element={<Weather apiKey={weatherApiKey} setProgress={setProgress}/>} />
        </Routes>
      </Router>
    </div>
  )
}
