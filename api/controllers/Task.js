import {Task} from '../models/Task.js';

class TaskController {
  async add(params, data) {
    return await Task.create(data);
  }
  async update(params, data){
    const task = await Task.findByPk(params.id);
    return await task.update(data);
  }
  async remove(params){
    const task = await Task.findByPk(params.id);
    return task ? task.destroy() : null;
  }
  async get(params){
    return await Task.findByPk(params.id);
  }
  async getAll(){
    return await Task.findAll();
  }
}

export default new TaskController();