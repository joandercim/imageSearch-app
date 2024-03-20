import { MotionConfig, motion } from 'framer-motion';
import { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { saveImageToFavorites } from '../services/imageServices';
import { v4 as uuidv4 } from 'uuid'
import Toast from './shared/Toast';

interface IImgCardProps {
  imgUrl: string;
  imgTitle: string;
}

function ImgCard({ imgUrl, imgTitle }: IImgCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const isMobile = window.innerWidth <= 1017;
  const hoverVariants = {
    hover: {
      opacity: 1,
      display: 'flex',
    },
    initial: {
      opacity: 0,
      display: 'none',
    },
  };

  const {
    nav, toggleToast,
    auth0: { user },
  } = useContext(AppContext);

  const handleSave = (imgUrl: string) => {
    const reqBody = {
      userId: user?.sub,
      image: {
        id: uuidv4(),
        title: imgTitle,
        link: imgUrl,
      },
    };
    saveImageToFavorites(reqBody);
    toggleToast();
  };

  const handleMouseEnter = () => {
    if (!isMobile) {
      setIsHovered(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile) {
      setIsHovered(false);
    }
  };

  return (
    <>
    <MotionConfig
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        whileHover={'open'}
        variants={{
          open: {
            scale: 1.05,
          },
        }}
        className={`${
          nav ? '-z-50' : ''
        } max-w-[97%] flex justify-center bg-slate-800 rounded-md mx-auto items-center flex-col mb-5 shadow-xl shadow-[#00000040] relative`}
      >
        <img
          className="object-cover h-full p-1.5 block"
          src={imgUrl}
          alt={imgTitle}
        />
        <motion.div
          variants={hoverVariants}
          animate={isHovered ? 'hover' : 'initial'}
          className="h-full w-full absolute top-0 left-0 bg-[#0f172ac5] flex justify-center items-center"
        >
          <button
            className="p-3 border border-slate-500 hover:bg-[#0f172ac5] transition-all uppercase"
            onClick={() => handleSave(imgUrl)}
          >
            Save Image
          </button>
        </motion.div>
        {isMobile && (
          <button
            onClick={() => handleSave(imgUrl)}
            className="border border-slate-700 w-full p-1 bg-slate-700"
          >
            Save Image
          </button>
        )}
      </motion.div>
      </MotionConfig>
      <Toast type={'saved'} />
      </>
  );
}

export default ImgCard;
