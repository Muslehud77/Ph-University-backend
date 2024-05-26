
export type TUser = {
    id: string;
    password:string;
    isPasswordNeedsChange:boolean;
    role: 'student' | 'admin' | 'faculty';
    status : 'in-progress' | 'blocked';
    isDeleted:boolean
}