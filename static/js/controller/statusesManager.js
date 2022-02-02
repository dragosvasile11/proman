import { dataHandler } from "../data/dataHandler.js";
import { htmlFactory, htmlTemplates } from "../view/htmlFactory.js";

export let statusesManager = {
    loadStatuses: async function () {
        const statuses = await dataHandler.getStatuses();
        for (let status of statuses) {
            const statusBuilder = htmlFactory(htmlTemplates.status)
        }
    }
}