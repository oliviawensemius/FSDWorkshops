import "reflect-metadata";
import { DataSource } from "typeorm";
import { Tutorial } from "./entity/Tutorial";
import { Comment } from "./entity/Comment";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "209.38.26.237",
  port: 3306,
  username: "matt",
  password: "matt",
  database: "matt",
  // synchronize: true will automatically create database tables based on entity definitions
  // and update them when entity definitions change. This is useful during development
  // but should be disabled in production to prevent accidental data loss.
  synchronize: true,
  logging: true,
  entities: [Tutorial, Comment],
  migrations: [],
  subscribers: [],
});
