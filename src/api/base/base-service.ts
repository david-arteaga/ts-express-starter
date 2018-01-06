import { Model, model} from "../../models/model";

export abstract class BaseService {
  model: Model
  constructor() {
    this.model = model
  }
}
