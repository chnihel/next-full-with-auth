"use client"

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Commande {
  name: string;
  email: string;
  phone: string;
  adresse: string;
  produit: string;
  quantite: number;


}

export default function Addcommande() {


  const router = useRouter();

  const [formData, setFormData] = useState<Commande>({
    name: "",
    email: "",
    phone: "",
    adresse: "",
    produit: "",
    quantite: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantite" ? parseFloat(value) : value,
    });

  }

  const AddCommande = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      const response = await fetch('api/commande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        alert('commande added successfully!');
        console.log(data);
        router.push("/commande/Read");


      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }

    } catch (err) {
      console.error('add error:', err);
      alert('An error occurred while adding the command.');

    }
  }

  return (
    <div>
      <h1 className="font-weight-semi-bold text-uppercase mb-3">Add Commande </h1>
      <div className="row px-xl-5">
        <div className="col-lg-7 mb-5">
          <div className="contact-form">
            <div id="success" />
            <form onSubmit={AddCommande} >

              <div className="control-group">
                <input type="text" className="form-control" id="name" placeholder="Your Name" required data-validation-required-message="Please enter your name" name="name" onChange={handleChange}

                />
                <p className="help-block text-danger" />
              </div>

              <div className="control-group">
                <input type="text" className="form-control" id="email" placeholder="Email" required data-validation-required-message="Please enter email" name="email" onChange={handleChange}

                />
                <p className="help-block text-danger" />
              </div>
              <div className="control-group">
                <input type="text" className="form-control" id="phone" placeholder="Phone" required data-validation-required-message="Please enter phone" name="phone" onChange={handleChange}

                />
                <p className="help-block text-danger" />
              </div>

              <div className="control-group">
                <input type="text" className="form-control" id="adresse" placeholder="Address" required data-validation-required-message="Please enter address" name="adresse" onChange={handleChange}
                />
                <p className="help-block text-danger"
                />
              </div>
              <div className="control-group">
                <input type="text" className="form-control" id="produit" placeholder="Produit" required data-validation-required-message="Please enter produit" name="produit" onChange={handleChange}

                />
                <p className="help-block text-danger" />
              </div>
              <div className="control-group">
                <input type="number" className="form-control" id="quantite" placeholder="Quantity" required data-validation-required-message="Please enter Quantity" name="quantite" onChange={handleChange}

                />
                <p className="help-block text-danger" />
              </div>



              <div>
                <button className="btn btn-primary py-2 px-4 mt-6" type="submit" id="loginButton">Add
                </button>

              </div>
              <div>

              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  )
}

