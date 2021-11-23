import  { model, Schema, Document } from 'mongoose'
import bcrypt from 'bcrypt'

export interface IUSER extends Document {
    email:string,
    password:string,
    comparePassword: (password: string) => Promise<Boolean>

}

const userSchema:Schema<IUSER> = new Schema ({
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true
    },
    password: {
        type:String,
        required:true
    }
})

userSchema.pre<IUSER>('save', async function(next) {
    const user = this
    if(!user.isModified('password')) return next()
    const Salt = await bcrypt.genSalt(10)
    const Hash = await  bcrypt.hash(user.password, Salt)
    user.password = Hash
})

userSchema.methods.comparePassword = async function (password:string):Promise<Boolean>{
    return await bcrypt.compare(password, this.password)
}
export default model<IUSER>('User', userSchema)