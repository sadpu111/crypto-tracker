import { createGlobalStyle } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";

const GlobalStyle = createGlobalStyle` // 전역 style component. 적용하려면 컴포넌트에 추가하여 리턴. 아래 내용은 Reser css로 모든 스타일을 제거한 코드. 
// "https://github.com/zacanger/styled-reset/blob/master/src/index.ts"
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
} 
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(props) => props.theme.bgColor}; // index에서 themeProcider 안에 App이 있으므로 여기(App)에서 theme의 props에 접근이 가능하다. 
  color: ${(props) => props.theme.textColor}; 
}
a {
  text-decoration: none;
  color: inherit;
}
`
// <></> 는 fragment로 빈 태그(유령태그)이다. 원칙적으로는 단 하나의 element를 리턴해야하므로, <GlobalStyle /> 까지 포함하여 리턴하려면 원래는 <div>태그로 묶어야하지만, 그럴 경우 <div>태그가 너무 남발되어 비효율적. 그래서 fragment라는 유령태그로 감싸준다.
function App () {
  return (
    <> 
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  )
}

export default App;
