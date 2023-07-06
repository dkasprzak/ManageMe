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

//FUNCTIONALITIES
// PANEL FUNKCJONALNOŚCI

server.get('/functionalities', (req, res) => {
  const functionalities = router.db.get('functionalities').value();
  res.status(200).jsonp(functionalities);
});

server.delete('/functionalities/:id', (req, res) => {
  const functionalityId = parseInt(req.params.id);
  const functionalities = router.db.get('functionalities');
  const functionality = functionalities.find({ id: functionalityId }).value();

  if (!functionality) {
    res.status(404).json({ error: 'Functionality not found' });
    return;
  }

  functionalities.remove({ id: functionalityId }).write();

  res.status(200).json({ message: 'Functionality deleted successfully' });
});

server.post('/functionalities/newFunctionality', (req, res) => {
  const { projectId, name, description, status, project, owner, priority } = req.body;

  const functionalities = router.db.get('functionalities');
  const lastFunctionality = functionalities.value()[functionalities.size() - 1];
  const newId = lastFunctionality ? lastFunctionality.id + 1 : 1;

  const newFunctionality = {
    id: newId,
    projectId,
    name,
    description,
    status,
    project,
    owner,
    priority,
    tasks: [],
  };

  functionalities.push(newFunctionality).write();

  res.status(200).jsonp(newFunctionality);
});

server.put('/functionalities/:id/update', (req, res) => {
  const functionalityId = parseInt(req.params.id);
  const { name, description, status, project, owner, priority } = req.body;

  router.db
    .get('functionalities')
    .find({ id: functionalityId })
    .assign({ name, description, status, project, owner, priority })
    .write();

  const updatedFunctionality = router.db.get('functionalities').find({ id: functionalityId }).value();

  res.status(200).jsonp(updatedFunctionality);
});

server.put('/functionalities/:id/updateStatus', (req, res) => {
  const functionalityId = parseInt(req.params.id);
  const functionalities = router.db.get('functionalities');
  const functionality = functionalities.find({ id: functionalityId }).value();

  if (!functionality) {
    res.status(404).json({ error: 'Functionality not found' });
    return;
  }

  const { status } = req.body;

  functionality.status = status;

  functionalities.find({ id: functionalityId }).assign(functionality).write();

  res.status(200).json(functionality);
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});
