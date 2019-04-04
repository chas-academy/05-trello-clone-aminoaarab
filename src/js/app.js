import $ from 'jquery';

require('webpack-jquery-ui');
import '../css/styles.css';
import 'jquery-ui/themes/base/all.css';

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
    DOM.$fadeButton = $('#fadeColumn');
    DOM.$widgetButton = $('#widgetBackG');
  }

  /*
  *  Denna metod kommer nyttja variabeln DOM för att binda eventlyssnare till
  *  createList, deleteList, createCard och deleteCard etc.
  */
  function bindEvents() {
    DOM.$newListButton.on("click", toggleDialog);
    DOM.$board.on("click", ".list-header > button.delete", deleteList);
    DOM.$listDialog.on("submit", "form.new-list", createList);
 
    DOM.$board.on("submit", "form.new-card", createCard);
    DOM.$board.on("click", ".card > button.delete", deleteCard);

    DOM.$fadeButton.on("click", fadeEffect)
    // DOM.$widgetButton.on('click', myWidget)
  }

  /* ============== Metoder för att hantera listor nedan ============== */
  function createList() {
    event.preventDefault();
    let listTitleInput = $(this).find("input");
    let listDueDateInput = $(this).find("input.datepicker");
    let newListTitle = listTitleInput.val();
    let newListDueDate = listDueDateInput.val();
 
    if(!newListTitle && !newListDueDate) return;
    
    
    $('#list-creation-dialog').dialog("close");
 
    listTitleInput.val("");
    listDueDateInput.val("");

    $('.column:last')
    .before(`<div class="column">
    <div class="list">
        <div class="list-header">
            ${newListTitle} | ${newListDueDate}
            <button class="button delete">X</button>
        </div>
        <ul class="list-cards">
            <li class="add-new">
                <form class="new-card" action="index.html">
                    <input type="text" name="title" placeholder="Please name the card" />
                    <button class="button add">Add new card</button>
                </form>
            </li>
        </ul>
    </div>
</div>`)


}
sortableCard();

  function deleteList() {
    $(this).closest('.column').toggle("explode");
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
  }

  function deleteCard() {
   $(this).closest('.card').remove()
  }

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

     $('.board').sortable({})
  }

  function toggleDialog(){
    $('#list-creation-dialog').dialog("open");
    $('#list-creation-dialog input.datepicker').datepicker();
  }

  function createDialogs(){
    $('#list-creation-dialog').dialog({autoOpen: false})
    $('#list-creation-dialog')
  }
 
  function createTabs() {
    $('#tabs').tabs();
  }

  function fadeEffect() {
    $('.list').fadeToggle('slow', 'linear')
  }

  $.widget('trello.theme', {
    _create() {
      $('#widgetBackG').click(() => {
        $('body, list1').toggleClass('button1')
        $('.list').toggleClass('list1')
        $('.list-header').toggleClass('list-header1')
        $('button').toggleClass('button2')
      });

    },
  });
  

  $("body").theme();


  return {
    init: init
  };
})();

//usage
$("document").ready(function() {
  jtrello.init();
});
