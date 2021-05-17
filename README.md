# Archi API

### Pre-requisite

* Python 3.7 (https://www.python.org/downloads/)
* Pipenv (pip install pipenv)
* Node 14 (https://nodejs.org/en/)


### Setting Up Backend

Follow below steps to setup project from scratch.

* Run following command inside `<project directory>/backend`. This would create a virtualenv for project and install all dependencies.
```pipenv install --ignore-pipfile```

* Run following command to activate virtualenv created in above step. This virtualenv can be exited by ```exit``` command, once activated.
```pipenv shell```

* Run following command to apply any pending migrations (database changes).
```python manage.py migrate```

* Run following command to start server and deploy project.
```python manage.py runserver```

### Setting Up Frontend

Follow below steps to setup project from scratch.

* Run following command inside `<project directory>/frontend`. install all dependencies.
```npm install```

* Run following command to serve react app
```npm run start```

* Frontend is now being servered at http://localhost:3000 


### Credentials

#### Admin Account:
email: admin@cardi.com
password: Test@1

#### Client Account
email: user@cardi.com
password: Test@1
