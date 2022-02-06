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

      const columns = document.getElementsByClassName("board-column-content");
      for (let column of columns) {
        column.setAttribute("data-board-id", boardId);
      }

      domManager.addChild(`.board-column-content[data-status-id="${card.card_order}"][data-board-id="${card.board_id}"]`, content);
      domManager.addEventListener(
          `.card[data-card-id="${card.id}"]`,
          "click",
          deleteButtonHandler
      );
      //   domManager.addEventListener(
      //       `.board-column-content[data-status-id="${card.card_order}"][data-board-id="${card.board_id}"]`,
      //       "dragstart", handleDragStart)
    }
  },
  initDragAndDrop: function () {
    initElements();
    initDragEvents();
  },
}

function initElements() {
  ui.cards = document.querySelectorAll(".card");
  ui.slots = document.querySelectorAll(".board-column-content");

  ui.cards.forEach(function (card) {
    card.setAttribute("draggable", true);
  });

  ui.slots.forEach(function (slot) {
      slot.setAttribute("droppable", true);
  })
  console.log(ui.cards);
  console.log(ui.slots);
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
    // dropzone.addEventListener("dragenter", handleDragEnter);
    // dropzone.addEventListener("dragover", handleDragOver);
    // dropzone.addEventListener("dragleave", handleDragLeave);
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

function handleDrop(event) {
    event.preventDefault();
    const dropzone = event.currentTarget;
    // dropzone.style.border = null;
    // console.log("Drop of", dropzone);
    // const image = game.dragged.firstChild;
    // const alt = image.getAttribute("alt")
    // const slotsParent = dropzone.parentElement;
    // const container = slotsParent.parentElement;
    // const containerName = container.getAttribute("class");

    if (dom.hasClass(dropzone, "card-slot")) {
        if (dom.isEmpty(dropzone)) {
            dropzone.appendChild(game.dragged);
        }
    }

}


function deleteButtonHandler(clickEvent) {}
