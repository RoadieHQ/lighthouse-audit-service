/*
 * Copyright 2020 Spotify AB
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { startServer } from '.';
import logger from './logger';
import fs from 'fs';

startServer({
  port: process.env.LAS_PORT ? Number(process.env.LAS_PORT) : undefined,
  cors: process.env.LAS_CORS ? Boolean(process.env.LAS_CORS) : undefined,
  postgresConfig: {
    database: process.env.PGDATABASE,
    port: process.env.PGPORT ? Number(process.env.PGPORT) : 5432,
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    ssl: {
      ca: fs.readFileSync(String(process.env.PGPATH_TO_CA)),
      rejectUnauthorized: true,
    },
  },
}).catch(err => {
  logger.error(err);
  process.exit(1);
});

process.on('SIGINT', () => {
  logger.info('CTRL+C pressed; exiting.');
  process.exit(0);
});
