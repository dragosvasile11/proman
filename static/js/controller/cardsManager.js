import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

const ui = {
  slots: null,
  cards: null,
  dragged: null
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
    ui.dragged = event.currentTarget;
    ui.dragged.classList.add("dragging-now")
}

function handleDragEnd() {
    ui.dragged.style.opacity = "1";
    ui.dragged.classList.remove("dragging-now");
    ui.dragged = null;
}

function handleDragEnter(e) {
    console.log("Drag enter of", e.currentTarget);
}

function handleDragOver(event) {
    event.preventDefault();
    const dropzone = event.currentTarget;
    dropzone.style.opacity = "0.7";
    const afterElement = getDragAfterElement(dropzone, event.clientY);

    if (!afterElement) {
        dropzone.appendChild(ui.dragged);
    } else {
        dropzone.insertBefore(ui.dragged, afterElement);
    }

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll(".card:not(.dragging-now)")];
        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }
        ).element;
    }
}

function handleDragLeave(event) {
    const dropzone = event.currentTarget;
    dropzone.style.opacity = null;
}

function handleDrop(event) {
    event.preventDefault();
    const dropzone = event.currentTarget;
    dropzone.style.opacity = null;

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
