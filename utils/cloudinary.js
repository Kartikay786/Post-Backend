import {v2 as cloudinary} from 'cloudinary'

const cloudinaryconfig = ()=>{
       
    cloudinary.config({
    cloud_name: 'ddmfbxest',
    api_key:'775561938588839',
    api_secret:'iO7Tgv_7y7KOfMLJGndVV5njG2Q'
})
}

cloudinaryconfig();

export default cloudinary