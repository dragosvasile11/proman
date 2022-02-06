export let dataHandler = {
  getBoards: async function () {
    const response = await apiGet("/api/boards");
    return response;
  },
  getBoard: async function (boardId) {
    // the board is retrieved and then the callback function is called with the board
    const response = await apiGet(`/api/boards/${boardId}/`);
    return response
  },
  getStatusesByBoardId: async function (boardId) {
    // the statuses are retrieved and then the callback function is called with the statuses
      const response = await apiGet(`/api/boards/${boardId}/statuses/`);
      return response;
  },
  getStatus: async function (statusId) {
    // the status is retrieved and then the callback function is called with the status
  },
  getCardsByBoardId: async function (boardId) {
    const response = await apiGet(`/api/boards/${boardId}/cards/`);
    return response;
  },
  getCard: async function (cardId) {
    // the card is retrieved and then the callback function is called with the card
  },
  createNewBoard: async function (boardTitle) {
    // creates new board, saves it and calls the callback function with its data
      const response = await apiPost("/api/add-board/", { "title": boardTitle });
      return response
  },
  createNewCard: async function (cardTitle, boardId, statusId) {
    // creates new card, saves it and calls the callback function with its data
    const response = await apiPost("/api/add-card/", { "title": cardTitle, 'boardId': boardId, 'statusId': statusId});
      return response
  },
  createNewStatus: async function (cardTitle, boardId) {
    // creates new card, saves it and calls the callback function with its data
    const response = await apiPost("/api/add-status/", { "title": cardTitle, 'boardId': boardId});
      return response
  },
  editContent: async function (element, identifier, content) {
    // creates new card, saves it and calls the callback function with its data
    const response = await apiPut("/api/update-content/", { "board": element, 'id': identifier, 'content': content});
      return response
  },
  deleteBoard: async function (identifier) {
    // creates new card, saves it and calls the callback function with its data
    const response = await apiDelete("/api/delete-board/", {'id': identifier});
      return response
  },
};

async function apiGet(url) {
  let response = await fetch(url, {
    method: "GET",
  });
  if (response.status === 200) {
    let data = response.json();
    return data;
  }
}

async function apiPost(url, payload) {
    const request = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    });

    if (request.ok) {
        const response = await request.json();
        if (response.status === 201) {
          alert(response.message)
        }
        return response;
    } else {
        alert(`There was an error during creating new board ${payload}`);
    }
}

async function apiDelete(url) {}

async function apiPut(url, payload) {
  const request = await fetch(url, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });
}
