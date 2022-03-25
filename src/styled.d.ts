// import original module declarations
import "styled-components";

// and extend them!
declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      bgColor_01: string;
      bgColor_02: string;
      textColor_01: string;
      textColor_02: string;
      hoverColor: string;
    };
  }
}
