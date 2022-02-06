import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

export let statusesManager = {
    loadStatuses: async function (boardId) {
        const statuses = await dataHandler.getStatusesByBoardId(boardId);
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.status);
            const content = statusBuilder(status, boardId);
            // console.log(content + " statuses")
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content, "beforeend");
        }
    }
}

addNewColumn ()

function addNewColumn () {

    addEventListener('click', async(event) => {
      if (event.target.id === 'new-column') {
        let boardId = event.target.parentElement.parentElement.getAttribute('data-board-id');
        let newStatus = await dataHandler.createNewStatus("new-status", boardId);
        if (!('status' in newStatus)) {
          if (document.querySelector(`.board-columns[data-board-id="${boardId}"]`).hasChildNodes()) {
            const statusBuilder = htmlFactory(htmlTemplates.status);
                const content = statusBuilder(newStatus, boardId);
                domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content, "beforeend");
          }
        }
      }
    })
  }