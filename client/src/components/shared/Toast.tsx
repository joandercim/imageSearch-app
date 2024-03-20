import { MotionConfig, motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
interface IToastProps {
  type: string;
}

function Toast({ type }: IToastProps) {
  const { showToast } = useContext(AppContext);

  let bgClass;
  let text;
  if (type === 'saved') {
    bgClass = 'bg-[rgba(20,83,45,.6)]';
    text = 'Image saved to favorites';
  } else if (type === 'deleted') {
    bgClass = 'bg-[rgba(239,68,68,.9)]'; 
    text = 'Image deleted from favorites';
  }

  const spring = {
    type: "spring", 
    damping: 15,
    stiffness: 150,
  }

  return (
    <MotionConfig
      transition={{
        duration: .1,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        style={{ bottom: '-50px' }}
        variants={{
          visible: {
            bottom: 50
          },
          hidden: {
            bottom: -50,
          }
        }}
        transition={spring}
        animate={showToast ? 'visible' : 'hidden'}
        className="fixed bottom-16 translate-x-[-50%] left-[50%] w-full"
      >
        <div
          className={`mx-auto h-12 w-[380px] rounded-xl flex flex-col justify-center items-center ${bgClass}`}
        >
          <span>
            <em>{text}</em>
          </span>
        </div>
      </motion.div>
    </MotionConfig>
  );
}
export default Toast;
