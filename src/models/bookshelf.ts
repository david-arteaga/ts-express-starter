import * as Bookshelf from 'bookshelf'
import knex from './connection/knex';

export const bookshelf = Bookshelf(knex)
bookshelf.plugin('registry');
bookshelf.plugin('pagination');
bookshelf.plugin(require('bookshelf-cascade-delete'));

export default bookshelf
