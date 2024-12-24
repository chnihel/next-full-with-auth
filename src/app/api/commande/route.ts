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


export  async function POST ( req : Request ){
  const body = await req.json() ;
  console.log("nouvelle commande" , body)
  try {
      const collection1 = await connectDataBase()

      const result = await collection1.insertOne(body)
      if(result.acknowledged){
        return NextResponse.json({
          message : "commande ajoutée avec succès",
          data:{
            ...body ,
            _id : result.insertedId
          }
        },{status:201})
      }else {
return NextResponse.json({
  message : "erreur lors de l'ajout de la commande",
  data : {}
  },{status:400})
      }

    
  } catch (error) {
    console.error('Erreur lors de la création de la commande', error)
    return NextResponse.json({
      message : "erreur lors de l'ajout de la commande",
      data : {}
      },{status:500})
    
  }

  
}


 export async function GET() {
    console.log("get all  commands" )

  try {
      const collection1 = await connectDataBase()

      const result = await collection1.find().toArray();
      if(result){
        return NextResponse.json({
          message : "tous les commandes récupérées avec succès",
          data:result
        },{status:201})
      }else {
        return NextResponse.json({
          message : "erreur lors de la récupération des commandes",
          data : {}
          },{status:400})
      }

    
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes', error)
    return NextResponse.json({
      message : "erreur lors de la récupération des commandes",
      data : {}
      },{status:500})
    
  }
  
} 

export async function GETBYID(req: Request) {
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

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  console.log("ID reçu :", id);

  const body = await req.json();

  if (!id || !ObjectId.isValid(id)) {
    return NextResponse.json(
      { message: "ID invalide ou manquant", data: {} },
      { status: 400 }
    );
  }
 if (body._id) {
    delete body._id;
  }
  try {
    const collection1 = await connectDataBase();
const result = await collection1.updateOne(
      { _id: new ObjectId(id) },
      { $set: body }
    );

    if (result.matchedCount > 0) {
      return NextResponse.json({
        message: "Commande mise à jour avec succès",
        data: result,
      });
    } else {
      return NextResponse.json({
        message: "Aucune commande trouvée avec cet ID",
        data: {},
      }, { status: 404 });
    }
  } catch (error) {
    console.error("Erreur lors de la modification de la commande", error);
    return NextResponse.json({
      message: "Erreur interne du serveur",
      data: {},
    }, { status: 500 });
  }
}


export async function DELETE(req: Request) {
  console.log("Requête reçue pour modifier une commande");

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  
  console.log("ID reçu :", id); 



  if (!id) {
    return NextResponse.json(
      { message: "ID manquant dans la requête", data: {} },
      { status: 400 }
    );
  }

  try {
    const collection1 = await connectDataBase();
       if (!ObjectId.isValid(id)) {
      return NextResponse.json(
        { message: "ID invalide", data: {} },
        { status: 400 }
      );
    }
    const result = await collection1.deleteOne({ _id: new ObjectId(id) 
      });

    console.log("Commande modifiée :", result); 

    if (result) {
      return NextResponse.json(
        {
          message: "Commande récupérée avec succès",
          data: result,
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
    console.error("Erreur lors de la modification de la commande", error);
    return NextResponse.json(
      {
        message: "Erreur interne du serveur",
        data: {},
      },
      { status: 500 }
    );
  }
}
