/* eslint-disable @typescript-eslint/no-explicit-any */
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

async function connectDataBase() {
  const client = await clientPromise 
  const db = client.db("nextdata")
  const collection2 = db.collection('users')
  return collection2
  
}

export  async function POST ( req : Request ){


  console.log("login user" )
  try {
      const collection2 = await connectDataBase()
      const body = await req.json() ;

          const {email, password} = body


      const user = await collection2.findOne({email})

         if(!user){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const validPassword = await bcryptjs.compare
        (password, user.password)
        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

  

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
             user: {
                fullName: user.fullName,
                email: user.email,
}
        })
      
            return response ;


    
  } catch (error) {
    console.error('Erreur lors de login', error)
    return NextResponse.json({
      message : "erreur lors de login",
      data : {}
      },{status:500})
    
  }

  
}