
import Post from '../models/post.model.js'
import User from '../models/user.model.js'

// create post

const createPost = async (req,res) =>{
    const {title,content,tags } = req.body ;
    const userId = req.user ? req.user.id : null;
     

    try{
        if(!title || !content || !tags){
            return res.status(400).json('Please provide all data');
        }
        const post = new Post({title,content,tags,author:userId});

      await post.save();
      return res.status(200).json({message:'Post created',post});
    }
    catch(err){
        console.log('post failed ',err);
        return res.status(500).json({message:'Network Error'});
    }
}

// get all post 

const getPost = async (req,res)=>{
    const {postId} = req.params.postid ;

    try{
        const post = await Post.findById({postId});

        if(!post){
            return res.status(400).json({message:'Post not find'});
        }

        return res.status(200).json(post);
    }
    catch(err){
        console.log(err);
        return res.status(500).json({message:'Server Error'});
    }
}

// get request with pagination

const getPostnPagination = async (req,res)=>{
    const {page = 1, limit = 10,tag} = req.query;
    const query = tag ? {tags : tag} : {} ;

    try{
        const posts = await Post.find(query)
        .populate('author','name')
        .limit(limit*1)
        .skip((page - 1 )* limit)
        .exec();

        const count = await Post.countDocuments(query);
        return res.status(200).json({posts,totalPages: Math.ceil(count/limit), currentPage :page});
    }catch (err) {
        return res.status(500).json({ message: 'Error fetching posts', err });
    }
}

// update post 

const updatePost = async(req,res)=>{
    const {title,content,tags} = req.body ;
    const postId = req.params.id ;
    const userId = req.user.id ;

    try{
        const post = await Post.findById({postId});

        if(!post){
            return res.status(400).json({message:'No Post available'});
        }
         if(post.author.toString() !== userId ){
            return res.status(402).json({message:'you can only update your post'});
         }

         post.title = title || post.title;
         post.content = content || post.content;
         post.tag = tags || post.tags ;
         await post.save();

         return res.status(200).json({message:'Post updated',post});

    }
    catch (err) {
        return res.status(500).json({ message: 'Error updating post', err });
    }
}

// delete post

const deletePost = async (req,res)=>{
    const postId = req.params.id ;
    const userId = req.user.id ; 

    try{
        const post = await Post.findById({postId});
        if(!post){
            return res.status(400).json({message:'No Post available'});
        }
        if(post.author.toString() !== userId ){
            return res.status(402).json({message:'you can only delete your post'});
         }

         await post.remove();
         return res.status(200).json({ message: 'Post deleted successfully' });
        } catch (err) {
            return res.status(500).json({ message: 'Error deleting post', err });
        }
}   

export {createPost,getPost,getPostnPagination,updatePost,deletePost}
