import { parseText } from 'MarkdownParser';
describe('parseText', () => {
    describe('bold', () => {
        test('should create a bold node in the content array -- astk astk', () => {
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'text',
                    value: 'This test ',
                    isBold: false,
                    isItalic: false,
                },
                {
                    nodeType: 'text',
                    value: 'must',
                    isBold: true,
                    isItalic: false,
                },
                {
                    nodeType: 'text',
                    value: ' pass!',
                    isBold: false,
                    isItalic: false,
                },
            ];
            expect(parseText('This test **must** pass!')).toEqual(expectedDataStructure);
        });
        test('should create a bold node in the content array -- under under', () => {
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'text',
                    value: 'This test ',
                    isBold: false,
                    isItalic: false,
                },
                {
                    nodeType: 'text',
                    value: 'must',
                    isBold: true,
                    isItalic: false,
                },
                {
                    nodeType: 'text',
                    value: ' pass!',
                    isBold: false,
                    isItalic: false,
                },
            ];
            expect(parseText('This test __must__ pass!')).toEqual(expectedDataStructure);
        });
    });
    describe('italic', () => {
        test('should create a italic node in the content array - astk', () => {
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'text',
                    value: 'This test ',
                    isBold: false,
                    isItalic: false,
                },
                {
                    nodeType: 'text',
                    value: 'must',
                    isBold: false,
                    isItalic: true,
                },
                {
                    nodeType: 'text',
                    value: ' pass!',
                    isBold: false,
                    isItalic: false,
                },
            ];
            expect(parseText('This test *must* pass!')).toEqual(expectedDataStructure);
        });
        test('should create a italic node in the content array - under', () => {
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'text',
                    value: 'This test ',
                    isBold: false,
                    isItalic: false,
                },
                {
                    nodeType: 'text',
                    value: 'must',
                    isBold: false,
                    isItalic: true,
                },
                {
                    nodeType: 'text',
                    value: ' pass!',
                    isBold: false,
                    isItalic: false,
                },
            ];
            expect(parseText('This test _must_ pass!')).toEqual(expectedDataStructure);
        });
    });
    describe('text', () => {
        test('should create a text node in the content array', () => {
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'text',
                    value: 'This test must pass!',
                    isBold: false,
                    isItalic: false,
                },
            ];
            expect(parseText('This test must pass!')).toEqual(expectedDataStructure);
        });
    });
});
