export const htmlTemplates = {
    board: 1,
    card: 2,
    status: 3
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card: case htmlTemplates.newCard:
            return cardBuilder
        case htmlTemplates.status:
            return statusBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<section class="board" section-board-id=${board.id}>
                <div class="board-header" data-board-id=${board.id}><span class="board-title"><p id=${board.id} class="boardTitle" onclick="this.contentEditable=true;" contenteditable="false" onkeypress="return (this.innerText.length <= 12)">${board.title}</p></span>
                    <span class="card-buttons">
                        <button class="board-add-button btn btn-outline-info" type="button" id="new-card" name="new-card">+ New Card</button>
                        <button class="board-add-button btn btn-outline-info" type="button" id="new-column" name="new-card">+ New Column</button>
                        <button class="board-add-button btn btn-outline-danger" type="button" id="deleteBoard" name="delete-board" dataId=${board.id}>Delete Board</button>
                    </span>
                    <button class="board-toggle hidden" name="chevron" data-board-id="${board.id}"><img name="chevron" id="chevron${board.id}" data-board-id="${board.id}" src="./static/chevronDown.png" /></button>
                </div>
                <div class="board-columns" data-board-id="${board.id}" hidden>
                </div>
            </section>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-order="${card.card_order}" data-card-id="${card.id}" data-board-id="${card.board_id}">
                <span class="card-title" id=${card.id} onclick="this.contentEditable=true;" contenteditable="false" onkeypress="return (this.innerText.length <= 12)">${card.title}</span>
                <div class="card-remove"><i id="deleteCard" dataId="${card.id}" class="fas fa-trash-alt"></i></div>
                <div class="card-title" data-board-id="${card.board_id}" data-card-id="${card.id}"></div>
            </div>`
}

function statusBuilder(status, boardId) {
    return `<div  align="center" class="board-column" data-status-id="${status.id}">
                <span class="board-column-title" data-status-id="${status.id}" id=${status.id} onclick="this.contentEditable=true;" contenteditable="false" onkeypress="return (this.innerText.length <= 12)">${status.title}</span>
                <div class="status-remove"><i id="deleteStatus" dataId="${status.id}" class="fas fa-trash-alt"></i></div>
                <div class="board-column-content" data-status-id="${status.id}" data-board-id="${boardId}"></div>
            </div>`
}
