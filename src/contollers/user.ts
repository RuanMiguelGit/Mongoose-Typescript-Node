import  { Request, Response } from 'express'

import User, { IUSER } from '../model/User'

export const singUp = async (req:Request, res:Response) =>  {
    const { email, password} = req.body
    if(!email || !password) return res.status(400).json({message:'Erro campos invalidos'})
    const user = await User.findOne({email:email})
    if(user) return res.status(409).json({message:'Usuario ja existe'})
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(201).json(newUser)
}


export const singIn = (req:Request, res:Response) => {
return res.send('adas')
}