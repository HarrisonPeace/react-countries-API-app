import React from "react";

//Header Component
const Header = () => {
  const root = document.documentElement;
  let currentStyles = null;

  let colorSchemes = {
    light: `
  --elements-color: hsl(0, 0%, 100%);
  --background-color: hsl(0, 0%, 98%);
  --text-color: hsl(200, 15%, 8%);
  --input-color: hsl(0, 0%, 52%);
  --inner-svg-moon: hsl(0, 0%, 98%);`,
    dark: `
  --elements-color: hsl(209, 23%, 22%);
  --background-color: hsl(207, 26%, 17%);
  --text-color: hsl(0, 0%, 100%);
  --input-color: hsl(207, 26%, 17%);
  --inner-svg-moon: hsl(0, 0%, 100%);`,
  };

  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    root.style.cssText = colorSchemes.dark;
    currentStyles = 'dark';
  } else {
    root.style.cssText = colorSchemes.light;
    currentStyles = 'light';
  }

  //Change theme colors on click
  const changeColorScheme = () => {
    console.log(root.style.cssText);
    if (currentStyles === 'dark') {
      root.style.cssText = colorSchemes.light;
      currentStyles = 'light';
    } else {
      root.style.cssText = colorSchemes.dark;
      currentStyles = 'dark'
    }
  };

  return (
    <header>
      <h1>Where in the world?</h1>
      <div onClick={changeColorScheme}>
        <svg 
          width="32px"
          height="32px"
          viewBox="0 0 32 32"
          id="icon"
          xmlns="http://www.w3.org/2000/svg"
        >
        <path d="M13.5 5.6c-1.9 8.1 3.1 16.2 11.2 18.1 0.1 0 0.2 0.1 0.4 0.1 -2.1 2.2-5 3.4-8 3.4 -0.1 0-0.3 0-0.4 0C10.6 27 5.8 21.8 6 15.7 6.2 11.1 9.2 7.1 13.5 5.6M15 3.2c-0.1 0-0.1 0-0.2 0C7.7 4.5 2.9 11.3 4.2 18.4c1.1 6.1 6.3 10.6 12.4 10.8 0.2 0 0.3 0 0.5 0 4.3 0 8.3-2.1 10.7-5.6 0.3-0.5 0.2-1.1-0.3-1.4 -0.1-0.1-0.3-0.2-0.5-0.2 -7.2-0.6-12.5-7-11.9-14.2 0.1-1.1 0.3-2.3 0.7-3.3 0.2-0.5-0.1-1.1-0.6-1.3C15.2 3.2 15.1 3.2 15 3.2z"/>
      </svg>
        <span>Dark Mode</span>
      </div>
    </header>
  );
};

export default Header;
