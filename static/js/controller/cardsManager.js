import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

export let cardsManager = {
  loadCards: async function (boardId) {
    const cards = await dataHandler.getCardsByBoardId(boardId);
    for (let card of cards) {
      const cardBuilder = htmlFactory(htmlTemplates.card);
      const content = cardBuilder(card);
      console.log(content + " cum vine data card")

      const columns = document.getElementsByClassName("board-column-content");
      for (let column of columns) {
        column.setAttribute("data-board-id", boardId);
        console.log("imi ia column => " + column + " si adauga " + boardId)
      }

      domManager.addChild(`.board-column-content[data-status-id="${card.card_order}"][data-board-id="${card.board_id}"]`, content);
      domManager.addEventListener(
        `.card[data-card-id="${card.id}"]`,
        "click",
        deleteButtonHandler
      );
    }
  },
};

function deleteButtonHandler(clickEvent) {}
