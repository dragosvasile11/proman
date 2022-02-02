from flask import Flask, render_template, url_for, session, request, flash, redirect
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

from util import json_response
import mimetypes
import queires

import json

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = 'proman'

load_dotenv()


@app.route("/", methods=['GET', 'POST'])
def welcome_user():
    if request.form.get('new-board') == '':
        print("dsaads")
        queires.add_board()
    if "username" not in session:
        return render_template("welcome.html")
    return render_template("welcome.html", user=session["username"].split('@')[0].capitalize())


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        username = request.form.get('username')
        print(queires.check_if_user_exists(username)['exists'])
        if not (queires.check_if_user_exists(username)['exists']):
            password = request.form.get('password')
            hashed_password = generate_password_hash(password)
            queires.add_user(username, hashed_password)
            return redirect(url_for("welcome_user"))
        flash('User already exists')

    return redirect(url_for("welcome_user"))


@app.route('/login', methods=['GET', 'POST'])
def check_user_credentials():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        print(queires.check_if_user_exists(username)['exists'])
        if bool(queires.check_if_user_exists(username)['exists']):

            hashed_password = queires.get_user_password(username)["password"]
            if check_password_hash(hashed_password, password):
                session['username'] = username
                session['user_id'] = (queires.get_user_id(username))['id']
                return redirect(url_for('welcome_user'))
            else:
                flash('Wrong password')
        else:
            flash('User does not exist')
    return redirect(url_for("welcome_user"))


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("welcome_user"))


@app.route('/delete_user')
def delete_user():
    queires.delete_user(queires.get_user_id(session['username'])['id'])
    session.clear()
    flash('Account Deleted')
    return redirect(url_for("welcome_user"))


@app.route("/api/check-if-user-logged-in")
@json_response
def check_logged_in():
    if 'username' in session:
        return json.loads('{"response": 1}')
    return json.loads('{"response": 0}')


@app.route("/api/boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return queires.get_boards()


@app.route("/api/boards/<int:board_id>/cards/")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return queires.get_cards_for_board(board_id)


@app.route("/api/add-board/", methods=["GET", "POST"])
def add_board():
    payload = request.get_json(force=True, silent=False, cache=False)
    user = queires.get_user_id(session["username"])
    board_id = queires.add_board(user["id"], payload["title"])
    print(board_id["id"])
    return json.dumps(board_id["id"])


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
