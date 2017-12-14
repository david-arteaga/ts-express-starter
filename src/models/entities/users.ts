import bookshelf from '../bookshelf';
import { Post } from './post';

export class Users extends bookshelf.Model<Users> {
	get tableName() { return 'users' }
	get idAttribute() { return 'id' }

	posts() { return this.hasMany(Post)}
}
