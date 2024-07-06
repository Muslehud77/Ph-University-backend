import config from "../config"
import { userModel } from "../modules/user/user.model";


const superUser = {
    id: '0001',
  email: 'fardinmohit@gmail.com',
  password: config.SUPER_ADMIN_PASSWORD,
  isPasswordNeedsChange: false,
  
  role:'super-admin',
  status: 'in-progress' ,
  isDeleted: false,
}

export const seedSuperAdmin = async ()=>{

    const isSuperAdminExists = await userModel.findOne({role:'super-admin'})

    if(!isSuperAdminExists){
        await userModel.create(superUser)
    }
}