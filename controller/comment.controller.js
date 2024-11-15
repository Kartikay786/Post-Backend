import Comment from "../models/comment.model.js";
import Post from '../models/post.model.js'

// create comment

const createComment = async (req, res) => {
    const { comment } = req.body;
    const postId = req.params.id;
    const userId = req.params.userid;

    try {
        const post = await Post.findById(postId);

        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newcomment = new Comment({ comment, author: userId, post: postId });
        await newcomment.save();
        return res.status(201).json(newcomment);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error creating comment', err });
    }
}

const getComment = async (req, res) => {
    const post = req.params.id;
    try {
        const comments = await Comment.find({ post });
        if (!comments) return res.status(400).json({ message: 'no comments available' })
        console.log(comments);
        return res.status(200).json({ comments });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching posts', err });
    }
}

export { createComment, getComment }

