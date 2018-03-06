import { Router } from 'express';
import * as PostController from '../controllers/post.controller';
import * as PhotoController from '../controllers/photo.controller';
import * as AccountController from '../controllers/account.controller';
const router = new Router();

// Get all Photos
router.route('/photos/:album').get(PhotoController.getPhotosInAlbum)

// Add a new Photo
router.route('/photos').post(PhotoController.addPhoto)

// Get account by email
router.route('/account').post(AccountController.getAccount)

// Add a new account
router.route('/account/new').post(AccountController.addAccount)

// Get all Posts
router.route('/posts').get(PostController.getPosts);

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost);

// Add a new Post
router.route('/posts').post(PostController.addPost);

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost);

export default router;
