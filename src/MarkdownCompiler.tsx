import React from 'react';
import { Node, isList } from 'MarkdownParser';

/**
 * This function Compiles Markdown Nodes to a ReactNode array.
 * @param nodeArr These are all the nodes from the parser which we'll work through.
 */
export const compileMarkdownToReactNode = (nodeArr: Node[]): React.ReactNodeArray =>
    nodeArr.map((node, index) => createReactNode(node, index));

/**
 * Main function used to create trees of React Nodes
 * @param node Markdown node that we're working down through to create children.
 * @param index Index to interpolate a unique key.
 */
const createReactNode = (node: Node, index: number): React.ReactNode => {
    if (isList(node.value)) {
        const children = node.content.map((node: Node, index) => createReactNode(node, index));
        return React.createElement(
            node.value,
            {
                key: `${node.value}-${index}`,
            },
            children
        );
    }

    return React.createElement(
        node.value,
        {
            key: `${node.value}-${index}`,
        },
        formatText(node.content)
    );
};

/**
 * Main help to create emphasis, strong, and anchor links.
 * @param content Node array for us to process links and text.
 */
const formatText = (content: Node[]) =>
    content.map((text) => {
        if (text.nodeType === 'link') {
            return (
                <a key={text.value} href={text.data.href}>
                    {text.value}
                </a>
            );
        }
        if (text.isBold) {
            return <strong key={text.value}>{text.value}</strong>;
        }
        if (text.isItalic) {
            return <em key={text.value}>{text.value}</em>;
        }
        return text.value;
    });
