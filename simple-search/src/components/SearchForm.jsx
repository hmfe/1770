import React, { useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';

import useSearchAutocomplete from '../hooks/useSearchAutocomplete';
import SearchBox from './SearchBox';

// styles
const HistorySection = styled.section`
  width: var(--content-width);

  @media (max-width: 768px) {
    width: var(--content-width-mobile);
  }
  @media (min-width: 1440px) {
    width: var(--content-width-large);
  }
`;

const SearchHistoryHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ClearHistoryButton = styled.button`
  padding: 10px 14px;
  border-radius: 4px;
  border: none;
  background-color: #ffdab9;
  color: #000d24;
  font-size: 12px;

  :hover {
    cursor: pointer;
    background-color: #ffb879;
  }

  :focus {
    outline: none;
    box-shadow: 0 0 0 0.025rem #fff, 0 0 0 0.3rem #ffdab9;
  }
`;

const DeleteSelectedHistoryButton = styled.button`
  border: none;
  background-color: transparent;
  :hover {
    cursor: pointer;
  }
`;

const AutocompleteList = styled.ul`
  list-style: none;
  border: 2px solid #eee;
  border-radius: 4px;
  margin: 0;
  padding: 0;
  width: var(--content-width);

  @media (max-width: 768px) {
    width: var(--content-width-mobile);
  }
  @media (min-width: 1440px) {
    width: var(--content-width-large);
  }
`;

const AutocompleteListItem = styled.li`
  padding: 16px 25px;

  &:hover {
    background-color: #f3f3f3;
    cursor: pointer;
  }
`;

const SearchHistoryList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const SearchHistoryListItem = styled.li`
  padding: 10px 16px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;

  &:first-child {
    border-top: 1px solid #eee;
  }
`;

// the component
const SearchForm = () => {
  const [inputText, setInputText] = useState('');
  const {
    searchRecipes,
    searchAutocompleteResults,
    searchRecipesImmediately,
  } = useSearchAutocomplete();
  const [searchHistory, setSearchHistory] = useState([]);

  const handleSearchInputChange = event => {
    const { value } = event.target;

    setInputText(value);
    searchRecipes(value);
  };

  const handleSearchOnKeyDown = async event => {
    const {
      target: { value },
      keyCode,
    } = event;

    if (keyCode === 13) {
      const currentTimestamp = moment().format('LLL');
      setSearchHistory([...searchHistory, { value, timestamp: currentTimestamp }]);
      setInputText('');
    }
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const deleteSelectedHistory = (searchString, index) => {
    setSearchHistory(searchHistory.filter(element => element !== searchString));
  };

  const renderSearchHistory = () => {
    if (!searchHistory.length) {
      return null;
    }

    const resultsList = searchHistory.map((searchItem, index) => {
      return (
        <SearchHistoryListItem key={searchItem.timestamp + index}>
          {searchItem.value}{' '}
          <DeleteSelectedHistoryButton
            aria-label='delete selected search history'
            onClick={() => deleteSelectedHistory(searchItem, index)}
          >
            <svg
              aria-label='delete icon'
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              viewBox='0 0 24 24'
            >
              <path d='M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z' />
            </svg>
          </DeleteSelectedHistoryButton>
        </SearchHistoryListItem>
      );
    });

    return (
      <HistorySection>
        <SearchHistoryHeader>
          <h5>Search history</h5>
          <ClearHistoryButton onClick={clearSearchHistory}>
            clear search history{' '}
            <span role='img' aria-label='shush emoji'>
              🤫
            </span>
          </ClearHistoryButton>
        </SearchHistoryHeader>
        <SearchHistoryList>{resultsList}</SearchHistoryList>
      </HistorySection>
    );
  };

  const searchOnAutocompleteItemClick = text => {
    setInputText(text);
    searchRecipesImmediately(text);
    setSearchHistory([...searchHistory, text]);
  };

  const renderAutocompleteResults = () => {
    if (!searchAutocompleteResults.length) {
      return null;
    }

    const autocompleteResultsList = searchAutocompleteResults.map(result => {
      const { recipe } = result;
      return (
        <AutocompleteListItem
          key={recipe.url}
          onClick={() => searchOnAutocompleteItemClick(recipe.label)}
        >
          {recipe.label}
        </AutocompleteListItem>
      );
    });

    return <AutocompleteList>{autocompleteResultsList}</AutocompleteList>;
  };

  return (
    <div>
      <SearchBox
        labelText='Search for your favorite food'
        placeholder='e.g. kale'
        value={inputText}
        onChange={handleSearchInputChange}
        onKeyDown={handleSearchOnKeyDown}
      />

      {renderAutocompleteResults()}
      {renderSearchHistory()}
    </div>
  );
};

export default SearchForm;
