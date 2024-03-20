import { FaTrash } from 'react-icons/fa';
import { IUserImg } from '../models/IUserImg';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';

interface ISavedImgCardProps {
  img: IUserImg;
  handleDelete: (link: string) => void;
}

function SavedImgCard({ img, handleDelete }: ISavedImgCardProps) {
  const { nav } = useContext(AppContext);

  return (
    <>
      <div
        className={`${
          nav ? '-z-50' : ''
        } max-w-[97%] flex justify-center bg-slate-800 rounded-md mx-auto items-center flex-col mb-5 shadow-xl shadow-[#00000040] relative`}
      >
        <div
          onClick={() => handleDelete(img.id)}
          className="trash-container absolute bottom-8 right-8 w-12 h-12 flex justify-center items-center bg-[#00000099] cursor-pointer rounded-full opacity-70 hover:opacity-100"
        >
          <FaTrash />
        </div>
        <img
          className="object-cover h-full p-1.5 block"
          src={img.link}
          alt={img.title}
        />
      </div>
    </>
  );
}
export default SavedImgCard;
