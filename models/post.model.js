    import mongoose from "mongoose";

    const postSchema = new mongoose.Schema({
        content:{
            type:String,
            required:true,
        },
        author:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true
        },
        authorImg : {
        type:mongoose.Schema.Types.String,
        ref:'User',
        required:true
        },
        authorName:{
            type : mongoose.Schema.Types.String,
            ref:'User',
            required:true
        },
        image:{
            type:String,
        },
        likes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }],
    
    },{timestamps:true})


    const Post = new mongoose.model('Post',postSchema);

    export default Post ;