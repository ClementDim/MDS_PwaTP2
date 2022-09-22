import express from 'express';
import Task from './controllers/Task.js';
import * as path from 'path';
import { fileURLToPath } from 'url';

// Create Express server
const app = express();
app.listen(3000);
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get('/', (req, res) => res.sendFile(path.join(__dirname+'/views/index.html')));
// Find all tasks
app.get('/task', (req, res) => Task.getAll().then(result => res.send(result)));
// Find a task
app.get('/task/:id', (req, res) => Task.get(res,req));
// Create a task
app.post('/task', (req, res) => {
  if(!req.body){
    res.status(404);
  }
  Task.add(req.params, req.body).then(result => {res.status(200).send(result)});
});
// Update a task
app.put('/task/:id', (req, res) => Task.update(req,res));
// Remove a task
app.delete('/task/:id',  (req, res) => Task.remove(req,req));
