import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import {initDragAndDrop} from "./drag_and_drop.js";



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
}

addNewCard ()



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
              initDragAndDrop();

        }
      }
    }
  })
}
