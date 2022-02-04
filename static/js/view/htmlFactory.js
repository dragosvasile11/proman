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
                <div class="board-header" data-board-id=${board.id}><span class="board-title"><p id="board-title" contenteditable="true" onkeypress="return (this.innerText.length <= 15)">${board.title}</p></span>
                    <span class="card-buttons">
                        <button class="board-add-button btn btn-outline-info" type="button" id="new-card" name="new-card">+ New Card</button>
                        <button class="board-add-button btn btn-outline-info" type="button" id="new-column" name="new-card">+ New Column</button>
                    </span>
                    <button class="board-toggle hidden" data-board-id="${board.id}"><img id="chevron" src="./static/chevronDown.png" /></button>
                </div>
                <div class="board-columns" data-board-id="${board.id}" hidden>
                </div>
            </section>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-order="${card.card_order}" data-card-id="${card.id}" data-board-id="${card.board_id}">
                <span class="card-title" id="card-title" contenteditable="true" onkeypress="return (this.innerText.length <= 15)">${card.title}</span>
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title" data-board-id="${card.board_id}" data-card-id="${card.id}"></div>
            </div>`
}

function statusBuilder(status, boardId) {
    return `<div  align="center" class="board-column" data-status-id="${status.id}">
                <span class="board-column-title" data-status-id="${status.id}" contentEditable="true">${status.title}</span>
                <div class="board-column-content" data-status-id="${status.id}" data-board-id="${boardId}"></div>
            </div>`
}
