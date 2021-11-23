import  { Request, Response } from 'express'

import User, { IUSER } from '../model/User'
import jwt from "jsonwebtoken";
import config from "../config/config";

function createToken(user: IUSER) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 86400
  });
}

export const singUp = async (req:Request, res:Response):Promise<Response> =>  {
    const { email, password} = req.body
    if(!email || !password) return res.status(400).json({message:'Erro campos invalidos'})
    const user = await User.findOne({email:email})
    if(user) return res.status(409).json({message:'Usuario ja existe'})
    const newUser = new User(req.body)
    await newUser.save()
    return res.status(201).json(newUser)
}


export const singIn = async (req:Request, res:Response) => {
    const { email, password} = req.body
    if(!email || !password) return res.status(400).json({message:'Erro campos invalidos'})
 
    const user = await User.findOne({email: email})
    if(!user) return res.status(400).json({message: 'Usuario não existe'})
    const isMatch = await user.comparePassword(password)
    if(isMatch) return res.status(200).json({
    message:"Bem Vindo",
    tokem: createToken(user)
    })
    return res.status(400).json({
        message:"Dados de acesso inválidos"
    })
}

export const UserIsValid = async (req:Request, res:Response): Promise<Response> => {
return res.send('I am a secure route validated with passport.js')
}