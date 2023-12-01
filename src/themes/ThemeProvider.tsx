import { ThemeProvider } from "@mui/material/styles";
import React, { useEffect, ReactNode } from "react";

import { darkTheme, lightTheme } from "./theme";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setThemeMode } from "../store/application/appStateReducers";

interface MyThemeProviderProps {
  children: ReactNode;
}

const MyThemeProvider: React.FC<MyThemeProviderProps> = ({ children }) => {
  const { themeMode } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();
  const prefersDarkMode = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;
  const currentTheme = themeMode === "light" ? lightTheme : darkTheme;

  useEffect(() => {
    dispatch(setThemeMode(prefersDarkMode ? "dark" : "light"));
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor =
      currentTheme.palette.background.default;
  }, [currentTheme.palette.background.default]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      dispatch(setThemeMode(mediaQuery.matches ? "dark" : "light"));
    };
    console.log("mediaQuery.matches", mediaQuery.matches);
    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  console.log("themeMode", themeMode);

  return <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>;
};

export { MyThemeProvider };
