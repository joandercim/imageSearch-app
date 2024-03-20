import { motion, MotionConfig } from 'framer-motion';
import { useContext, useState } from 'react';
import NavigationSlider from './NavigationSlider';
import { AppContext } from '../context/AppContext';

function Navigation() {
  const [navToggled, setNavToggled] = useState(false);
  const [userMenuToggled, setUserMenuToggled] = useState(false);

  const {
    toggleNavTest,
    auth0: { user, isAuthenticated },
  } = useContext(AppContext);

  const toggleUserMenu = () => {
    setUserMenuToggled(!userMenuToggled);
  };

  const toggleNav = () => {
    setNavToggled(!navToggled);
    toggleNavTest();
  };

  return (
    <div className="flex w-full fixed top-0 right-0 justify-end h-[70px] items-center px-20">
      <MotionConfig
        transition={{
          duration: 0.6,
          ease: 'circInOut',
        }}
      >
        <motion.button
          onClick={() => {
            toggleNav();
          }}
          className="fixed top-7 right-7 h-[20px] w-[30px] z-50"
          animate={navToggled ? 'open' : 'close'}
        >
          <motion.span
            style={{
              left: '50%',
              top: '70%',
              x: '-50%',
              y: '-50%',
            }}
            variants={{
              open: {
                rotate: ['0deg', '0deg', '55deg', '45deg'],
                top: ['70%', '33%', '33%'],
              },
              close: {
                rotate: ['-180deg', '5deg', '0deg'],
                top: ['33%', '70%', '70%'],
              },
            }}
            className="absolute h-[2px] w-5 bg-slate-300"
          />
          <motion.span
            style={{
              left: '50%',
              top: '33%',
              x: '-50%',
              y: '-50%',
            }}
            variants={{
              open: {
                rotate: ['0deg', '0deg', '-55deg', '-45deg'],
              },
              close: {
                rotate: ['-180deg', '0deg', '0deg'],
                scale: [1, 1.3, 1],
              },
            }}
            className="absolute h-[2px] w-5 bg-slate-300"
          />
          <motion.span
            style={{
              left: '50%',
              top: '0%',
              x: '-50%',
              y: '-50%',
            }}
            variants={{
              open: {
                rotate: ['0deg', '0deg', '55deg', '45deg'],
                top: ['0%', '33%', '33%'],
              },
              close: {
                rotate: ['-180deg', '0deg', '0deg'],
                scale: [1, 1.3, 1],
              },
            }}
            className="absolute h-[2px] w-5 bg-slate-300"
          />
        </motion.button>
      </MotionConfig>
      <NavigationSlider
        navToggled={navToggled}
        isAuthenticated={isAuthenticated}
        user={user}
        toggleNav={toggleNav}
      />

      {isAuthenticated && (
        <img
          src={user?.picture}
          className="cursor-pointer w-10 h-10 rounded-full bg-white text-black flex justify-center items-center hover:outline hover:outline-2 hover:outline-slate-500"
          onClick={() => toggleUserMenu()}
        />
      )}
    </div>
  );
}
export default Navigation;
