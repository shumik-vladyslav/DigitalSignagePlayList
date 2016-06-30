/// <reference path="../typings/express/express.d.ts" />

import * as express from 'express';
import db = require("../db/dbAssets");
import {DBAssets} from "../db/dbAssets";
import {Assets} from "../db/dbAssets";

const router = express.Router();
var mydb: DBAssets = new db.DBAssets();

// mydb.deleteTable();
// mydb.createNewTable();



export = router