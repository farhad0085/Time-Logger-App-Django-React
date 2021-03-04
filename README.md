# Time Logger App (Django + React + Redux)

## Setup Backend
Open a terminal (CMD, PowerShell or Git Bash in windows) and run following commands

Create a virtual environment
```
virtualenv venv
```

Active the virtual environment (Windows)
```
source venv/Script/active
```

Active the virtual environment (Linux)
```
source venv/bin/active
```

Install required dependencies
```
pip install -r requirements.txt
```

Migrate database
```
python manage.py migrate
```

Run the project
```
python manage.py runserver
```

## Setup Frontend
Open another terminal and run following commands

Install required dependencies
```
npm install
```

Run the project
```
npm start
```