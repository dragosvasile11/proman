import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";
import { statusesManager } from "./statusesManager.js";
import { initDragAndDrop } from "./drag_and_drop.js";

export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    for (let board of boards) {
      const boardBuilder = htmlFactory(htmlTemplates.board);
      const content = boardBuilder(board);
      domManager.addChild("#root", content);
      domManager.addEventListener(
        `.board-toggle[data-board-id="${board.id}"]`,
        "click"
      );
      statusesManager.loadStatuses(board.id)
          .then(() => cardsManager.loadCards(board.id)
              .then(() => {
                if (JSON.parse(localStorage.getItem('userLoggedIn'))) {
                initDragAndDrop()
              }
              }))
    }
  },
};


const newBoardButton = document.getElementById("new-board");
newBoardButton.addEventListener("click", async function() {
  let newBoardName = localStorage.getItem('boardType') === 'Private'  ? 'Private Board' : 'Public Board';
  let newBoard = await dataHandler.createNewBoard(newBoardName);
  if (!('status' in newBoard)) {
    const boardBuilder = htmlFactory(htmlTemplates.board);
        const content = boardBuilder(newBoard);
        domManager.addChild("#root", content);
        domManager.addEventListener(
          `.board-toggle[data-board-id="${newBoard.id}"]`,
          "click"
        );
        statusesManager.loadStatuses(newBoard.id)
            .then(() => initDragAndDrop())
  }
});

export function setButtonsHidden() {

    if (!(JSON.parse(localStorage.getItem('userLoggedIn')))) {

        const boardButtons = document.querySelectorAll(".board-add-button");
        boardButtons.forEach(element => element.style.display = 'none')
    }
}
