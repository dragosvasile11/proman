import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";
import { cardsManager } from "./cardsManager.js";
import { statusesManager } from "./statusesManager.js";

export let boardsManager = {
  loadBoards: async function () {
    const boards = await dataHandler.getBoards();
    console.log(boards)
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
  const boardId = clickEvent.target.dataset.boardId;
  console.log("board id inainte de loadStatuses" + boardId)
  let statusPromise = statusesManager.loadStatuses(boardId);
  console.log(statusPromise)
  // cardsManager.loadCards(boardId);
}


const newBoardButton = document.getElementById("new-board");
newBoardButton.addEventListener("click", async function() {
  await dataHandler.createNewBoard("new-board");
  window.location.reload();
});

