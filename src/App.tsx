import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import MarkdownEditor from './MarkdownEditor';

const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        font-family:  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html, body, #root {
        height: 100%;
    }
`;

const AppContainer = styled.div`
    height: 100%;
`;

class App extends Component {
    render() {
        return (
            <>
                <GlobalStyle />
                <AppContainer>
                    <MarkdownEditor placeholder="Start writing your Markdown..." />
                </AppContainer>
            </>
        );
    }
}

export default App;
