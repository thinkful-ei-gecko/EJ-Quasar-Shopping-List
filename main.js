'use strict';

const STORE = [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}
];

function generateItemElement(item) {
  return `
        <li data-item-id="${item.id}">
        <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
        <div class="shopping-item-controls">
            <button class="shopping-item-toggle js-item-toggle">
                <span class="button-label">check</span>
            </button>
            <button class="shopping-item-delete js-item-delete">
                <span class="button-label">delete</span>
            </button>
        </div>
        </li>`;
}

function generateShoppingItemsString(shoppinglist) {
  console.log('generateShoppingItemsString');

  const items = shoppinglist.map((item, itemIndex) => 
    generateItemElement(item, itemIndex)
  );

  return items.join("");
}

function renderShoppingList() {

  let shoppingListItemsString = generateShoppingItemsString(STORE);

  $('.js-shopping-list').html(shoppingListItemsString);
  // this function will be responsible for rendering the shopping list in
  // the DOM
  console.log('`renderShoppingList` ran');
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({id: cuid(), name: itemName, checked: false});
}


function handleNewItemSubmit() {
  // this function will be responsible for when users add a new shopping list item
  $('#js-shopping-list-form').submit(function(e) {
    e.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemId) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function getItemIdFromElement(item) {
  return $(item).closest('li').data('item-id');
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  });
}

function deleteListItem(id) {
    const deletedItem = STORE.findIndex(item=> item.id === id);
    STORE.splice(deletedItem,1);
}

function handleDeleteItemClicked(id) {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    console.log('delete button ran');
    const id = getItemIdFromElement(event.currentTarget);

    deleteListItem(id);
    renderShoppingList();
  });
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