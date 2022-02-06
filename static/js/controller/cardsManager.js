import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

const dom = {
    isEmpty: function (el) {
        return el.children.length === 0;
    },
    hasClass: function (el, cls) {
        return el.classList.contains(cls);
    },
};

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

      domManager.addChild(`.board-column-content[data-status-id="${card.status_id}"][data-board-id="${card.board_id}"]`, content);
      domManager.addEventListener(
          `.card[data-card-id="${card.id}"]`,
          "click",
          deleteButtonHandler
      );
    }
  },
  initDragAndDrop: function () {
    initElements();
    initDragEvents();
  },
}


addNewCard ()


function initElements() {
  ui.cards = document.querySelectorAll(".card");
  ui.slots = document.querySelectorAll(".board-column-content");

  ui.cards.forEach(function (card) {
    card.setAttribute("draggable", true);
  });

  ui.slots.forEach(function (slot) {
      slot.setAttribute("droppable", true);
  })
}

function initDragEvents() {
    ui.cards.forEach(function (card) {
        initDraggable(card);
    });

    ui.slots.forEach(function (slot) {
        initDropzone(slot);
    });
}

function initDraggable(draggable) {
    draggable.setAttribute("draggable", true);
    draggable.addEventListener("dragstart", handleDragStart);
    draggable.addEventListener("dragend", handleDragEnd);
}

function initDropzone(dropzone) {
    dropzone.addEventListener("dragenter", handleDragEnter);
    dropzone.addEventListener("dragover", handleDragOver);
    dropzone.addEventListener("dragleave", handleDragLeave);
    dropzone.addEventListener("drop", handleDrop);
}

function handleDragStart(event) {
    game.dragged = event.currentTarget;
    console.log("Drag start of", game.dragged);
}

function handleDragEnd() {
    console.log("Drag end of", game.dragged);
    game.dragged.style.opacity = "1";
    game.dragged = null;
}

function handleDragEnter(e) {
    console.log("Drag enter of", e.currentTarget);
}

function handleDragOver(e) {
    e.preventDefault();
    const dropzone = e.currentTarget;
    dropzone.style.opacity = "0.5";

}

function handleDragLeave(event) {
    console.log("Drag leave of", event.currentTarget);
    const dropzone = event.currentTarget;
    dropzone.style.opacity = null;
}

function handleDrop(event) {
    event.preventDefault();
    const dropzone = event.currentTarget;
    dropzone.style.opacity = null;
    console.log("Drop of", dropzone);

    if (dom.hasClass(dropzone, "board-column-content")) {
        dropzone.appendChild(game.dragged);
    }
}


function deleteButtonHandler(clickEvent) {}


function addNewCard () {

  addEventListener('click', async(event) => {
    if (event.target.id === 'new-card') {
      let boardId = event.target.parentElement.parentElement.getAttribute('data-board-id');
      let newCard = await dataHandler.createNewCard("new-card", boardId, 1);
      if (!('status' in newCard)) {
        if (document.querySelector(`.board-columns[data-board-id="${boardId}"]`).hasChildNodes()) {
          const cardBuilder = htmlFactory(htmlTemplates.card);
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
