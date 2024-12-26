/* eslint-disable @typescript-eslint/no-explicit-any */
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

async function connectDataBase() {
  const client = await clientPromise 
  const db = client.db("full-next-app")
  const collection2 = db.collection('users')
  return collection2
  
}

export  async function POST ( req : Request ){


  console.log("new user" )
  try {
      const collection2 = await connectDataBase()
      const body = await req.json() ;

      const {fullName, email, password} = body;

      const user = await collection2.findOne({email})

       if(user){
            return NextResponse.json({error: "User already exists"}, {status: 400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

    
    

      const result = await collection2.insertOne({
            fullName,
            email,
            password: hashedPassword
        })
      if(result.acknowledged){
        return NextResponse.json({
          message : "utilisateur ajouté avec succès",
          data:{
            ...body ,
            _id : result.insertedId
          }
        },{status:201})
      }else {
return NextResponse.json({
  message : "erreur lors de l'ajout d'utilisateur",
  data : {}
  },{status:400})
      }

    
  } catch (error) {
    console.error('Erreur lors de la création de utilisateur', error)
    return NextResponse.json({
      message : "erreur lors de l'ajout de utilisateur",
      data : {}
      },{status:500})
    
  }

  
}