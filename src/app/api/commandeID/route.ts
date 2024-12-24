
/* eslint-disable @typescript-eslint/no-explicit-any */
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";

async function connectDataBase() {
  const client = await clientPromise 
  const db = client.db("full-next-app")
  const collection1 = db.collection('orders')
  return collection1
  
}
export async function GET(req: Request) {
  console.log("Requête reçue pour récupérer une commande par ID");


  try {
    
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  console.log("ID reçu :", id); 

  if (!id) {
    return NextResponse.json(
      { message: "ID manquant dans la requête", data: {} },
      { status: 400 }
    );
  }
    const collection1 = await connectDataBase();
       if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID invalide", data: {} },
        { status: 400 }
      );
    }
    const dataCommande = await collection1.findOne({ _id: new ObjectId(id) });

    console.log("Commande trouvée :", dataCommande); 

    if (dataCommande) {
      return NextResponse.json(
        {
          message: "Commande récupérée avec succès",
          dataCommande,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        {
          message: "Aucune commande trouvée avec cet ID",
          data: {},
        },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Erreur lors de la récupération de la commande", error);
    return NextResponse.json(
      {
        message: "Erreur interne du serveur",
        data: {},
      },
      { status: 500 }
    );
  }
}