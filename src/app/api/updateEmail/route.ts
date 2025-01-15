/* eslint-disable @typescript-eslint/no-explicit-any */
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";


async function connectDataBase() {
  const client = await clientPromise 
  const db = client.db("full-next-app")
  const collection2 = db.collection('users')
  return collection2
  
}

export  async function POST ( req : Request ){


  console.log("login user" )
  try {
      const collection2 = await connectDataBase()
      const {email} = await req.json() ;

      const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Not authorized" }, { status: 400 });
    }
          


      const  doesUserExist = await collection2.findOne({ email: session?.user?.email })

         if(!doesUserExist){
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const  updateEmail = await collection2.updateOne({ email: session?.user?.email }, {
        $set: {
            email
        }
      });
      if (updateEmail){
          return NextResponse.json({ success: "Email changed with success" }, { status: 200 });
      }
  
  } catch (error) {
      return NextResponse.json({ error: "erreur update email serveur" +error }, { status: 500 });

    
  }

  
}