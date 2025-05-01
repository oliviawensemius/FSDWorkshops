import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Comment } from "../entity/Comment";
import { Tutorial } from "../entity/Tutorial";

export class CommentController {
  private commentRepository = AppDataSource.getRepository(Comment);
  private tutorialRepository = AppDataSource.getRepository(Tutorial);

  /**
   * Retrieves all comments
   */
  async all(request: Request, response: Response) {
    const comments = await this.commentRepository.find({
      relations: ["tutorial"],
    });
    return response.json(comments);
  }

  /**
   * Retrieves a single comment by ID
   */
  async one(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ["tutorial"],
    });
    if (!comment) {
      return response.status(404).json({ message: "Comment not found" });
    }
    return response.json(comment);
  }

  /**
   * Creates a new comment for a tutorial
   */
  async save(request: Request, response: Response) {
    const { content, author } = request.body;
    const tutorialId = parseInt(request.params.tutorialId);
    if (!tutorialId) {
      return response.status(400).json({ message: "tutorialId is required" });
    }
    const tutorial = await this.tutorialRepository.findOne({
      where: { id: tutorialId },
    });
    if (!tutorial) {
      return response.status(404).json({ message: "Tutorial not found" });
    }
    const comment = Object.assign(new Comment(), { content, author, tutorial });
    try {
      const savedComment = await this.commentRepository.save(comment);
      return response.status(201).json(savedComment);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error creating comment", error });
    }
  }

  /**
   * Updates a comment
   */
  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { content, author } = request.body;
    let commentToUpdate = await this.commentRepository.findOne({
      where: { id },
    });
    if (!commentToUpdate) {
      return response.status(404).json({ message: "Comment not found" });
    }
    commentToUpdate = Object.assign(commentToUpdate, { content, author });
    try {
      const updatedComment = await this.commentRepository.save(commentToUpdate);
      return response.json(updatedComment);
    } catch (error) {
      return response
        .status(400)
        .json({ message: "Error updating comment", error });
    }
  }

  /**
   * Deletes a comment by ID
   */
  async remove(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const commentToRemove = await this.commentRepository.findOne({
      where: { id },
    });
    if (!commentToRemove) {
      return response.status(404).json({ message: "Comment not found" });
    }
    await this.commentRepository.remove(commentToRemove);
    return response.json({ message: "Comment removed successfully" });
  }

  /**
   * Retrieves all comments for a specific tutorial
   */
  async findByTutorial(request: Request, response: Response) {
    const tutorialId = parseInt(request.params.tutorialId);
    const comments = await this.commentRepository.find({
      where: { tutorial: { id: tutorialId } },
      relations: ["tutorial"],
    });
    return response.json(comments);
  }
}
