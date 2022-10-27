import 'styled-components';

declare module 'styled-components' { // declaration 파일을 확장, 덮어쓰기(override).
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    cardBgColor: string;
  }
}

