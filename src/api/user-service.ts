import { BaseService } from "./base/base-service";
import { to } from "../util/await-to";
import { Users } from "../models/entities/users";
import * as Bookshelf from 'bookshelf'

const debug = require('debug')('ts-express:UserService')

export class UserService extends BaseService {
  async getAllUsersWith(...related: Related[]): Promise<any[]> {
    const [error, result] = await to(this.model.users.fetchAll({ withRelated: related }))
    if (error) {
      debug('Could not fetch all users with related', related)
      throw error
    }
    debug('users are', result.toJSON())
    return result.toJSON()
  }
}

export enum Related {
  posts = 'posts'
}

export const userService = new UserService()
