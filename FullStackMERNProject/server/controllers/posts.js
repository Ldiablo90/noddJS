import PostMessage from '../models/postMessage.js'

export const getPosts = async (req, res) => {
    try{
        const postMessage = await PostMessage.find();
        res.status(200).json(postMessage);
    }
    catch(e){res.status(400).json({message: e.message});}
};
export const createPost = (req, res) => {
    const post = req.body;

    const newPost = new PostMessage(post);
    try{
        newPost.save();
        res.status(201).json(newPost);
    }
    catch(e){res.status(409).json({message: e.message})}
};