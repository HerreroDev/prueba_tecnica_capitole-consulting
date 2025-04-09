const categories = [
    {
        name: 'category1',
        subcategories: [
            {
                name: 'category2',
                subcategories: [
                    {
                        name: 'category7',
                        subcategories: []
                    }
                ]
            },
            {
                name: 'category3',
                subcategories: [
                    {
                        name: 'category4',
                        subcategories: []
                    }
                ]
            }
        ]
    },
    {
        name: 'category5',
        subcategories: []
    }
];

// TO-DO: Implement this function
const getCategoryPath = (categories, categoryName, prevPath='') => {
    let pathResult = '' 
    // Si el prevPath esta vacío sabremos que es una categoría raíz
    let isRootPath = prevPath === ''
    // La idea de utilizar el for...of es que nos da la capacidad de uso del break,
    //  y tan pronto como se encuentra la categoría a buscar, nos ahorra iteraciones
    for(let category of categories) {
        // Si el prevPath es falsy, inicializamos el path
        let path = prevPath ? `${prevPath}/${category.name}` : `/${category.name}`
        // Si encontramos la categoría deseada, rompemos el bucle y retornamos el pathResult 
        if (category.name === categoryName) {
            pathResult = path
            break;
        }
        // Si no es la categoría que deseamos, 'buceamos' es sus subcategorías
        let subcategoryResult = category.subcategories.length ? getCategoryPath(category.subcategories, categoryName, path) : ''
        // Si la categoría que deseamos, esta dentro de la subcategoría, retornamos el pathresult
        if (subcategoryResult) {
            pathResult = subcategoryResult
            break;
        }
    };
    // Si es un directorio raiz y no hemos encontrado respuesta devolvera '/'
    return isRootPath && !pathResult ? '/' : pathResult;
};

// OUTPUT SAMPLES
console.log(getCategoryPath(categories, 'category4')); // should output: '/category1/category3/category4'
console.log(getCategoryPath(categories, 'category2')); // should output: '/category1/category2'
console.log(getCategoryPath(categories, 'category5')); // should output: '/category5'
