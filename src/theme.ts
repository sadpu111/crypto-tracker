import {DefaultTheme} from "styled-components"

export const darkTheme: DefaultTheme = {
  bgColor: "#2f3640",
  textColor: "white",
  accentColor: "#9c88ff",
  cardBgColor: "transparent",
};

export const lightTheme: DefaultTheme = {
  bgColor: "whitesmoke",
  textColor: "black",
  accentColor: "#9c88ff",
  cardBgColor: "white",
}


/* export default theme // default인 경우 import할 때 {}없이! export {theme}라면 import할 때 import {theme} ~ !
 */