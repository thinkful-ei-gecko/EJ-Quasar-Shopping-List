'use strict';

const STORE = { 
  items : [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false}],

  hideCompleted: false,
  updatedItem: false,
  searchTerm: ""

};

function generateItemElement(item) {
  return `
        <li data-item-id="${item.id}">
        <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
        <div class="shopping-item-controls">
            <button class="shopping-item-edit js-item-edit">
            <span class="button-label">edit</span>
            </button>
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

  const items = shoppinglist.map((item) => 
    generateItemElement(item)
  );

  return items.join("");
}

function renderShoppingList() {

  let filteredList = STORE.items;

  if (STORE.hideCompleted) {
      filteredList = filteredList.filter(item => !item.checked);
  }

  if (STORE.searchTerm) {
      filteredList = filteredList.filter(item => item.name.includes(STORE.searchTerm))
  }

  const shoppingListItemsString = generateShoppingItemsString(filteredList);

  $('.js-shopping-list').html(shoppingListItemsString);
  // this function will be responsible for rendering the shopping list in
  // the DOM
  console.log('`renderShoppingList` ran');
}

function clearBtn(){
    $('#search-form-clear').on('click', function(){
        STORE.searchTerm = "";
        $('.js-search-term').val('');
        renderShoppingList();
    })
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.push({id: cuid(), name: itemName, checked: false});
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
/*
*
*This feature will allow user to edit item name
*
*/

function updateItem(newItemName){
    console.log('updated item clicked');
    let newItem = prompt("Please enter your new item: ", "grapes");
    console.log(newItem);

    const updatedItem = STORE.items.findIndex(item=> item.id === newItemName);
    console.log(updatedItem);
    STORE.items[updatedItem].name = newItem;
}

function handleUpdateItem(){
    $('.js-shopping-list').on('click', '.js-item-edit', event => {
        const newItemName = getItemIdFromElement(event.currentTarget);
        console.log("this is the object: " + newItemName);
        updateItem(newItemName);
        renderShoppingList();
    })
}

/*
*
*This feature will allow you to search for items
*
*/

function searchItem(searchTerm){
    STORE.searchTerm = searchTerm;
}

function handlerSeachItem(){
    //keyup will run call back and check

    $('.js-search-term').on('keyup', function(event){
        let searchTerm = $('.js-search-term').val();
        searchItem(searchTerm);
        renderShoppingList();
    })
}

/*
*
*This feature will make it only visible to see unchecked items
*
*/

function toggleHideFilter(){
    STORE.hideCompleted = !STORE.hideCompleted;
}

function handleToggleHideFilter() {
    $('.js-hide-completed-toggle').on('click', () => {
        toggleHideFilter();
        renderShoppingList();
    })
}

function toggleCheckedForListItem(itemId) {
  console.log("Toggling checked property for item with id " + itemId);
  const item = STORE.items.find(item => item.id === itemId);
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
    const deletedItem = STORE.items.findIndex(item=> item.id === id);
    STORE.items.splice(deletedItem,1);
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
  handleToggleHideFilter();
  handleUpdateItem();
  handlerSeachItem();
  clearBtn();
}

$(handleShoppingList);