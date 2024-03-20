import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import SavedImgCard from '../components/SavedImgCard';
import { deleteImage, getUserImages } from '../services/imageServices';
import { IUserImg } from '../models/IUserImg';
import Toast from '../components/shared/Toast';
import ConfirmModal from '../components/shared/ConfirmModal';

function SavedImages() {
  const [userImgs, setUserImgs] = useState<IUserImg[] | undefined>();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [idToRemove, setIdToRemove] = useState('');

  const {
    toggleToast,
    auth0: { isAuthenticated, loginWithRedirect, user },
  } = useContext(AppContext);

  useEffect(() => {
    if (userImgs || !user?.sub) return;

    const getImages = async () => {
      const imgs = await getUserImages(user);
      setUserImgs(imgs.data.images);
    };

    let shouldRun = true;

    if (shouldRun) {
      getImages();
    }

    return () => {
      shouldRun = false;
    };
  });

  const handleDelete = (id: string) => {
    setIdToRemove(id);
    setShowConfirmModal(true);
  };

  const handleConfirm = async () => {
    try {
      if (user && user.sub) {
        await deleteImage(idToRemove, user.sub);
        const imgs = await getUserImages(user);
        setUserImgs(imgs.data.images);
        toggleToast();
        setShowConfirmModal(false)
      }
    } catch (error) {
      console.error('Something went wrong', error);
    }
  };

  const handleAbort = () => {
    setShowConfirmModal(false);
  };

  return (
    <>
      <div className="container mx-auto max-w-[2000px] min-h-[80dvh] text-center pt-[80px]">
        <h1 className="text-5xl text-center mb-5">ImageSearch</h1>
        {isAuthenticated && (
          <h1 className="text-3xl text-center">
            {user?.nickname
              ? user.nickname.charAt(0).toUpperCase() + user.nickname.slice(1)
              : user?.name}
            's favorite images
          </h1>
        )}

        {isAuthenticated ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mx-2 mt-10">
            {userImgs?.map((img, index) => (
              <SavedImgCard
                handleDelete={handleDelete}
                img={img}
                key={`${img.title}_${index}`}
              />
            ))}
          </div>
        ) : (
          <>
            <h2 className="text-3xl">Login to view saved images.</h2>
            <button
              onClick={loginWithRedirect}
              className="border border-slate-800 rounded-lg my-2 px-4 py-1.5 hover:shadow-sm hover:shadow-slate-800 hover:border-slate-700"
            >
              Click to login
            </button>
          </>
        )}
      </div>
      <Toast type="deleted" />
      {showConfirmModal && (
        <ConfirmModal
          handleAbort={handleAbort}
          handleConfirm={handleConfirm}
          showConfirmModal={showConfirmModal}
        />
      )}
    </>
  );
}
export default SavedImages;
