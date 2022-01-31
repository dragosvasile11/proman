from flask import Flask, render_template, url_for, session, request, flash, redirect
from dotenv import load_dotenv
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash

from util import json_response
import mimetypes
import queires

import data_manager

mimetypes.add_type('application/javascript', '.js')
app = Flask(__name__)
app.secret_key = 'proman'

load_dotenv()


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    return render_template('index.html')


def welcome_user():
    if "username" not in session:
        return render_template("welcome.html")
    request.form.get('')
    return render_template("welcome.html", user=session["username"].split('@')[0].capitalize())


@app.route('/register', methods=['GET', 'POST'])
def register_user():
    if request.method == 'POST':
        username = request.form.get('username')
        if not (data_manager.check_if_user_exists(username)['exists']):
            if request.form.get('password') == request.form.get('repeat-password'):
                password = request.form.get('password')
                hashed_password = generate_password_hash(password)
                data_manager.add_user(username, hashed_password)
                return redirect(url_for("welcome_user"))
        flash('User already exists')

    return render_template("register.html")


@app.route('/login', methods=['GET', 'POST'])
def check_user_credentials():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        if bool(data_manager.check_if_user_exists(username)['exists']):
            hashed_password = data_manager.get_user_password(username)["password"]
            if check_password_hash(hashed_password, password):
                session['username'] = username
                session['user_id'] = (data_manager.get_user_id(username))['id']
                return redirect(url_for('welcome_user'))
            else:
                flash('Wrong password')
        else:
            flash('User does not exist')
    return render_template("login.html")


@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("welcome_user"))


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


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
