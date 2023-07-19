import { createGlobalStyle } from 'styled-components';

const Globalstyle = createGlobalStyle`
body{
    padding:0;
    margin:0;
    box-sizing: border-box;
    
}

* {
    box-sizing: border-box;
    
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }

    ::-webkit-scrollbar-thumb {
      background: #97c9ff;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }

  html {
    -ms-overflow-style: none;
  }

  ::-ms-scrollbar {
    display: none;
  }
}

`;

export default Globalstyle;
