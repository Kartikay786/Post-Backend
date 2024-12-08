import Comment from "../models/comment.model.js";
import Post from '../models/post.model.js'

// create comment

const createComment = async (req, res) => {
    const { comment } = req.body;
    const _id = req.params.id;
    const userId = req.user.userId;

    try {
        const post = await Post.find({_id});

        if (!post) return res.status(404).json({ message: 'Post not found' });

        const newcomment = new Comment({ comment, author: userId, post: _id });
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
        
        return res.status(200).json({ comments });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'Error fetching posts', err });
    }
}

const likesupdate = async (req,res)=>{
    const postId = req.params.id;
    const userId = req.user.userId;

    try{
        const post = await Comment.find({postId});
        if(!post) return res.status(400).json({message:"Post not found"});

        const alreadyliked = Comment.likes.includes(userId);

        if(alreadyliked) { 
            post.likes = post.likes.filter(id => id.toSting() !=  userId);
            await post.save();
            return res.status(200).json({message:'Post unliked',likes : post.likes.length});
        }
        else{
            post.likes.push(userId);
            await post.save();
            return res.status(200).json({message:'Post liked',likes:post.likes.length});
        }

        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({ message: 'Error updating likes', err });
    }
}

const likesadd = (req,res)=>{

}

export { createComment, getComment ,likesupdate }

