import { useAuth0 } from '@auth0/auth0-react';
import { MotionConfig, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';
import { IUser } from '../models/IUser';

interface INavigationSliderProps {
  navToggled: boolean;
  isAuthenticated: boolean;
  user: IUser | undefined;
  toggleNav: () => void;
}

function NavigationSlider({
  navToggled,
  isAuthenticated,
  user,
  toggleNav
}: INavigationSliderProps) {

  const { logout } = useAuth0();

  return (
    <MotionConfig
      transition={{
        duration: 1,
        ease: 'backInOut',
      }}
    >
      <motion.div
        style={{
          right: '-500px',
          opacity: 0,
        }}
        animate={navToggled ? 'open' : 'close'}
        variants={{
          open: {
            right: '-20px',
            opacity: 1,
          },
          close: {
            right: ['-20px', '-500px'],
            opacity: 0
          },
        }}
        className={`flex flex-col items-end justify-between min-h-dvh max-w-[400px] overflow-x-hidden fixed top-0 w-full bg-slate-800 shadow-2xl md:w-2/5 py-20 pr-20 rounded-md z-40`}
      >
        <ul>
          <li className="text-right text-2xl opacity-70 hover:opacity-100 cursor-pointer">
            <NavLink to="/" onClick={toggleNav}>Search images</NavLink>
          </li>
          <li className={`py-5 text-right text-2xl ${!isAuthenticated ? 'hover:opacity-40 opacity-40' : 'hover:opacity-100 opacity-70'}`}>
            <NavLink 
            className={`${!isAuthenticated ? 'cursor-not-allowed' : ''}`}
            to={isAuthenticated ? `/saved` : '#'} onClick={toggleNav}>My Saved Images</NavLink>
          </li>
        </ul>

        <div className="user-settings flex flex-col items-end">
          {isAuthenticated && (
            <>
              <p className="px-3 text-xs opacity-50">
                <em>
                  Logged in as {user?.name !== '' ? user?.name : user.nickname}
                </em>
              </p>
              <button
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
                className="border border-slate-800 rounded-lg my-2 px-4 py-1.5 hover:shadow-sm hover:shadow-slate-800 hover:border-slate-700"
              >
                Sign out
              </button>
            </>
          )}
        </div>
      </motion.div>
    </MotionConfig>
  );
}
export default NavigationSlider;
