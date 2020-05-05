import { parseText, parseMarkdown } from 'MarkdownParser';

describe('markdownParser', () => {
    describe('paragraphs', () => {
        test('should create node for malformed headers', () => {
            expect(parseMarkdown(['####### example'])).toEqual([
                {
                    nodeType: 'paragraph',
                    value: 'p',
                    content: [
                        {
                            nodeType: 'text',
                            value: '####### example',
                            isBold: false,
                            isItalic: false,
                        },
                    ],
                },
            ]);
            expect(parseMarkdown(['######## example'])).toEqual([
                {
                    nodeType: 'paragraph',
                    value: 'p',
                    content: [
                        {
                            nodeType: 'text',
                            value: '######## example',
                            isBold: false,
                            isItalic: false,
                        },
                    ],
                },
            ]);
            expect(parseMarkdown(['######### example'])).toEqual([
                {
                    nodeType: 'paragraph',
                    value: 'p',
                    content: [
                        {
                            nodeType: 'text',
                            value: '######### example',
                            isBold: false,
                            isItalic: false,
                        },
                    ],
                },
            ]);
        });
        test('should create node for basic paragraphs', () => {
            const testStr =
                'Happy cinco de mayo! Who would have thought that taco tuesday would land on cinco de mayo during a year with the same name of a pandemic named after a mexican beer.';
            expect(parseMarkdown([testStr])).toEqual([
                {
                    nodeType: 'paragraph',
                    value: 'p',
                    content: [
                        {
                            nodeType: 'text',
                            value: testStr,
                            isBold: false,
                            isItalic: false,
                        },
                    ],
                },
            ]);
        });
    });
    describe('text and marks', () => {
        describe('bold', () => {
            test('should create a bold node in the content array', () => {
                const stringList = ['This test **must** pass!'];
                const expectedDataStructure: Node[] = [
                    {
                        nodeType: 'paragraph',
                        value: 'p',
                        content: [
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
                        ],
                    },
                ];
                expect(parseMarkdown(stringList)).toEqual(expectedDataStructure);
            });
            test('should create a bold node in the content array', () => {
                const stringList = ['This test __must__ pass!'];
                const expectedDataStructure: Node[] = [
                    {
                        nodeType: 'paragraph',
                        value: 'p',
                        content: [
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
                        ],
                    },
                ];
                expect(parseMarkdown(stringList)).toEqual(expectedDataStructure);
            });
        });
        describe('italic', () => {
            test('should create a italic node in the content array', () => {
                const stringList = ['This test *must* pass!'];
                const expectedDataStructure: Node[] = [
                    {
                        nodeType: 'paragraph',
                        value: 'p',
                        content: [
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
                        ],
                    },
                ];
                expect(parseMarkdown(stringList)).toEqual(expectedDataStructure);
            });
            test('should create a italic node in the content array', () => {
                const stringList = ['This test _must_ pass!'];
                const expectedDataStructure: Node[] = [
                    {
                        nodeType: 'paragraph',
                        value: 'p',
                        content: [
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
                        ],
                    },
                ];
                expect(parseMarkdown(stringList)).toEqual(expectedDataStructure);
            });
        });
        describe('text', () => {
            test('should create a text node in the content array', () => {
                const stringList = ['This test must pass!'];
                const expectedDataStructure: Node[] = [
                    {
                        nodeType: 'paragraph',
                        value: 'p',
                        content: [
                            {
                                nodeType: 'text',
                                value: 'This test must pass!',
                                isBold: false,
                                isItalic: false,
                            },
                        ],
                    },
                ];
                expect(parseMarkdown(stringList)).toEqual(expectedDataStructure);
            });
        });
    });
});

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
