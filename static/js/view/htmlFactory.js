export const htmlTemplates = {
    board: 1,
    card: 2,
    status: 3
}

export function htmlFactory(template) {
    switch (template) {
        case htmlTemplates.board:
            return boardBuilder
        case htmlTemplates.card:
            return cardBuilder
        case htmlTemplates.status:
            return statusBuilder
        default:
            console.error("Undefined template: " + template)
            return () => { return "" }
    }
}

function boardBuilder(board) {
    return `<section class="board" data-board-id=${board.id}>
                <div class="board-header" data-board-id=${board.id}><span class="board-title"><p id="board-title" contenteditable="true" onkeypress="return (this.innerText.length <= 10)">${board.title}</p></span>
                    <button class="board-add">Add Card</button>
                    <button class="board-toggle hidden" data-board-id="${board.id}"><i class="fas fa-chevron-down"></i></button>
                </div>
            </section>`;
}

function cardBuilder(card) {
    return `<div class="card" data-card-id="${card.id}" data-board-id="${card.board_id}"><span class="card-title"><p id="card-title" contenteditable="true" onkeypress="return (this.innerText.length <= 10)">${card.title}</p></span>
                <div class="card-remove"><i class="fas fa-trash-alt"></i></div>
                <div class="card-title" data-board-id="${card.board_id}" data-card-id="${card.id}"></div>
            </div>`
}

function statusBuilder(status) {
    return `<div class="board-column">
                <div class="board-column-title">New</div>
                <div class="board-column-content"></div>
            </div>`
}

 // `<div class="board-container">
 //                <div class="board" data-board-id=${board.id} ><p id="board-title" contenteditable="true" onkeypress="return (this.innerText.length <= 10)">${board.title}</p></div>
 //                <button class="toggle-board-button" data-board-id="${board.id}">Show Cards</button>
 //            </div>`;


// `<div class="card" data-card-id="${card.id}" data-board-id="${card.board_id}"><p id="card-title" contenteditable="true" onkeypress="return (this.innerText.length <= 10)">${card.title}</p></div>`;