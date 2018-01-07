import { Router, Request, Response, NextFunction } from 'express';
import model from '../models/model';
import { to } from '../util/await-to';
import { BaseRouter } from "./base/base-router";
import { userService } from '../api/user-service';
import { postService } from '../api/post-service';
import * as fromPost from '../api/post-service';
import * as fromUser from '../api/user-service';
import { catch_async } from './base/util';

const debug = require('debug')('ts-express:ApiRouter')

/**
 * #baseRoute: /api
 * Initialize the router for api calls
 */
class ApiRouter extends BaseRouter {

  init() {
    this.router.get('/user', catch_async(this.getUsers))
    this.router.get('/post', catch_async(this.getPosts))
  }

  async getUsers(req: Request, res: Response) {
    res.json(await userService.getAllUsersWith(fromUser.Related.posts))
  }

  async getPosts(req: Request, res: Response): Promise<any> {
    res.json(await postService.getAllPostsWithRelated(fromPost.Related.user))
  }

}

export const apiRouter = new ApiRouter().router

export default apiRouter
