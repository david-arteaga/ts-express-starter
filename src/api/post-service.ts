import { BaseService } from "./base/base-service";
import { tob, to } from "../util/await-to";

const debug = require('debug')('ts-express: PostService')

export class PostService extends BaseService {
  getAllPostsWithRelated = async (...related: Related[]): Promise<any[]> => {
    const [error, result] = await tob(this.model.post.fetchAll({ withRelated: related }))
    if (error) {
      debug('Could not fetch all posts with related ', related)
      debug(error)
      throw error
    }
    return result.toJSON()
  }
}

export enum Related {
  user = 'user'
}

export const postService = new PostService()
