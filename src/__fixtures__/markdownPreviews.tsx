const markdownPreviews = [
    ['heading 1', '# lorem ipsum', '<h1>lorem ipsum</h1>'],
    ['heading 2', '## lorem ipsum', '<h2>lorem ipsum</h2>'],
    ['heading 3', '### lorem ipsum', '<h3>lorem ipsum</h3>'],
    ['paragraph text', 'lorem ipsum', '<p>lorem ipsum</p>'],
    ['emphasis', '*lorem* ipsum', '<p><em>lorem</em> ipsum</p>'],
    ['strong emphasis', 'lorem **ipsum**', '<p>lorem <strong>ipsum</strong></p>'],
    [
        'unordered list',
        `- Milk
- Eggs
- Bacon`,
        '<ul><li>Milk</li><li>Eggs</li><li>Bacon</li></ul>',
    ],
    [
        'ordered list',
        `1. Milk
1. Eggs
1. Bacon`,
        '<ol><li>Milk</li><li>Eggs</li><li>Bacon</li></ol>',
    ],
    ['link', '[Bizly](https://bizly.com)', '<p><a href="https://bizly.com">Bizly</a></p>'],
    ['blockquote', '> lorem ipsum', '<blockquote><p>lorem ipsum</p></blockquote>'],
];

export default markdownPreviews;
