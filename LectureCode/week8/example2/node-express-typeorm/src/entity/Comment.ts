import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Tutorial } from "./Tutorial";

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  author: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Tutorial, (tutorial) => tutorial.comments)
  tutorial: Tutorial;
}
