import { Router } from 'express';
import * as PhotoController from '../controllers/photo.controller';
const router = new Router();

// Get all Posts
router.route('/photos/:album').get(PhotoController.getPhotosInAlbum)

// Add a new Post
router.route('/photos').post(PhotoController.addPhoto)

export default router;
