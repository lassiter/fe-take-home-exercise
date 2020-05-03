import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
    box-sizing: border-box;
`;

const Textarea = styled.textarea`
    font-family: inherit;
    font-size: inherit;
`;

const Preview = styled.div`
    background: #f3f3f3;
`;

type MarkdownEditorProps = {
    placeholder?: string;
};

const MarkdownEditor = ({ placeholder = '' }: MarkdownEditorProps) => {
    return (
        <Container>
            <Textarea data-testid="markdown-textarea" placeholder={placeholder} />
            <Preview data-testid="markdown-preview">{`Preview Area`}</Preview>
        </Container>
    );
};

export default MarkdownEditor;
