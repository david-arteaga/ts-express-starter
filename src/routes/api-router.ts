import { Router, Request, Response, NextFunction } from 'express';
import model from '../models/model';
import { to } from '../util/await-to';
import { BaseRouter } from "./base/base-router";
import { userService } from '../api/user-service';
import { postService } from '../api/post-service';
import * as fromPost from '../api/post-service';
import * as fromUser from '../api/user-service';

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
    const [error, result] = await to(userService.getAllUsersWith(fromUser.Related.posts))
    if (error) {
      return res.sendStatus(500)
    }
    return res.json(result)
  }

  async getPosts(req: Request, res: Response): Promise<any> {
    const [error, posts] = await to(postService.getAllPostsWithRelated(fromPost.Related.user))
    if (error) {
      return res.sendStatus(500)
    }
    res.json(posts)
  }

}

export const apiRouter = new ApiRouter().router

export default apiRouter
