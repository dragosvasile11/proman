import { dataHandler } from "../data/dataHandler.js";

let defaultText = null;

addEventListener('click', event => {

    if (event.target.id.includes('delete')) {
        let element = event.target.id;
        let identifier = event.target.getAttribute('dataId');

        switch (element) {
            case 'deleteBoard':
                if (dataHandler.deleteBoard(identifier)) {
                    let parent = document.querySelector(`[section-board-id="${identifier}"]`);
                    while (parent.firstChild) {
                        parent.firstChild.remove()
                    }
                    parent.remove()        
                };
                break;
            case 'deleteStatus':
                if (dataHandler.deleteStatus(identifier)) {
                    let parent = document.querySelector(`[data-status-id="${identifier}"]`);
                    while (parent.firstChild) {
                        parent.firstChild.remove()
                    }
                    parent.remove()
                }
                break;
            case 'deleteCard':
                if (dataHandler.deleteCard(identifier)) {
                    let parent = document.querySelector(`[data-card-id="${identifier}"]`);
                    while (parent.firstChild) {
                        parent.firstChild.remove()
                    }
                    parent.remove()
                }
                break;
        }
    }

    if (event.target.name === 'chevron') {
        let boardId = event.target.dataset.boardId;
        let boardContent = document.querySelector(`.board-columns[data-board-id="${boardId}"]`)
        if (boardContent.hidden === true) {
            boardContent.hidden = false;
            document.querySelector(`#chevron${boardId}`).src = "./static/chevronUp.png"
        }else {
            boardContent.hidden = true;
            document.querySelector(`#chevron${boardId}`).src = "./static/chevronDown.png"
        }
    }


    if (event.target.id === 'id01' || event.target.id === 'id02') {
        event.target.style = 'none'
    }

    if (event.target.isContentEditable) {
        defaultText = event.target.innerHTML

        event.target.addEventListener('blur', e => {

            if (event.target.innerHTML == '' || event.target.innerHTML === defaultText) {
                event.target.innerHTML = defaultText
                return
            }
            let newText = event.target.innerHTML;
            let elementId = event.target.id;
            switch (event.target.className) {
                case 'boardTitle':
                    let table = `boards`
                    dataHandler.editContent(table, elementId, newText);
                    break;
                case 'card-title':
                    dataHandler.editContent('cards', elementId, newText);
                    break
                case 'board-column-title':
                    dataHandler.editContent('statuses', elementId, newText);
                    break
            }
        })
    }
})