import {Task} from '../models/Task.js';

class TaskController {
  async add(params, data) {
    return await Task.create(data);
  }
  async update(req, res){
    const task = await Task.findByPk(req.params.id);
    const result = await task.update(req.body);
    res.status(200).json(result);
  }
  async remove(req, res){
    const id = req.params.id;
    const task = await Task.findByPk(id);
    const result = task.destroy();
    res.status(200).json(result);
  }
  async get(req, res){
    const id = req.params.id;
    const task = await Task.findByPk(id);
    res.status(200).json(task);
  }
  async getAll(){
    return await Task.findAll();
  }
}

export default new TaskController();