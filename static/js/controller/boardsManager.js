import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";
import { statusesManager } from "./statusesManager.js";

export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    for (let board of boards) {
      const boardBuilder = htmlFactory(htmlTemplates.board);
      const content = boardBuilder(board);
      domManager.addChild("#root", content);
      domManager.addEventListener(
        `.board-toggle[data-board-id="${board.id}"]`,
        "click",
        showHideButtonHandler
      );
    }
  },
};

function showHideButtonHandler(clickEvent) {
  const boardColumns = document.getElementsByClassName("board-columns");
  for (let column of boardColumns) {
    while (column.firstChild) {
      column.removeChild(column.firstChild);
  }
  }

  const boardId = clickEvent.target.dataset.boardId;
  const statusPromise = new Promise((resolve, reject) => {
    resolve(statusesManager.loadStatuses(boardId));
  })
  statusPromise.then( () => {
      const cardsPromise = new Promise((resolve, reject) => {
        resolve(cardsManager.loadCards(boardId));
      })
      cardsPromise.then( () => {
        cardsManager.initDragAndDrop();
      })
  })
}


const newBoardButton = document.getElementById("new-board");
newBoardButton.addEventListener("click", async function() {
  await dataHandler.createNewBoard("new-board");
  window.location.reload();
});

