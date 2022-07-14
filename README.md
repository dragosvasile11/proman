# ![2022-07-14_04-57](https://user-images.githubusercontent.com/89748211/178880280-2c3718d7-f50b-4225-8c2f-27d28cee8f0b.png)

## Project Description

Proman is a web based project management tool.

The application is designed to be used by users to manage their projects and tasks.
It was developed as one-page application, which is easy to use and easy to maintain.
Once you open the app you can see all the public boards but cannot modify them. Once you register and log in you can create boards and tasks.
Each board represents a project and each card represents a task.

Once you are logged in you can create public or private boards and edit them.
You can also move cards between columns.

With one click on the name of the boards, columns, or cards you can edit their names.

Hope you enjoy using Proman!

## Some of the challenges we meet

- Create an advanced Flask project.
- Understand the practical usage of AJAX.
- Master web development.
- Plan the development of an advanced product.

## A bit of context

This application was built as part of my CodeCool journey. \
I've worked on this app 2 sprints (each sprint has 4 days) with the help of my team-mate Vlad Puschiulescu. \
When we started working on this project we had about 6 months of programming experience and about 3 months of web development. \

## General requirements
#### Under every requirement there is a command line for installation(windows only)
 - Python 3.8 or higher 
 - Pip installed on your system \
  python -m pip install --upgrade pip
 - Virtualenv for python \
pip install virtualenv
 - Postgresql 9.6 or higher 

## Installation guide 

- Clone the repository
- Create a virtual environment
- Install dependencies from requirements.txt file
- Create a database with postgresql
- Run the sql file from data folder on the newly created database
- Enter your credentials(between " ") in the .env.template file and rename it to .env
- Run the application from main.py file as a flask app

## Features of the project

- Register new user
- Login with credentials
- Choose Public or Private when create a new board
- Add a title for your new board
- Add columns
- Add cards
- Edit or delete columns and cards
- You can logout from your account and see all public boards from all users.

![2022-07-14_04-44](https://user-images.githubusercontent.com/89748211/178873800-72e37227-9300-4d31-a3ba-6e7ec1712ddd.png)





