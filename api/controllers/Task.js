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
    if(params.id){
      const task = await Task.findByPk(params.id);
      return task ? task.destroy() : null;
    }
    if(Object.keys(params).includes('is_done')){
      await Task.destroy({
        where: {'is_done': params.is_done === 'true' ? true : false}
      });
      return true;
    }
  }
  async get(params){
    return await Task.findByPk(params.id);
  }
  async getAll(){
    return await Task.findAll();
  }
}

export default new TaskController();