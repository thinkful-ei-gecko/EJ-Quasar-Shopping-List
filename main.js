const STORE = {
    items: [{
            name: "apples",
            checked: false
        }, {
            name: "oranges",
            checked: false
        }, {
            name: "milk",
            checked: true
        },
        {
            name: "bread",
            checked: false
        }
    ],
    hiddenCompleted: false
};

function toggleHideFilter(){
    let newItems = 

    renderShoppingList();
}

function hanndleToggleHideFilter(){
    ('.js-hide-completed-toggle').on('click', function () {
        toggleHideFilter();
    })
}

function generateItemElement(item, itemIndex, template) {
    return `<li>${item.name}</li>`
}

function generateShoppingItemsString(shoppinglist) {
    console.log('generateShoppingItemsString');

    const items = shoppinglist.map((item, itemIndex) =>
        generateItemElement(item, itemIndex)
    )

    return items.join("");
}

function renderShoppingList() {

    let filteredItems = STORE.items;

    $('.js-shopping-list').html(filteredItems);
    // this function will be responsible for rendering the shopping list in
    // the DOM
    console.log('`renderShoppingList` ran');
}


function handleNewItemSubmit() {
    // this function will be responsible for when users add a new shopping list item
    console.log('`handleNewItemSubmit` ran');
}


function handleItemCheckClicked() {
    // this function will be responsible for when users click the "check" button on
    // a shopping list item.
    console.log('`handleItemCheckClicked` ran');
}


function handleDeleteItemClicked() {
    // this function will be responsible for when users want to delete a shopping list
    // item
    console.log('`handleDeleteItemClicked` ran')
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
    renderShoppingList();
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
}

$(handleShoppingList);