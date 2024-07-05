import config from "../config"
import { UserModel } from './../modules/user/user.interface';

const superUser = {
    id: '0001',
  email: 'fardinmohit@gmail.com',
  password: config.SUPER_ADMIN_PASSWORD,
  isPasswordNeedsChange: false,
  
  role:'super-admin',
  status: 'in-progress' ,
  isDeleted: false,
}

const seedSuperAdmin = async ()=>{

    const isSuperAdminExists = await UserModel.findOne({role:'super-admin'})

}