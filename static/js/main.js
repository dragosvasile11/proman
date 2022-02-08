import { boardsManager, setButtonsHidden } from "./controller/boardsManager.js";
import { isUserLoggedIn } from "./data/checkForUser.js";


function init() {
  localStorage.setItem('boardType', 'Public');
  isUserLoggedIn().then( () => boardsManager.loadBoards()).then( () => setButtonsHidden());
}

init();
