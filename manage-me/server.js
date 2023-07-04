const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(jsonServer.bodyParser);
server.use(middlewares);

//PROJECTS
server.get('/projects', (req, res) => {
    const projects = router.db.get('projects').value();
    res.status(200).jsonp(projects);
});