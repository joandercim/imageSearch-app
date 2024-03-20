import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import ImgSearch from '../components/ImgSearch';

function Home() {
  const {
    auth0: { isAuthenticated, loginWithRedirect },
  } = useContext(AppContext);

  return (
    <div className="container mx-auto max-w-[2000px] min-h-[80dvh] text-center">
      <h1 className="text-5xl text-center pt-[150px]">ImageSearch</h1>
      {isAuthenticated ? (
        <ImgSearch />
      ) : (
        <>
          <h2 className="text-3xl">Login to search for images</h2>
          <button
            onClick={loginWithRedirect}
            className="border border-slate-800 rounded-lg my-2 px-4 py-1.5 hover:shadow-sm hover:shadow-slate-800 hover:border-slate-700"
          >
            Click to login
          </button>
        </>
      )}
    </div>
  );
}
export default Home;
