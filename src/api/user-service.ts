import { BaseService } from "./base/base-service";
import { to, tob } from "../util/await-to";
import { Users } from "../models/entities/users";
import * as Bookshelf from 'bookshelf'

const debug = require('debug')('ts-express:UserService')

export class UserService extends BaseService {
  async getAllUsersWith(...related: Related[]): Promise<any[]> {
    const [error, result] = await tob(new this.model.Users().fetchAll({ withRelated: related }))
    if (error) {
      const message = 'Could not fetch all users with related'
      debug(message, related)
      debug(error)
      throw new Error(message)
    }
    debug('users are', result.toJSON())
    return result.toJSON()
  }
}

export enum Related {
  posts = 'posts'
}

export const userService = new UserService()
