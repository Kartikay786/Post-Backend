import Comment from "../models/comment.model.js";
import Post from '../models/post.model.js'

// create comment

const createComment = async (req,res) => {
    const {comment} = req.body ;
    const postId = req.params.id ;
    const userId = req.user ? req.user.id : null

    try{
        const post = await Post.findById(postId);
        
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newcomment = new Comment({comment,author:userId,post:postId});
        await newcomment.save();
        return res.status(201).json(newcomment);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating comment', err });
    }
} 

export {createComment}