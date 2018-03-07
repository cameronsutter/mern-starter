import path from 'path'
import { Router } from 'express'
import * as PostController from '../controllers/post.controller'
import * as PhotoController from '../controllers/photo.controller'
import * as AccountController from '../controllers/account.controller'
const router = new Router()
var multer  = require('multer')
var uploads_base = path.join(__dirname, '..', '..', "uploads")
var uploads = path.join(uploads_base, "u")
var upload = multer({ dest: uploads })

// Get all Photos
router.route('/photos/:id/:album').get(PhotoController.getPhotosInAlbum)

// Add a new Photo
router.route('/photos').post(upload.single('file'), PhotoController.addPhoto)

// get a photo
router.route('/photos/:fileName').get(PhotoController.getPhoto)

// Get account by email
router.route('/account/:email').get(AccountController.getAccount)

// Add a new account
router.route('/account/new').post(AccountController.addAccount)

// edit account
router.route('/account').post(AccountController.editAccount)

// Add an album
router.route('/account/albums').post(AccountController.addAlbum)

// Get all Posts
router.route('/posts').get(PostController.getPosts)

// Get one post by cuid
router.route('/posts/:cuid').get(PostController.getPost)

// Add a new Post
router.route('/posts').post(PostController.addPost)

// Delete a post by cuid
router.route('/posts/:cuid').delete(PostController.deletePost)

export default router
