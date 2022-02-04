import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

const ui = {
  slots: null,
  cards: null,
  dragged: null
};

const game = {
    dragged: null,
};


export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    for (let card of cards) {
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(card);
      // console.log(content + " cum vine data card")

      // const columns = document.getElementsByClassName("board-column-content");
      // for (let column of columns) {
      //   column.setAttribute("data-board-id", boardId);
      //   console.log("imi ia column => " + column + " si adauga " + boardId)
      // }

      domManager.addChild(`.board-column-content[data-status-id="${card.status_id}"][data-board-id="${card.board_id}"]`, content);
      domManager.addEventListener(
        `.card[data-card-id="${card.id}"]`,
        "click",
        deleteButtonHandler
      );
      domManager.addEventListener(
          `.board-column-content[data-status-id="${card.status_id}"][data-board-id="${card.board_id}"]`,
          "dragstart", handleDragStart)
    }
  },
  initDragAndDrop: function () {
    initElements();
  }
};


addNewCard ()


function initElements() {
  ui.cards = document.querySelectorAll(".card");
  ui.slots = document.querySelectorAll(".board-column-content");

  ui.cards.forEach(function (card) {
    card.setAttribute("draggable", true);
  });
}

function handleDragStart(event) {
  game.dragged = event.currentTarget;
  console.log("Drag start of", game.dragged);
  game.dragged.style.opacity = "0.5";
  ui.cards.style.border = "2px solid red";
}

function deleteButtonHandler(clickEvent) {}


function addNewCard () {

  addEventListener('click', async(event) => {
    if (event.target.id === 'new-card') {
      let boardId = event.target.parentElement.parentElement.getAttribute('data-board-id');
      let newCard = await dataHandler.createNewCard("new-card", boardId, 1);
      if (!('status' in newCard)) {
        if (document.querySelector(`.board-columns[data-board-id="${boardId}"]`).hasChildNodes()) {
          const cardBuilder = htmlFactory(htmlTemplates.newCard);
              const content = cardBuilder(newCard);
              domManager.addChild(`.board-column-content[data-status-id="${newCard.status_id}"][data-board-id="${newCard.board_id}"]`, content);
              domManager.addEventListener(
                `.card[data-card-id="${newCard.id}"]`,
                "click",
                deleteButtonHandler
              );
        }
      }
    }
  })
}
