import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { compileMarkdownToReactNode } from 'MarkdownCompiler';
import { parseMarkdown } from 'MarkdownParser';

const Container = styled.div`
    min-height: 100vh;
    box-sizing: border-box;
    display: flex;
`;

const Textarea = styled.textarea`
    font-family: inherit;
    font-size: inherit;
    width: 50%;
    padding: 1rem 1rem;
`;

const Preview = styled.div`
    background: lightgray;
    width: 50%;
    white-space: pre-wrap;
    padding: 0 1rem 1rem;

    blockquote {
        background: gray;
        padding: 1rem 0.5rem 1rem 1rem;
    }
`;

type MarkdownEditorProps = {
    placeholder?: string;
};

const MarkdownEditor = ({ placeholder = '' }: MarkdownEditorProps) => {
    const [rawMarkdown, setRawMarkdown] = useState<string[]>([]);

    /**
     * As someone types we're updating state to then parse and recompile the markdown.
     */
    const handleMarkdownKeyUp = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        setRawMarkdown(e.target.value.split('\n'));

    return (
        <Container>
            <Textarea data-testid="markdown-textarea" placeholder={placeholder} onChange={handleMarkdownKeyUp} />
            <Preview data-testid="markdown-preview">{compileMarkdownToReactNode(parseMarkdown(rawMarkdown))}</Preview>
        </Container>
    );
};

export default MarkdownEditor;
