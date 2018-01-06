import { Router, Request, Response, NextFunction } from 'express';
import model from '../models/model';
import { to } from '../util/await-to';
import { BaseRouter } from "./base/base-router";
import { userService } from '../api/user-service';

const debug = require('debug')('ts-express:ApiRouter')

/**
 * #baseRoute: /api
 * Initialize the router for api calls
 */
class ApiRouter extends BaseRouter {

  init() {
    this.router.get('/user', this.getUsers)
    this.router.get('/post', this.getPosts)
  }

  async getUsers(req: Request, res: Response) {
    try {
      res.json(await userService.getAllUsersWith())
    } catch (e) {
      debug('Could not get users', e)
      res.sendStatus(500)
    }
  }

  async getPosts(req: Request, res: Response) {
    // should use api, NOT MODEL
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
