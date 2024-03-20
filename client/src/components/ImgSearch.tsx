import { useContext, useEffect, useState } from 'react';
import { ISearchInformation } from '../models/ISearchInformation';
import { IItem } from '../models/IItem';
import { AppContext } from '../context/AppContext';
import { initUser, searchImages } from '../services/imageServices';
import SearchResults from './SearchResults';
import { IUserInDb } from '../models/IUserInDb';

function ImgSearch() {
  const [userInput, setUserInput] = useState('');
  const [searchResults, setSearchResults] = useState<IItem[]>();
  const [searchInfo, setSearchInfo] = useState<ISearchInformation>();
  const [searchComplete, setSearchComplete] = useState(false);
  const [spellingSugg, setSpellingSugg] = useState('');
  const [triggerSearch, setTriggerSearch] = useState(false);

  const {
    auth0: { isAuthenticated, user },
  } = useContext(AppContext);

  useEffect(() => {
    if (!isAuthenticated) return;

    const reqBody: IUserInDb = {
      userId: user?.sub,
      userDetails: {
        favoriteImages: [],
      },
    };

    const getOrCreateUser = async () => {
      await initUser(reqBody);
    };

    getOrCreateUser();
  }, [isAuthenticated]);

  useEffect(() => {
    if (triggerSearch) {
      handleSearch();
      setTriggerSearch(false);
    }
    return;
  }, [triggerSearch]);

  const handleSearch = async () => {
    if (userInput === '') return;

    try {
      setSpellingSugg('');
      const {
        data: { spelling, items, searchInformation },
      } = await searchImages(userInput);

      setSearchResults(items);
      setSearchInfo(searchInformation);

      if (spelling) {
        setSpellingSugg(spelling.correctedQuery);
      }

      setSearchComplete(true);
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  return (
    <>
      <h3 className="m-5">Start searching for inspiration</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setTriggerSearch(true);
        }}
        className="p-2 mx-auto flex justify-between max-w-xl"
      >
        <input
          onChange={(e) => {
            setUserInput(e.target.value);
            setSearchComplete(false);
          }}
          required
          value={userInput}
          type="text"
          placeholder="Type to search"
          className="bg-transparent p-3 flex-grow focus:outline focus:outline-offset-2 focus:outline-1 focus:outline-slate-500 border-slate-700 border rounded-lg"
        />
        <button className="border border-slate-700 rounded-lg ml-3 px-4 py-3 hover:shadow-sm hover:shadow-slate-600 hover:border-slate-600">
          Search
        </button>
      </form>
      <div>
        {spellingSugg !== '' && (
          <p className="text-slate-400">
            <em>
              Did you mean{' '}
              <span
                className="underline text-slate-300  cursor-pointer"
                onClick={() => {
                  setUserInput(spellingSugg);
                  setSpellingSugg('');
                  setTriggerSearch(true);
                }}
              >
                {spellingSugg}
              </span>
              ?
            </em>
          </p>
        )}
        {searchComplete && (
          <p className="text-slate-500">
            <em>
              {!searchResults
                ? `No results for "${userInput}".`
                : `Searched for ${searchInfo?.searchTime} seconds.`}
            </em>
          </p>
        )}
      </div>
      <SearchResults searchResults={searchResults} />
    </>
  );
}

export default ImgSearch;
