import data_manager


def get_card_status(board_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    status = data_manager.execute_select(
        """
        SELECT * FROM statuses
        WHERE board_id = %(board_id)s
        ORDER BY id ASC
        LIMIT 1
        ;
        """
        , {"board_id": board_id},
        fetchall=False
        )

    return status


def get_boards(user_id):
    """
    Gather all boards
    :return:
    """

    return data_manager.execute_select(
        f"""
        SELECT boards.id, user_id, title, public, users.username FROM boards
	        RIGHT JOIN users ON users.id = boards.user_id
            WHERE user_id = {user_id} OR public = true
        ;
        """
    )
    

def count_public_boards():

    return data_manager.execute_select(
        f"""
        SELECT COUNT(*) FROM boards
        WHERE public = true
        ;
        """,
        fetchall=False
    )
    

def count_private_boards(user_id):

    return data_manager.execute_select(
        f"""
        SELECT COUNT(*) FROM boards
        WHERE user_id = {user_id} AND public = false
        ;
        """,
        fetchall=False
    )


def get_board_title(board_id):
    return data_manager.execute_select(
        '''
        SELECT title FROM boards
        WHERE id = %(board_id)s
        '''
        , {"board_id": board_id}, 
        fetchall=False
    )


def get_cards_for_board(board_id):
    matching_cards = data_manager.execute_select(
        """
        SELECT * FROM cards
        WHERE cards.board_id = %(board_id)s
        ORDER BY card_order DESC
        ;
        """
        , {"board_id": board_id})

    return matching_cards


def get_statuses_for_board(board_id):
    matching_statuses = data_manager.execute_select(
        """
        SELECT * FROM statuses
        WHERE statuses.board_id = %(board_id)s
        ORDER BY id
        ;
        """
        , {"board_id": board_id})

    return matching_statuses


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


def add_board(user_id, title, boardType):
    query = f"""
        INSERT INTO boards VALUES
            (DEFAULT, %(user_id)s, %(title)s, %(board_type)s)
            RETURNING id, title;
        """

    return data_manager.execute_select(query,
                                {"user_id": user_id,
                                 "title": title,
                                 "board_type": boardType},
                                select=True,
                                fetchall=False)


def add_card(board_id, card_title, status_id):
    query = """
        INSERT INTO cards VALUES
            (DEFAULT, %(board_id)s, %(status_id)s, %(card_title)s, 1)
            RETURNING id, board_id, status_id, title, card_order;
        """

    return data_manager.execute_select(query,
                                {"board_id": board_id,
                                 "card_title": card_title,
                                 "status_id": status_id
                                },
                                select=True,
                                fetchall=False)


def add_status(board_id, status_title):
    query = """
        INSERT INTO statuses VALUES
            (DEFAULT, %(status_title)s, %(board_id)s)
            RETURNING id, board_id, title;
        """

    return data_manager.execute_select(query,
                                {"board_id": board_id,
                                 "status_title": status_title
                                },
                                select=True,
                                fetchall=False)


def edit_title(table, id, content):
    return data_manager.execute_select(
        f'''
        UPDATE {table}
            SET title = '{content}'
        WHERE id = {id}
        '''
        ,select=False
    )
    

def delete_board(id):
    return data_manager.execute_select(
        f'''
        DELETE FROM cards
            WHERE board_id = {id};
        DELETE FROM statuses
            WHERE board_id = {id};
        DELETE FROM boards
            WHERE id = {id};
        ''',
        select=False
    )


def delete_status(id):
    return data_manager.execute_select(
        f'''
        DELETE FROM cards
            WHERE status_id = {id};
        DELETE FROM statuses
            WHERE id = {id};
        ''',
        select=False
    )


def delete_card(id):
    return data_manager.execute_select(
        f'''
        DELETE FROM cards
            WHERE id = {id};
        ''',
        select=False
    )


def update_cards(id, status_id, card_order):
    return data_manager.execute_select(
        f'''
        UPDATE cards
            SET status_id = '{status_id}',
                card_order = '{card_order}'
        WHERE id = {id};
        '''
        , select=False
    )
