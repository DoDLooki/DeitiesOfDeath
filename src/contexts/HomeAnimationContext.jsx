import React, { createContext, useState, useContext } from 'react';

const HomeAnimationContext = createContext();

export const HomeAnimationProvider = ({ children }) => {
  const [homeAnimation, setHomeAnimation] = useState(false); // or false, default value

  return (
    <HomeAnimationContext.Provider value={{ homeAnimation, setHomeAnimation }}>
      {children}
    </HomeAnimationContext.Provider>
  );
};

export const useHomeAnimation = () => useContext(HomeAnimationContext);
