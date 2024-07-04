import { v2 as cloudinary } from 'cloudinary';
import config from '../config';
import multer from 'multer';


export const sendImageToCloudinary = async ()=>{
  cloudinary.config({
    cloud_name: config.CLOUDINARY_CLOUD_NAME,
    api_key: config.CLOUDINARY_API_KEY,
    api_secret: config.CLOUDINARY_API_SECRET,
  });


  

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(
      'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg',
      {
        public_id: 'shoes',
      },
    )
    .catch(error => {
      console.log(error);
    });

  console.log(uploadResult);
 
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd()+'/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });