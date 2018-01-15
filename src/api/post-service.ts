import { BaseService } from "./base/base-service";
import { tob, to } from "../util/await-to";

const debug = require('debug')('ts-express: PostService')

export class PostService extends BaseService {
  getAllPostsWithRelated = async (...related: Related[]): Promise<any[]> => {
    const [error, result] = await tob(new this.model.Post().fetchAll({ withRelated: related }))
    if (error) {
      const message = 'Could not fetch all posts with related'
      debug(message, related)
      debug(error)
      throw new Error(message)
    }
    return result.toJSON()
  }
}

export enum Related {
  user = 'user'
}

export const postService = new PostService()
