/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Commande {
  _id: string;
  name: string;
  email: string;
  phone: string;
  adresse: string;
  produit: string;
  quantite: number;
}

export default function Getcommande() {
  const [Commandes, setCommandes] = useState<Commande[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [commandeToEdit, setCommandeToEdit] = useState<Commande | null>(null);

  const getCommande = async (): Promise<any> => {
    try {
      const response = await fetch('api/commande', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCommandes(data.data);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (err) {
      console.error('add error:', err);
      alert('An error occurred while adding this command.');
    }
  };

  useEffect(() => {
    getCommande();
  }, []);


  const openModal = (commande: Commande) => {
    setCommandeToEdit(commande);
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
    setCommandeToEdit(null);
  };


  const handleEdit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();

    if (!commandeToEdit || !commandeToEdit._id) {
      alert('Commande invalide');
      return;
    }

    try {
      console.log("Commande modifiée:", commandeToEdit);
      const  id  =  commandeToEdit._id
      console.log("Commande ID:",  id );

      const response = await fetch(`api/commande?id=${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commandeToEdit),
      });

      if (!response.ok) {
        const errorMessage = await response.text(); // Lire la réponse en texte brut
        alert(`Erreur lors de la mise à jour : ${errorMessage}`);
        return;
      }

      let data;

      try {
        data = await response.json();
      } catch (err) {
        console.error('Erreur lors du parsing JSON:', err);
        alert('Erreur lors de la mise à jour, le format de la réponse est incorrect.');
        return;
      }
      alert('Commande mise à jour avec succès!');
      console.log('Réponse du serveur:', data);


      setCommandes((prevCommandes) =>
        prevCommandes.map((commande) =>
          commande._id === commandeToEdit._id ? commandeToEdit : commande
        )
      );

      closeModal();
      getCommande();

    } catch (err) {
      console.error('Erreur lors de la mise à jour:', err);
      alert('Une erreur est survenue lors de la mise à jour de la commande.');
    }
  };


  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/commande?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Supprimer la commande du tableau local
        setCommandes((prevCommandes) => prevCommandes.filter((commande) => commande._id !== id));
        alert("Commande supprimée avec succès");
      } else {
        const error = await response.json();
        alert(`Erreur lors de la suppression: ${error.message}`);
      }
    } catch (err) {
      console.error('Error deleting commande:', err);
      alert('Une erreur est survenue lors de la suppression de la commande.');
    }
  };




  return (
    <div className="flex justify-center items-center">
      <h1 className="font-weight-semi-bold text-uppercase mb-3 text-center">Get all Commands</h1>
      <div className="row px-xl-5 ">
        <div className="col-lg-7 mb-5 ">
          <div className="container mt-3">
            {Commandes.length > 0 ? (
              <>
                <table className="min-w-full bg-white border  border-gray-200">
                  <thead className="bg-gray-800 text-white">
                    <tr>
                      <th className="px-6 py-3 text-left">Name</th>
                      <th className="px-6 py-3 text-left">Email</th>
                      <th className="px-6 py-3 text-left">Phone</th>
                      <th className="px-6 py-3 text-left">Adresse</th>
                      <th className="px-6 py-3 text-left">Produit</th>
                      <th className="px-6 py-3 text-left">Quantité</th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Commandes.map((key, index) => (
                      <tr key={index} className="border-t border-gray-200">
                        <td className="px-6 py-4">{key.name}</td>
                        <td className="px-6 py-4">{key.email}</td>
                        <td className="px-6 py-4">{key.phone}</td>
                        <td className="px-6 py-4">{key.adresse}</td>
                        <td className="px-6 py-4">{key.produit}</td>
                        <td className="px-6 py-4">{key.quantite}</td>
                        <td className="px-6 py-4 flex justify-center gap-4">
                          {/* Bouton Détails */}
                          <Link href={`/commande/${key._id}`} className="text-blue-500 hover:text-blue-700" title="Détails">
                            <i className="fas fa-info-circle"></i>
                          </Link>
                          <button
                            onClick={() => openModal(key)}
                            className="text-yellow-500 hover:text-yellow-700"
                            title="Modifier"
                          >
                            <i className="fas fa-edit"></i>
                          </button>
                          <button
                            onClick={() => handleDelete(key._id.toString())} className="text-red-500 hover:text-red-700" title="Supprimer">
                            <i className="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            ) : (
              <div className="text-center py-5">
                <h3 className="text-secondary">Votre tableau est vide</h3>
                <p>Ajoutez des commandes pour continuer vos achats.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && commandeToEdit && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h2 className="text-2xl font-bold mb-4">Modifier la commande</h2>
            <form onSubmit={handleEdit}>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Nom</label>
                <input
                  type="text"
                  value={commandeToEdit.name}
                  onChange={(e) => setCommandeToEdit({ ...commandeToEdit, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Email</label>
                <input
                  type="email"
                  value={commandeToEdit.email}
                  onChange={(e) => setCommandeToEdit({ ...commandeToEdit, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Téléphone</label>
                <input
                  type="text"
                  value={commandeToEdit.phone}
                  onChange={(e) => setCommandeToEdit({ ...commandeToEdit, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Adresse</label>
                <input
                  type="text"
                  value={commandeToEdit.adresse}
                  onChange={(e) => setCommandeToEdit({ ...commandeToEdit, adresse: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Produit</label>
                <input
                  type="text"
                  value={commandeToEdit.produit}
                  onChange={(e) => setCommandeToEdit({ ...commandeToEdit, produit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold mb-2">Quantité</label>
                <input
                  type="number"
                  value={commandeToEdit.quantite}
                  onChange={(e) => setCommandeToEdit({ ...commandeToEdit, quantite: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">
                  Annuler
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                  Modifier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
