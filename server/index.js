const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = express.Router();
const Fruit = require('./Models/Fruit');
const Legume = require('./Models/Legume');
const Employee = require('./Models/Employee');
//facture
const Facture = require('./Models/Facture');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/ang_proj");

// Routes pour les fruits

// Créer un nouveau fruit
app.post("/createfruit", (req, res) => {
    Fruit.create(req.body)
        .then(fruit => res.json(fruit))
        .catch(err => res.status(400).json({ message: "Error creating fruit", error: err }));
});

// Obtenir tous les fruits
app.get("/fruits", (req, res) => {
    Fruit.find({})
        .then(fruits => res.json(fruits))
        .catch(err => res.status(400).json({ message: "Error fetching fruits", error: err }));
});

// Endpoint pour obtenir un fruit par son ID
app.get("/fruit/:id", (req, res) => {
    const id = req.params.id;
    Fruit.findById(id)
        .then(fruit => {
            if (!fruit) {
                return res.status(404).json({ message: "Fruit not found" });
            }
            res.json(fruit);
        })
        .catch(err => res.status(400).json({ message: "Error fetching fruit", error: err }));
});

// Endpoint pour mettre à jour un fruit
app.put("/updatefruit/:id", (req, res) => {
    const id = req.params.id;
    Fruit.findByIdAndUpdate(id, req.body, { new: true })
        .then(fruit => {
            if (!fruit) {
                return res.status(404).json({ message: "Fruit not found" });
            }
            res.json(fruit);
        })
        .catch(err => res.status(400).json({ message: "Error updating fruit", error: err }));
});

// Supprimer un fruit
app.delete("/deletefruit/:id", (req, res) => {
    const id = req.params.id;
    Fruit.findByIdAndDelete(id)
        .then(fruit => {
            if (!fruit) {
                return res.status(404).json({ message: "Fruit not found" });
            }
            res.json({ message: "Fruit deleted successfully" });
        })
        .catch(err => res.status(400).json({ message: "Error deleting fruit", error: err }));
});

// Routes pour les légumes

// Créer un nouveau légume
app.post("/createlegume", (req, res) => {
    Legume.create(req.body)
        .then(legume => res.json(legume))
        .catch(err => res.status(400).json({ message: "Error creating legume", error: err }));
});

// Obtenir tous les légumes
app.get("/legumes", (req, res) => {
    Legume.find({})
        .then(legumes => res.json(legumes))
        .catch(err => res.status(400).json({ message: "Error fetching legumes", error: err }));
});

// Obtenir un légume par son ID
app.get("/legume/:id", (req, res) => {
    const id = req.params.id;
    Legume.findById(id)
        .then(legume => {
            if (!legume) {
                return res.status(404).json({ message: "Legume not found" });
            }
            res.json(legume);
        })
        .catch(err => res.status(400).json({ message: "Error fetching legume", error: err }));
});

// Mettre à jour un légume
app.put("/updatelegume/:id", (req, res) => {
    const id = req.params.id;
    Legume.findByIdAndUpdate(id, req.body, { new: true })
        .then(legume => {
            if (!legume) {
                return res.status(404).json({ message: "Legume not found" });
            }
            res.json(legume);
        })
        .catch(err => res.status(400).json({ message: "Error updating legume", error: err }));
});

// Supprimer un légume
app.delete("/deletelegume/:id", (req, res) => {
    const id = req.params.id;
    Legume.findByIdAndDelete(id)
        .then(legume => {
            if (!legume) {
                return res.status(404).json({ message: "Legume not found" });
            }
            res.json({ message: "Legume deleted successfully" });
        })
        .catch(err => res.status(400).json({ message: "Error deleting legume", error: err }));
});




//employee   



// Créer un nouvel employé
app.post("/createemployee", async (req, res) => {
    try {
      const { name, address, tele,salaire, login, password } = req.body;
      const newEmployee = new Employee({ name, address, tele,salaire, login, password });
      await newEmployee.save();
      res.status(201).json({ message: 'Employee created successfully', employee: newEmployee });
    } catch (error) {
      res.status(500).json({ message: 'Could not create employee', error: error.message });
    }
  });
  
  // Obtenir tous les employés
  app.get("/employees", async (req, res) => {
    try {
      const employees = await Employee.find();
      res.status(200).json(employees);
    } catch (error) {
      res.status(500).json({ message: 'Could not fetch employees', error: error.message });
    }
  });
  
  // Obtenir un employé par son ID
  app.get("/employees/:id", async (req, res) => {
    try {
      const employee = await Employee.findById(req.params.id);
      if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json(employee);
    } catch (error) {
      res.status(500).json({ message: 'Could not fetch employee', error: error.message });
    }
  });
  
  // Mettre à jour un employé
  app.put("/employees/:id", async (req, res) => {
    try {
      const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee updated successfully', employee: updatedEmployee });
    } catch (error) {
      res.status(500).json({ message: 'Could not update employee', error: error.message });
    }
  });
  
  // Supprimer un employé
  app.delete("/employees/:id", async (req, res) => {
    try {
      const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
      if (!deletedEmployee) {
        return res.status(404).json({ message: 'Employee not found' });
      }
      res.status(200).json({ message: 'Employee deleted successfully', employee: deletedEmployee });
    } catch (error) {
      res.status(500).json({ message: 'Could not delete employee', error: error.message });
    }
  });


  //login
  router.post('/login', async (req, res) => {
    const { login, password } = req.body;
    try {
        // Vérifier les informations d'identification dans la collection "employees"
        const employee = await Employee.findOne({ login, password });
        if (employee) {
            // Si les informations d'identification sont valides, renvoyer une réponse réussie avec l'ID de l'employé
            res.status(200).json({ message: 'Connexion réussie', employeeId: employee._id });
        } else {
            // Sinon, renvoyer une réponse indiquant des identifiants incorrects
            res.status(401).json({ message: 'Identifiants incorrects' });
        }
    } catch (error) {
        // En cas d'erreur serveur, renvoyer une réponse avec un code d'erreur 500
        console.error(error);
        res.status(500).json({ message: 'Erreur serveur' });
    }
});





// Contrôleur pour créer une nouvelle factureconst Facture = require('../models/Facture');

// Controller pour créer une nouvelle facture
// Créer une nouvelle facture
router.post("/facture", async (req, res) => {
  try {
    // Récupérer les données nécessaires depuis le corps de la requête
    const { employeeId, totalAmount, totalWeight } = req.body;

    // Vérifier si une facture existe déjà pour cet employé
    const existingFacture = await Facture.findOne({ employeeId });

    if (existingFacture) {
      // Si une facture existe déjà, mettre à jour les quantités et les soldes
      existingFacture.totalAmount += totalAmount;
      existingFacture.totalWeight += totalWeight;
      const updatedFacture = await existingFacture.save();
      return res.status(200).json(updatedFacture);
    } else {
      // Sinon, créer une nouvelle instance de Facture avec les données fournies
      const newFacture = new Facture({ employeeId, totalAmount, totalWeight });
      const savedFacture = await newFacture.save();
      return res.status(201).json(savedFacture);
    }
  } catch (error) {
    // En cas d'erreur, répondre avec un code d'erreur 500 et un message d'erreur
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la création ou de la mise à jour de la facture' });
  }
});

// Route pour récupérer toutes les factures
router.get("/facture", async (req, res) => {
  try {
    const aggregatedFactures = await Facture.aggregate([
      {
        $group: {
          _id: "$employeeId",
          totalAmount: { $sum: "$totalAmount" },
          totalWeight: { $sum: "$totalWeight" }
        }
      },
      {
        $lookup: {
          from: "employees", // Remplacez "employees" par le nom de votre collection d'employés
          localField: "_id",
          foreignField: "_id",
          as: "employee"
        }
      },
      {
        $unwind: "$employee"
      },
      {
        $project: {
          _id: "$employee.name",
          totalAmount: 1,
          totalWeight: 1
        }
      }
    ]);

    res.status(200).json(aggregatedFactures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur lors de la récupération des factures' });
  }
});


app.use(router);
  
  app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });