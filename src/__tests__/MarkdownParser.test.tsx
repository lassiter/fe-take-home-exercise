import { parseText, parseMarkdown, Node } from 'MarkdownParser';

describe('markdownParser', () => {
    describe('blockquotes', () => {
        test('should create node for basic blockquote', () => {
            expect(parseMarkdown(['> Do or do not. There is no try.'])).toEqual([
                {
                    nodeType: 'blockquote',
                    value: 'blockquote',
                    content: [
                        {
                            nodeType: 'paragraph',
                            value: 'p',
                            content: [
                                {
                                    nodeType: 'text',
                                    value: 'Do or do not. There is no try.',
                                    isBold: false,
                                    isItalic: false,
                                },
                            ],
                        },
                    ],
                },
            ]);
        });
    });
    describe('headers', () => {
        const content = [
            {
                nodeType: 'text',
                value: 'example',
                isBold: false,
                isItalic: false,
            },
        ];
        test('should create node for header 1', () => {
            expect(parseMarkdown(['# example'])).toEqual([{ nodeType: 'header', value: 'h1', content }]);
        });
        test('should create node for header 2', () => {
            expect(parseMarkdown(['## example'])).toEqual([{ nodeType: 'header', value: 'h2', content }]);
        });
        test('should create node for header 3', () => {
            expect(parseMarkdown(['### example'])).toEqual([{ nodeType: 'header', value: 'h3', content }]);
        });
        test('should create node for header but avoid extra hashes', () => {
            expect(parseMarkdown(['# example #hashtag blog post'])).toEqual([
                {
                    nodeType: 'header',
                    value: 'h1',
                    content: [
                        {
                            nodeType: 'text',
                            value: 'example #hashtag blog post',
                            isBold: false,
                            isItalic: false,
                        },
                    ],
                },
            ]);
        });
    });
    describe('lists', () => {
        const genericTestList = [
            {
                nodeType: 'list',
                value: 'li',
                content: [
                    {
                        nodeType: 'text',
                        value: 'test 1',
                        isBold: false,
                        isItalic: false,
                    },
                ],
            },
            {
                nodeType: 'list',
                value: 'li',
                content: [
                    {
                        nodeType: 'text',
                        value: 'test 2',
                        isBold: false,
                        isItalic: false,
                    },
                ],
            },
            {
                nodeType: 'list',
                value: 'li',
                content: [
                    {
                        nodeType: 'text',
                        value: 'test 3',
                        isBold: false,
                        isItalic: false,
                    },
                ],
            },
        ];
        test('should create node tree for ul', () => {
            const ulList = ['- test 1', '- test 2', '- test 3'];
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'unorderedList',
                    value: 'ul',
                    content: genericTestList,
                },
            ];
            expect(parseMarkdown(ulList)).toEqual(expectedDataStructure);
        });
        test('should create node tree for ul', () => {
            const ulList = ['1. test 1', '2. test 2', '3. test 3'];
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'orderedList',
                    value: 'ol',
                    content: genericTestList,
                },
            ];
            expect(parseMarkdown(ulList)).toEqual(expectedDataStructure);
        });
        test('should allow elements before list node', () => {
            const ulList = ['example', '1. test 1', '2. test 2', '3. test 3'];
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'paragraph',
                    value: 'p',
                    content: [
                        {
                            nodeType: 'text',
                            value: 'example',
                            isBold: false,
                            isItalic: false,
                        },
                    ],
                },
                {
                    nodeType: 'orderedList',
                    value: 'ol',
                    content: genericTestList,
                },
            ];
            expect(parseMarkdown(ulList)).toEqual(expectedDataStructure);
        });
    });
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
    describe('link', () => {
        test('should create a link node in the content array', () => {
            const expectedDataStructure: Node[] = [
                {
                    nodeType: 'link',
                    value: 'Bizly',
                    isBold: false,
                    isItalic: false,
                    data: {
                        href: 'https://bizly.com',
                    },
                },
            ];
            expect(parseText('[Bizly](https://bizly.com)')).toEqual(expectedDataStructure);
        });
    });
});
