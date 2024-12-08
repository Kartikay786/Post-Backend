import Post from '../models/post.model.js'

import cloudinary from '../utils/cloudinary.js'
import fs from 'fs'

// create post

const createPost = async (req, res) => {
    const { content } = req.body;
    const authimg = req.user.image;
    const authName = req.user.name;
    const userId = req.user.userId;
    let image = req.file;


    try {
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'image'
            })

            image = result.secure_url;

            fs.unlinkSync(req.file.path)
        }
        // if(!content){
        //     return res.status(400).json('Please provide all data');
        // }
        const post = await new Post({ content, author: userId, image, authorImg: authimg, authorName: authName });

        await post.save();
        return res.status(200).json({ message: 'Post created', post });
    }
    catch (err) {
        console.log('post failed ', err);
        return res.status(500).json({ message: 'Network Error' });
    }
}

// get all post 

const getPost = async (req, res) => {
    const userId = req.user.userId;

    try {
        const post = await Post.find({ author: userId });
        if (!post) {
            return res.status(400).json({ message: 'Post not find' });
        }
        return res.status(200).json({ post });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Server Error' });
    }
}

// get request with pagination

const getallPost = async (req, res) => {
    const { page = 1, limit = 10, tag } = req.query;
    const query = tag ? { tags: tag } : {};

    try {
        const posts = await Post.find();
        
        return res.status(200).json({ posts});
    } catch (err) {
        return res.status(500).json({ message: 'Error fetching posts', err });
    }
}

// update post 

const updatePost = async (req, res) => {
    const { title, content, tags } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;

    try {
        const post = await Post.findById({ postId });

        if (!post) {
            return res.status(400).json({ message: 'No Post available' });
        }
        if (post.author.toString() !== userId) {
            return res.status(402).json({ message: 'you can only update your post' });
        }

        post.title = title || post.title;
        post.content = content || post.content;
        await post.save();

        return res.status(200).json({ message: 'Post updated', post });

    }
    catch (err) {
        return res.status(500).json({ message: 'Error updating post', err });
    }
}

// delete post

const deletePost = async (req, res) => {
    const _id  = req.params.id;
    const userId = req.user.userId;
    try {
        const post = await Post.findById(_id);
        if (!post) {
            return res.status(400).json({ message: 'No Post available' });
        }
        if (post.author.toString() !== userId) {
            return res.status(402).json({ message: 'you can only delete your post' });
        }

        await post.deleteOne();
        return res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error deleting post', err });
    }
}

const likeadd = async (req,res) => {
    const _id = req.params.id;
    const userId = req.user.id;

    try{
        const post = await Post.findById(_id);
        console.log(post);

        // if(post.likes.include(userId)){
        //     post.likes =post.likes.filter(id=> id.toString() != userId);
        // }
        // else{
        //     post.likes.push(userId)
        // }
        post.likes.push(userId)

        await post.save();
        return res.status(200).json({message:'Post updated successfully',likes:post.likes.length});
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Error at like add on post', err });
    }
}

export { createPost, getPost, getallPost, updatePost, deletePost,likeadd }
