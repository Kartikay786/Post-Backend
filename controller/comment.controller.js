import Comment from "../models/comment.model.js";
import Post from '../models/post.model.js'

// create comment

const createComment = async (req,res) => {
    const {content} = req.body ;
    const postId = req.params.id ;
    const userId = req.user.id;

    try{
        const post = await Post.findById(postId);
        if (!post) return res.status(404).json({ message: 'Post not found' });

        const comment = new Comment({content,author:userId,post:postId});
        await comment.save();
        return res.status(201).json(comment);
    } catch (err) {
        return res.status(500).json({ message: 'Error creating comment', err });
    }
}

export {createComment}