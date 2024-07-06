/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

const deleteFile = (path:string) => {
     fs.unlink(path, err => {
       if (err) {
         console.log(err)
       } else {
         console.log('File Has Been Deleted');
       }
     });
}

export const sendImageToCloudinary = (
  imageName: string,
  path: string,
): Promise<Record<string,unknown>> => {
  cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    // Upload an image
     cloudinary.uploader
      .upload(path, {
        public_id: imageName,
      },(error,result)=>{
        if(error){
            reject(error)
            deleteFile(path)
        }else{
            resolve(result as Record<string,unknown>)
            deleteFile(path)
        }
      })

    
   
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
