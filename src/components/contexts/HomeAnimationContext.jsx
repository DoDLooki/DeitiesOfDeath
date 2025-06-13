/*

This context is used to forbid the animation of the Home Page to start multiple times
when the user navigate throw the pages.

The animation will start only once.

*/

import React, { createContext, useState, useContext } from 'react';

const HomeAnimationContext = createContext();

export const HomeAnimationProvider = ({ children }) => {
  const [homeAnimation, setHomeAnimation] = useState(false);

  return (
    <HomeAnimationContext.Provider value={{ homeAnimation, setHomeAnimation }}>
      {children}
    </HomeAnimationContext.Provider>
  );
};

export const useHomeAnimation = () => useContext(HomeAnimationContext);
