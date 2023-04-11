import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import SearchForm from './SearchForm';
import { PropTypes } from 'prop-types';
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';

/*
React Component Life-cycle consists of the following: 
Mounting or birth of components
Update or growth of components
Unmount or death of components
For more refer: https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/
*/

export default function News(props) {

  // states to handle articles
  const [articles, setArticles] = useState([]);
  // state for showing and hiding the spinner
  const [loading, setLoading] = useState(true);
  // state to handle the page number in URL
  const [page, setPage] = useState(1);
  // state to handle the number of results (later used)
  const [totalResults, setTotalResults] = useState(0);
  // set the title according to the category being fetched
  document.title = `NewsApp | ${_.capitalize(props.category)} News`

  // a function to update the articles according to the page number passed to it
  async function updateArticles(pageNo) {
    props.setProgress(15);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${pageNo}`;
    // set loading to true to show the spinner
    setLoading(true);
    // fetching all the news from the API with the help of URL variable
    let data = await fetch(url);
    // parse the data obtained from the fetch API 
    let parsedData = await data.json();
    props.setProgress(45);
    // set the articles state to the articles
    setArticles(parsedData.articles);
    // set the total results as the number of articles fetched
    setTotalResults(parsedData.totalResults);
    // set loading to false to disable the spinner
    setLoading(false);
    props.setProgress(100);
  }

  // using the useEffect hook so that the articles are populated as soon as the page loads for the first time
  useEffect(() => {
    updateArticles(page);
    // eslint-disable-next-line
  }, []);

  // componentDidUpdate method is invoked when DOM is updated in response to prop or state changes
  // componentWillUnmount method is called just before the component is unmounted and destroyed (for cleanups)

  // function to fetch more data when the page is scrolled
  const fetchMoreData = async () => {
    // set page as page+1 so that the next page data is fetched
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=${props.pageSize}&page=${page + 1}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    setPage(page + 1);
    // we need to concatenate the newly fetched articles to the already present articles
    setArticles(articles.concat(parsedData.articles));
    // reset the total results count
    setTotalResults(parsedData.totalResults);
  };

  // function to handle search queries
  const fetchSearchData = async (searchQuery) => {
    props.setProgress(15);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&pageSize=100`;
    // we show the spinner till the data is fetched
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
    props.setProgress(45);
    // we filter the data we have obtained using the filter function, and then set the articles
    // eslint-disable-next-line
    let searchedData = parsedData.articles.filter((article) => {
      // if search query is empty we return all articles
      if(searchQuery === "") return article;
      else if(article.title.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1 ||  (article.description && article.description.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1) || (article.source.name && article.source.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)) {
        return article;
      }
    });

    // set the articles state to the search obtained data
    setArticles(searchedData);
    // set the total results
    setTotalResults(searchedData.length);
    // set loading as false to disable the spinner
    setLoading(false);
    props.setProgress(100);
  }


  // used to render HTML of the current component (required for class-based component to render the DOM)
  // runs during mounting and updating of component
  // should be pure (no state modification!!) - by design 
  return (
    <>
      <div className="container" style={{
        marginTop: "100px"
      }}>
        <SearchForm fetchSearchData={fetchSearchData}/>
      </div>
      <h2 className="text-center" style={{
        margin: "35px 0px"
      }}>Top {_.capitalize(props.category)} News</h2>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={articles.length <= totalResults && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {/* displaying articles only if more than 0 otherwise display a text saying no results */}
            {articles.map((article) => {
              return (
                <div className="col-md-4 my-3">
                  <NewsItem key={article.url} title={article.title} description={article.description} imageURL={!article.urlToImage ? "https://media.istockphoto.com/photos/breaking-news-3d-rendering-virtual-set-studio-picture-id1219965949?k=20&m=1219965949&s=612x612&w=0&h=9yXmM0qrzrAtVCn3p2F8RwVzsFn-qD44jIWAFyK8wGM=" : article.urlToImage} url={article.url} author={article.author} date={article.publishedAt} source={article.source.name} />
                </div>)
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  )
}

// setting default values for props
News.defaultProps = {
  country: 'in',
  pageSize: 8,
  category: 'general'
}

// setting the types for the received props
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}