import { knex } from "./connection/knex";
import * as Knex from 'knex'
import { migrationsConfig } from "../config/migrations";
import { seedsConfig } from "../config/seeds";
import { Users } from "./entities/users";
import { Post } from "./entities/post";

const debug = require("debug")("ts-express:model")

export class Model {

  /**
   * Instance of knex for this model
   */
  knex: Knex

  constructor() {
    this.knex = knex
  }

  /**
   * Configure the entities in this model
   */
  Users = Users
  Post = Post

  /**
   * Run the knex migrations and seeds configured for this model
   * @return {Promise<void>} The promise
   */
  async init(): Promise<void> {
    if (process.env.INIT_DB) {
      debug("Initializing database...")
      await this.knex.migrate.rollback(migrationsConfig)
      await this.knex.migrate.latest(migrationsConfig)
      debug("Running seeds...")
      return await this.knex.seed.run(seedsConfig)
    } else {
      debug("INIT_DB is false so no db init will occur")
    }
  }
}

export const model = new Model()

export default model
