## PERN Rest API
_PostrgeSQL, Express, React, Node.js_

to start project run following command:
```sh
npm install
```
to start server run following command:
```sh
npm run server
```
to start client run following command:
```sh
npm run client
```
to start both run following command:
```sh
npm run dev
```
if not works:
```sh
sudo npm run dev
```

## Available methods

| URL | Definition |
| ------ | ------ |
| [DELETE] /users/:userId/tasks/:taskId | delete task by Id |
| [POST] /users/:userId/tasks | create task for user |
| [PUT] /users/:id/tasks/:idtask | update task by Id |
| [GET] /users/:userId/tasks | get all tasks of user (with filters) |
| [DELETE] /users/:userId | delete user by Id |
| [GET] /users/:userId | get user by id with all tasks |
| [POST] /users | create user |
| [PUT] /users/:userId | edit username |
| [GET] /allusers | get list of users |