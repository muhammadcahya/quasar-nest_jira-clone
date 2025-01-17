# Jira clone with Quasar (Vue 3 Composition API with Typescript) + Nest (Node.js)  

### Video  
https://user-images.githubusercontent.com/59411497/141484169-912fc465-505e-4aeb-aaea-da8d26e47c1b.mp4
  
https://vimeo.com/647362201 (original resolution) 

### Stack
#### Frontend

1. Vue 3
2. Vuex
3. Typescript
4. Quasar (ui)
5. Socket.io (real-time issues update)
6. Vuedraggable (issues kanban board)
7. Vue i18n (for pluralization '1 доскА' '2 доскИ' '6 досОК' (1 board, 2 boardS, 6 boardS))
8. Unit tests (Vue test utils, Jest), E2E tests (Cypress)
9. other - date-fns, some lodash functions, eslint + tslint + prettier

#### Backend

1. Nest.js
2. Typescript
3. PostgreSQL + TypeORM (database)
4. Swagger, Swagger UI (docs)
5. Socket.io
6. Unit tests (Jest), E2E tests (Supertest)
7. AWS S3 (Amazon Simple Storage Service)
8. Elasticsearch (just for app complexity 😄) 
9. Nodemailer, @nestjs/schedule and cron (annoying email messages with very-very-very interisting news or email confirmation)

#### Other

Github actions CI pipeline

### App Features

#### Global
- Russian and English lanugages (also Arabic for RTL, but without translation)
- RTL view (haha, even in jira rtl doesn't work very well, but thanks to quasar pretty nice rtl support)
- User notifications (read one / read all, show only unread)

#### Auth

- Login / Register / Forgot password 
- OAuth with Google / Github
- 2FA
- Unique username / email validation  
- Send email verification mail 
- Send (news) emails with schedule (not implemented yet ❌)
- Send forgot password mail (not implemented yet ❌)  
- Automaticly redirect to requested page after login (/auth?redirect=/projects)  
- JWT access (1d exp) and refresh (30d exp) tokens, auto relogin if access token expired  

#### Projects

- Add new project  
- Delete project  
- View project detail with boards  
- Mark project as favorite  
- Upload project avatar (not implemented yet ❌)  
- Projects pagination  
- Projects sorting (not implemented yet ❌)  
- Projects search (not implemented yet ❌) 
  
#### Project Detail
##### Boards (only kanban and no multiple boards on one page)

- Add board (with ability to select project and automaticly redirect, interface is slightly different from jira)
- Delete board  
- Auto load last viewed board (or load it from URL)  
- Auto load last viewed issue (from URL)  
- Mark board as favorite  
- Drag & drop issues between columns
- Edit column name

##### Board Issues

- Issues filter by user (not implemented yet ❌)  
- Issues filter by last changes (not implemented yet ❌)  
- Issues search (not implemented yet ❌)  
- Change name / description
- WYSYWIG description editor
- Change column
- Change assigned user
- Change author
- Change issue type
- Change issue priority
- Add marks (not implemented yet ❌) 
- Created at / updated at fields with ability to toggle show mode (2 hours ago, 16 seconds ago, etc..) and default (May 15, 13:43)
- Add / Edit / Delete comments
- Add mentions in comments (not implemented yet ❌) 

#### People
- Teams CRUD
- Add users in created team

##### User / Team profile page
- Edit user info - change username / display name / email / location / organisation etc...

- Upload and delete user / team header image (store in AWS S3, compression with [sharp](https://github.com/lovell/sharp))
- Upload user / team avatar (store in AWS S3, compression with [sharp](https://github.com/lovell/sharp))

- View assigned issues
- View watching issues
- View favorite projects
- View user teams / team users  
  
and.. you know - give star if you like it 🤩😊

### Install  
1. Clone project  
2. Terminal #1 "docker compose up"  
3. Terminal #2 "cd .\frontend\" and "quasar dev"  
4. Terminal #3 "cd .\backend\" and "yarn start:dev" 
   
frontend and backend not in docker because i can't fix backend bcrypt error and i need to figure out how to make a hot reload (you can help if you know, it'll be cool)


