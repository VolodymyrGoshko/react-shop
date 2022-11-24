export const optionsProducts = {
    colors: [
        {class: 'bg-white', selectedClass: 'ring-gray-400'},
        {class: 'bg-blue-500', selectedClass: 'ring-gray-400'},
        {class: 'bg-black', selectedClass: 'ring-gray-400'},
        {class: 'bg-yellow-500', selectedClass: 'ring-gray-400'}
    ],
    sizes: [
        {content: 'xs', selectedClass: 'ring-indigo-600'},
        {content: 's', selectedClass: 'ring-indigo-600'},
        {content: 'm', selectedClass: 'ring-indigo-600'},
        {content: 'l', selectedClass: 'ring-indigo-600'},
        {content: 'xl', selectedClass: 'ring-indigo-600'},
        {content: '2xl', selectedClass: 'ring-indigo-600'}
    ],
    brands: [
        {content: 'samsung', selectedClass: 'ring-indigo-600'},
        {content: 'asus', selectedClass: 'ring-indigo-600'},
        {content: 'lg', selectedClass: 'ring-indigo-600'},
        {content: 'apple', selectedClass: 'ring-indigo-600'},
        {content: 'xiaomi', selectedClass: 'ring-indigo-600'},
        {content: 'lenovo', selectedClass: 'ring-indigo-600'}
    ]
}

export const inputsCategory = [
    {id: "men's clothing", textContext: "Men's clothing"},
    {id: "women's clothing", textContext: "Women's clothing"},
    {id: "jewelery", textContext: "Jewelery"},
    {id: "electronics", textContext: "Electronics"}
]

export const inputsRating = [
    {
        type: 'checkbox',
        id: 'above',
        classInput: 'w-[15px]',
        classDiv: 'flex',
        classLabel: 'pl-1 cursor-pointer',
        textContent: 'Above average'
    },
    {
        type: 'checkbox',
        id: 'below',
        classInput: 'w-[15px]',
        classDiv: 'flex mt-2',
        classLabel: 'pl-1 cursor-pointer',
        textContent: 'Below average'
    }
]
