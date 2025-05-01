import { Router } from "express";
import { CommentController } from "../controller/CommentController";

const router = Router();
const commentController = new CommentController();

// Get all comments for a specific tutorial
router.get("/tutorials/:tutorialId/comments", (req, res) =>
  commentController.findByTutorial(req, res)
);

// Get a specific comment for a tutorial
router.get("/tutorials/:tutorialId/comments/:id", (req, res) =>
  commentController.one(req, res)
);

// Create a new comment for a tutorial
router.post("/tutorials/:tutorialId/comments", (req, res) =>
  commentController.save(req, res)
);

// Update a specific comment for a tutorial
router.put("/tutorials/:tutorialId/comments/:id", (req, res) =>
  commentController.update(req, res)
);

// Delete a specific comment for a tutorial
router.delete("/tutorials/:tutorialId/comments/:id", (req, res) =>
  commentController.remove(req, res)
);

export default router;
