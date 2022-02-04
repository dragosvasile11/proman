let defaultText = null;

addEventListener('click', event => {

    if (event.target.className === 'board-toggle hidden') {
        let boardId = event.target.dataset.boardId;
        let boardContent = document.querySelector(`.board-columns[data-board-id="${boardId}"]`)
        if (boardContent.hidden === true) {
            boardContent.hidden = false; 
        }else {
            boardContent.hidden = true;
        }
    }


    if (event.target.id === 'id01' || event.target.id === 'id02') {
        event.target.style = 'none'
    }

    if (event.target.isContentEditable) {
        defaultText = event.target.innerHTML

        event.target.addEventListener('blur', e => {

            if (event.target.innerHTML == '') {
                event.target.innerHTML = defaultText
            }
        })
    }
})