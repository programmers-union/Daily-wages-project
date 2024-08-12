import {v2 as cloudinary} from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name:'dmeaa4vec',
    api_key:'331399461538636',
    api_secret:'m0X1c8B3JAwD-OrtI5Efdl4Wvyk'
})
const uploadIcon = async (buffer: Buffer): Promise<string> => {
    console.log("here with buffer");
    console.log("bufferr:",buffer);
    return new Promise((resolve,reject)=>{
        const uploadStream=cloudinary.uploader.upload_stream((error,result)=>{
            if(error){
                return reject(error);
            }
            console.log("result");
            resolve(result?.secure_url??'');
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
        
    })
}
export default uploadIcon;