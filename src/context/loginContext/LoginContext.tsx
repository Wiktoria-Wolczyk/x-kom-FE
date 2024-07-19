import React, { ReactNode, createContext, useState } from "react";

export interface IActualUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar?: string;
}

interface ILoginContext {
  userIsLoggedIn: boolean;
  setUserIsLoggedIn: (bool: boolean) => void;
  actualUser: IActualUser | null;
  setActualUser: (user: IActualUser) => void;
}

export const LoginContext = createContext<ILoginContext>({
  userIsLoggedIn: false,
  setUserIsLoggedIn: () => {},
  actualUser: null,
  setActualUser: () => {},
});

export const LoginContextController = ({
  children,
}: {
  children: ReactNode;
}) => {
  const userString = localStorage.getItem("user");
  const loggedUser = userString ? JSON.parse(userString) : null;
  const [userIsLoggedIn, setUserIsLoggedIn] = useState(
    !!localStorage.getItem("user"),
  );
  const [actualUser, setActualUser] = useState<IActualUser | null>(
    localStorage.getItem("user") ? loggedUser : null,
  );

  const setUserInStateAndLocalStorage = (newUser: IActualUser) => {
    setActualUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  return (
    <LoginContext.Provider
      value={{
        userIsLoggedIn,
        setUserIsLoggedIn,
        actualUser,
        setActualUser: setUserInStateAndLocalStorage,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
