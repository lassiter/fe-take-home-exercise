/**
 * Data structure is an array of nodes which may have content
 * until bottom level which is just text strings where it's just value.
 */
export interface Node {
    readonly nodeType: string;
    content?: Node[];
    value: string;
    isBold?: boolean;
    isItalic?: boolean;
}

/**
 * [parent nodeType, parent value, Node]
 */
type ParserTupleResponse = [string, string, Node];

const COMBINED = /(\*\*.*?\*\*|__.*?__|\*.*?\*|_.*?_)/;
const BOLD = /(\*\*.*?\*\*|__.*?__)/g;
const ITALIC = /(\*.*?\*|_.*?_)/g;
const REPLACE = /\*|_/g;

/**
 * Handler for text node and formatting emphasis and strong
 */
export const parseText = (value: string): Node[] => {
    if (COMBINED.test(value)) {
        const textNodeArray: Node[] = [];
        const val = value.split(COMBINED);
        val.forEach((phrase) => {
            if (BOLD.test(phrase)) {
                textNodeArray.push({
                    nodeType: 'text',
                    value: phrase.replace(REPLACE, ''),
                    isBold: true,
                    isItalic: false,
                });
            } else if (ITALIC.test(phrase)) {
                textNodeArray.push({
                    nodeType: 'text',
                    value: phrase.replace(REPLACE, ''),
                    isBold: false,
                    isItalic: true,
                });
            } else {
                textNodeArray.push({
                    nodeType: 'text',
                    value: phrase,
                    isBold: false,
                    isItalic: false,
                });
            }
        });

        return textNodeArray;
    }

    return [
        {
            nodeType: 'text',
            value,
            isItalic: false,
            isBold: false,
        },
    ];
};

// parseHandlers and helpers

/**
 * Helper function to determine if the node value is a parent html element for the purposes of nesting.
 */
export const isList = (value: string): boolean => value === 'ol' || value === 'ul' || value === 'blockquote';

/**
 * Simple helper function to make parser code more readable.
 * @param childNode Node struct of child content
 * @param nodeType Debugging nodeType
 * @param nodeValue element value for parent node
 */
const createInitalList = (childNode: Node, nodeType: string, nodeValue: string = ''): Node => ({
    nodeType,
    value: nodeValue,
    content: [childNode],
});

/**
 * Handler for blockquote node
 */
const parseBlockQuote = (str: string): ParserTupleResponse => {
    const [, , paragraph] = parseParagraph(str.slice(2));
    return [
        '',
        '',
        {
            nodeType: 'blockquote',
            value: 'blockquote',
            content: [paragraph],
        },
    ];
};

/**
 * Handler for header node
 */
const parseHeader = (str: string = ''): ParserTupleResponse => {
    // We're splitting based on space, grabbing the first group and seeing how many hashes are there.
    const numberOfHashes = str.split(' ')[0].match(/\#/g).length;
    // If we have more than 6, it means it's malformed. h1, h2, h3, h4, h5, h6 support only.
    if (numberOfHashes > 6) {
        return parseParagraph(str); // there is no h7, h8, or etc
    }
    const trimmedString = str.slice(numberOfHashes + 1); // 1 accounts for space

    return [
        'root',
        'root',
        {
            nodeType: 'header',
            value: `h${numberOfHashes}`,
            content: parseText(trimmedString),
        },
    ];
};

/**
 * Handler for paragraph node
 */
const parseParagraph = (value: string): ParserTupleResponse => {
    return [
        'root',
        'root',
        {
            nodeType: `paragraph`,
            value: 'p',
            content: parseText(value),
        },
    ];
};

/**
 * Handler for root list nodes
 */
const parseRootList = (str: string, parentValue: string, parentNodeType: string): ParserTupleResponse => {
    if (parentValue === 'ul') {
        return [
            parentNodeType,
            parentValue,
            {
                nodeType: 'list',
                value: 'li',
                content: parseText(str.slice(2)),
            },
        ];
    }
    if (parentValue === 'ol') {
        return [
            parentNodeType,
            parentValue,
            {
                nodeType: 'list',
                value: 'li',
                content: parseText(str.slice(3)),
            },
        ];
    }
    return [
        'none',
        'none',
        {
            nodeType: 'list',
            value: 'li',
            content: parseText(str),
        },
    ];
};

/**
 * Main parser
 */
const parser = (str: string = ''): ParserTupleResponse => {
    if (/[0-9]\.\s/.test(str)) {
        // Ordered List
        return parseRootList(str, 'ol', 'orderedList');
    } else if (/\-\s/.test(str)) {
        // Unordered List
        return parseRootList(str, 'ul', 'unorderedList');
    } else if (/\#\s/.test(str)) {
        // Headers
        return parseHeader(str);
    } else if (/\>\s/.test(str)) {
        // Blockquotes
        return parseBlockQuote(str);
    }
    // Paragraphs
    return parseParagraph(str);
};

/**
 * This function handles the nesting and calling the parser.
 * @param stringArr This is an array of strings that have been split by line breaks from the textinput.
 */
export const parseMarkdown = (stringArr: string[]) => {
    const parsedNodes: Node[] = [];
    stringArr.forEach((str) => {
        // Current last node used to determine if adding the string node to a list.
        const lastNode = parsedNodes[parsedNodes.length - 1];

        // parentNodeType is used for quick grep/debugging data structures, parentValue is the html elment for the object.
        const [parentNodeType, parentValue, node] = parser(str);

        // If a ul or ol
        if (isList(parentValue)) {
            // If there is an existing node that matches the value, insert content.
            if (isList(lastNode?.value) && lastNode?.value === parentValue) {
                lastNode.content?.push(node);
                // If there is not a match for the value, create an inital list object.
            } else if (parentValue !== lastNode?.value) {
                parsedNodes.push(createInitalList(node, parentNodeType, parentValue));
            }
            // If a header or top level paragraph, append to parsedNodes.
        } else {
            parsedNodes.push(node);
        }
    });
    return parsedNodes;
};
