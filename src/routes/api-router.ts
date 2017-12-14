import { Router, Request, Response, NextFunction } from 'express';
import model from '../models/model';
import { to } from '../util/await-to';

const debug = require('debug')('ts-express:ApiRouter')

/**
 * #baseRoute: /api
 * Initialize the router for api calls
 */
class ApiRouter {
  router: Router
  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/user', this.getUsers)
    this.router.get('/post', this.getPosts)
  }

  async getUsers(req: Request, res: Response) {
    const [error, result] = await to(model.users.fetchAll({withRelated: ['posts']}))
    if (error) {
      debug(error)
      return res.sendStatus(500)
    }
    return res.json(result.toJSON())
  }

  async getPosts(req: Request, res: Response) {
    const [error, result] = await to(model.post.fetchAll({withRelated: ['user']}))
    if (error) {
      debug(error)
      return res.sendStatus(500)
    }
    return res.json(result.toJSON())
  }

}

export const apiRouter = new ApiRouter().router

export default apiRouter
