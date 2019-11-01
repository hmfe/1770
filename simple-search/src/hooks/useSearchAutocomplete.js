import { useState } from 'react';
import searchApi from '../apis/searchApi';

let timeoutId;

const useSearchAutocomplete = () => {
  const [searchAutocompleteResults, setSearchAutocompleteResults] = useState([]);

  const searchRecipes = async value => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
      const response = await searchApi.get(`/`, {
        params: {
          from: 0,
          to: 10,
          q: value,
        },
      });
      setSearchAutocompleteResults(response.data.hits);
    }, 200);
  };

  const searchRecipesImmediately = async value => {
    const response = await searchApi.get(`/`, {
      params: {
        from: 0,
        to: 10,
        q: value,
      },
    });
    setSearchAutocompleteResults(response.data.hits);
  };

  return {
    searchAutocompleteResults,
    searchRecipes,
    searchRecipesImmediately,
  };
};

export default useSearchAutocomplete;
