import express from 'express';
import Task from './controllers/Task.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

// Create Express server
const app = express();
app.listen(3000);
app.use(cors());
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
app.get('/task/:id', (req, res) => {
  if(!req.params.id){
    res.status(404);
  }
  Task.get(req.params).then(result => {res.send(result)});
});
// Create a task
app.post('/task', (req, res) => {
  if(!req.body){
    res.status(404);
  }
  Task.add(req.params, req.body).then(result => {res.send(result)});
});
// Update a task
app.put('/task/:id', (req, res) => {
  if(!req.body || !req.params.id){
    res.status(404);
  }
  Task.update(req.params, req.body).then(result => {res.send(result)});
});
// Remove a task
app.delete('/task/:id',  (req, res) => {
  if(!req.params.id){
    res.status(404);
  }
  Task.remove(req.params).then(result => {res.send(result)});
});

app.delete('/task',  (req, res) => {
  Task.remove(req.query).then(result => {res.send(result)});
});
