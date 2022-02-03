import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";
import { domManager } from "../view/domManager.js";

export let statusesManager = {
    loadStatuses: async function (boardId) {
        console.log("board id cand a intrat in load statuses" + boardId)
        const statuses = await dataHandler.getStatuses();
        console.log(boardId + " status manager")
        console.log(statuses + "status")
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.status);
            const content = statusBuilder(status);
            domManager.addChild(`.board-columns[data-board-id="${boardId}"]`, content);
        }
    }
}