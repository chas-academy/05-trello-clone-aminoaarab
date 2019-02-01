import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';

/**
 * jtrello
 * @return {Object} [Publikt tillgänliga metoder som vi exponerar]
 */

// Här tillämpar vi mönstret reavealing module pattern:
// Mer information om det mönstret här: https://bit.ly/1nt5vXP
const jtrello = (function() {
  "use strict"; // https://lucybain.com/blog/2014/js-use-strict/

  // Referens internt i modulen för DOM element
  let DOM = {};

  /* =================== Privata metoder nedan ================= */
  function captureDOMEls() {
    DOM.$board = $('.board');
    DOM.$listDialog = $('#list-creation-dialog');
    DOM.$columns = $('.column');
    DOM.$lists = $('.list');
    DOM.$cards = $('.card');
    
    DOM.$newListButton = $('button#new-list');
    DOM.$deleteListButton = $('.list-header > button.delete');

    DOM.$newCardForm = $('form.new-card');
    DOM.$deleteCardButton = $('.card > button.delete');
  }

  function createTabs() {}
  function createDialogs() {}

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on('click', createList);
    DOM.$deleteListButton.on('click', deleteList);

    DOM.$newCardForm.on('submit', createCard);
    DOM.$deleteCardButton.on('click', deleteCard);
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    console.log("This should create a new list");
  }

  function deleteList() {
    console.log("This should delete the list you clicked on");
  }

  /* =========== Metoder för att hantera kort i listor nedan =========== */
  function createCard(event) {
    event.preventDefault();
    let cardInput = $(this).find('input');
    let newCardTitle = cardInput.val();

    

    if(!newCardTitle) return;

    $(this)
    .closest('.add-new')
    .before('<li class="card">' + newCardTitle + '<button class="button delete">X</button></li>');

    cardInput.val("");

    console.log("this should create a new card");
  }

  function deleteCard() {
   $(this).closest('.board').remove();
    console.log("This should delete the card you clicked on");
  }

  // Metod för att rita ut element i DOM:en
  function render() {}

  /* =================== Publika metoder nedan ================== */

  // Init metod som körs först
  function init() {
    console.log(':::: Initializing JTrello ::::');
    // Förslag på privata metoder
    captureDOMEls();
    createTabs();
    createDialogs();

    bindEvents();

    sortableCard();
  }

  // All kod här
  function sortableCard(){
    $('.list-cards').sortable({
      connectWith: 'ul'
    });
  }

  function toggleDialog(){
    $('#list-creation-dialog').dialog("open");
    $('list-creation-dialog input.dialog').datepicker();
  }

  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
  
  $(function(){
    $('#list-creation-dialog').dialog({
      autoOpen: true   
    })

    let boxInput = $(this).find('#list-creation-dialog');
    let newBoxInput = boxInput.val();
    
    $(this)
    .closest('.add-new')
    .before('<li class="card">' + newBoxInput + '<button class="button delete">X</button></li>');
    
  });
});
