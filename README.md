CS 3773 Project

## RUNNING LOCALLY ##

Prerequisites:
- Python 3.x
- NodeJS / npm
- In the djackets folder, run "python -m venv .venv" to make a virtual environment

1. Starting the Django server

- start powershell
- activate the virtual environment by running "activate.ps1" in djackets/.venv/scripts/ 
- start the server by running "python manage.py runserver" in djackets/djackets_django/

2. Starting the Vue server

- start powershell again (new instance)
- activate the virtual environment by running djackets/.venv/scripts/activate.ps1 
- start the server running "npm run serve" in djackets/djackets_vue/

3. Go to localhost:8080 for the customer-facing web page or localhost:8000/admin for the administrative page (superuser login is admin//deanza)
