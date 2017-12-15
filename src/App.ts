import * as path from 'path'
import * as express from 'express'
import * as logger from 'morgan'
import * as bodyParser from 'body-parser'
import model from './models/model';

import apiRouter from './routes/api-router';

class App {

  express: express.Application

  constructor() {
    this.express = express()
    this.middleware()
    this.routes()
  }

  private middleware(): void {
    this.express.use(logger('dev'))
    this.express.use(bodyParser.json())
    this.express.use(bodyParser.urlencoded({ extended: true }))
  }

  private routes(): void {
    this.express.get("/", (req, res) => res.send("Build something cool :)"))
    this.express.use('/api', apiRouter)
  }

}

export const app = new App().express

export default app
