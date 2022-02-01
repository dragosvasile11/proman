import data_manager


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses s
        WHERE s.id = %(status_id)s
        ;
        """
        , {"status_id": status_id})

    return status


def get_boards():
    """
    Gather all boards
    :return:
    """
    # remove this code once you implement the database
    # return [{"title": "board1", "id": 1}, {"title": "board2", "id": 2}]

    return data_manager.execute_select(
        """
        SELECT * FROM boards
        ;
        """
    )


def get_cards_for_board(board_id):
    # remove this code once you implement the database
    # return [{"title": "title1", "id": 1}, {"title": "board2", "id": 2}]

    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def add_user(username, password):
    query = """
        INSERT INTO users VALUES
            (DEFAULT, %(username)s, %(password)s)
        """
    data_manager.execute_select(query, {"username": username,
                                        "password": password},
                                select=False)


def delete_user(user_id):
    query = '''
        DELETE FROM users
        WHERE id = %(user_id)s;
        '''
    data_manager.execute_select(query, {'user_id': user_id}, select=False)


def check_if_user_exists(username):
    query = """
        SELECT EXISTS
        (SELECT *
        FROM users
        WHERE username = %(username)s);
        """

    return data_manager.execute_select(query, {"username": username}, fetchall=False)


def get_user_id(username):
    query = '''
        SELECT id
        FROM users
        WHERE username = %(username)s
        '''

    return data_manager.execute_select(query, {'username': username}, fetchall=False)


def get_user_password(username):
    query = """
        SELECT password
        FROM users
        WHERE username = %(username)s;
        """

    return data_manager.execute_select(query, {"username": username}, fetchall=False)
