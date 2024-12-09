import {v2 as cloudinary} from 'cloudinary'
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';  

const cloudinaryconfig = ()=>{
       
    cloudinary.config({
    cloud_name: 'ddmfbxest',
    api_key:'775561938588839',
    api_secret:'iO7Tgv_7y7KOfMLJGndVV5njG2Q'
})
}

cloudinaryconfig();

const storage = new CloudinaryStorage({
    cloudinary,
    params:{
        folder : 'user-images',
        allowedFormats :['jpg','png','jpeg']
    }
})

export default cloudinary
export const upload = multer({storage});