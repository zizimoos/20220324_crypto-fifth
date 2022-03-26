import Router from "./Router";
import { createGlobalStyle, ThemeProvider } from "styled-components";
// eslint-disable-next-line
import { lightTheme, darkTheme } from "./theme";
import { HelmetProvider } from "react-helmet-async";

const GlobalStyle = createGlobalStyle`
*{
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
  vertical-align: baseline;
}
a {
  text-decoration: none;
  
}
body {
  font-family: 'Montserrat', sans-serif;
  font-family: 'Noto Sans KR', sans-serif;
  background-color :${(props) => props.theme.colors.bgColor_01};
  color: ${(props) => props.theme.colors.textColor_01};
}
`;

function App() {
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyle />
        <HelmetProvider>
          <Router />
        </HelmetProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
