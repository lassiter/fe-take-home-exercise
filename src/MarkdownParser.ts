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
