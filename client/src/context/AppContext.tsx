import { useAuth0 } from '@auth0/auth0-react';
import { ReactNode, createContext, useState } from 'react';
import { IUser } from '../models/IUser';

interface IUserContext {
  auth0: {
    loginWithRedirect: () => void;
    user: IUser | undefined;
    isAuthenticated: boolean;
  };
  nav: boolean;
  toggleNavTest: () => void;
  showToast: boolean,
  toggleToast: () => void;
}

interface IContextProviderProps {
  children: ReactNode;
}

export const AppContext = createContext<IUserContext>({
  auth0: {
    loginWithRedirect: () => {},
    user: undefined,
    isAuthenticated: false,
  },
  nav: false,
  toggleNavTest: () => { },
  showToast: false,
  toggleToast: () => {}
});

export const UserProvider = ({ children }: IContextProviderProps) => {
  const [nav, setNav] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { loginWithRedirect, user, isAuthenticated } = useAuth0();


  const toggleNavTest = () => {
    if (nav === false) {
      setNav(!nav);
    } else 
    setTimeout(() => {
      setNav(!nav)
    }, 500);
  };

  const toggleToast = () => {
    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 2000);
  }

  return (
    <AppContext.Provider
      value={{
        auth0: {
          loginWithRedirect,
          user: user,
          isAuthenticated,
        },
        nav,
        toggleNavTest,
        showToast,
        toggleToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
