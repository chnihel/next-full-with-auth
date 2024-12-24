"use client";

import React, { useState, useEffect } from "react";


interface Commande {
  id: string;
  name: string;
  email: string;
  phone: string;
  adresse: string;
  produit: string;
  quantite: number;
}

export default function GetCommandeById({ params }: { params: { id: string } }) {
  const [commande, setCommande] = useState<Commande>({
    id: "",
    name: "",
    email: "",
    phone: "",
    adresse: "",
    produit: "",
    quantite: 0,
  });
  const [loading, setLoading] = useState(true);



  const fetchDataCommande = async () => {
    try {
      console.log("Appel API avec ID :", params.id);
      const response = await fetch(`api/commandeID?id=${params.id}`, {
        method: "GET",

      });
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération de la commande.");
      }
      const data = await response.json();
      console.log("Données reçues de l'API :", data.dataCommande);
      setCommande(data.dataCommande);
    } catch (err) {
      console.error('add error:', err);
      alert('An error occurred while adding the command.');
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!params.id) return;
    fetchDataCommande();
  }, [params.id]);

  if (loading) {
    return <div>Chargement des détails de la commande...</div>;
  }



  if (!commande) {
    return <div>Aucune commande trouvée.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Détails de la commande</h1>
      <div className="border rounded p-4 shadow">
        <p>
          <strong>Nom :</strong> {commande.name}
        </p>
        <p>
          <strong>Email :</strong> {commande.email}
        </p>
        <p>
          <strong>Téléphone :</strong> {commande.phone}
        </p>
        <p>
          <strong>Adresse :</strong> {commande.adresse}
        </p>
        <p>
          <strong>Produit :</strong> {commande.produit}
        </p>
        <p>
          <strong>Quantité :</strong> {commande.quantite}
        </p>
      </div>
    </div>
  );
}
