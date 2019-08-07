import React from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { debounce } from "throttle-debounce";

import { searchConstants as CONFIG } from "../../constants";
import { searchAction } from "../../actions";
import LoadingSpinner from "../common/loader";
import SearchResult from "./SearchResult";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      isLoading: false,
      hitCount: 0,
      session: false
    };
    this.searchDebounced = debounce(CONFIG.BOUNCE, this.searchPlanet);
    this.sessionTime = null;
  }

  searchPlanet = () => {
    const { query } = this.state;
    this.props.search(query);
  };

  onChange = isSearchQuery => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            if (this.props.fullName === CONFIG.SPECIFICUSER) {
              let currentTime = new Date();
              if (!this.state.session) {
                this.sessionTime = new Date(currentTime);
                this.sessionTime.setMinutes(currentTime.getMinutes() + 1);
              }
              if (
                this.sessionTime.getTime() > currentTime.getTime() &&
                this.state.hitCount < CONFIG.MAXCOUNT
              ) {
                this.setState(
                  {
                    ...this.state,
                    hitCount: this.state.hitCount + 1,
                    session: true
                  },
                  () => {
                    this.searchPlanet();
                  }
                );
              } else {
                if (this.sessionTime.getTime() < currentTime.getTime()) {
                  this.setState({
                    ...this.state,
                    hitCount: 0,
                    session: false
                  });
                }
              }
            } else {
              this.searchDebounced();
            }
          }
        } else {
          if (isSearchQuery) {
            this.setState(
              {
                ...this.state,
                query: "noresult"
              },
              () => {
                this.searchPlanet();
              }
            );
          }
        }
      }
    );
  };

  onKeyDown = e => {
    const key = e.keyCode || e.charCode;
    if (key === 8 || (key === 46 && this.state.query.length < 2)) {
      this.onChange(true);
    } else {
      return false;
    }
  };

  render() {
    const { error, results, isLoading } = this.props;
    return (
      <div className="searchBar">
        <form autoComplete="off">
          <label className="search-label" htmlFor="search-input">
            <input
              type="text"
              name="query"
              id="search-input"
              placeholder="Search planets..."
              ref={input => (this.search = input)}
              onChange={this.onChange}
              onKeyDown={this.onKeyDown}
            />
            <i className="fa fa-search search-icon" />
          </label>
          {error && (
            <div className="searchMessage">
              <h2 className="alert">{error}</h2>
            </div>
          )}
        </form>
        {isLoading && <LoadingSpinner message={"Searching planet..."} />}
        {results && results[0] && <SearchResult results={results} />}
      </div>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func,
  query: PropTypes.string,
  result: PropTypes.object,
  error: PropTypes.string,
  isLoading: PropTypes.bool
};

const mapStateToProps = state => {
  const { query, results, error, isLoading } = state.search;
  const { fullName } = state.auth.user;
  return { query, results, error, isLoading, fullName };
};

const dispatchStateToProps = {
  search: searchAction.search
};

const connectedSearchBar = connect(
  mapStateToProps,
  dispatchStateToProps
)(SearchBar);
export { connectedSearchBar as SearchBar };