# Todo app with backend and user authentication

Todo app's backend developed with Node.js and MongoDB, its frontend developed with React+Typescript.

Todos are saved to the MongoDB to save permanently. User can create,delete,update and list todos.

### Backend
It contains user authentication with cookies and session. Users, todos and sessions are stored in the MongoDB with using mongoose.
It has 2 authorization level 'ADMIN' and 'USER'. A user can signup with using signup page and a admin should be created manually in MongoDB document.
Sessions are stored in MongoDB and when a user is signed in it save to the sessions document and it will be deleted when user is logged out.

### Frontend
