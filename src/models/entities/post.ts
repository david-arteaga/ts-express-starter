import bookshelf from '../bookshelf';
import { Users } from  './users'

export class Post extends bookshelf.Model<Post> {
	get tableName() { return 'post' }
	get idAttribute() { return 'id' }

	user() { return this.belongsTo(Users)}
}
