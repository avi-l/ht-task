import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import House from "./House";
import cors from "cors";
import { calculateRisk, fetchRandomHousePic } from "./utils";
const app = express();
app.use(cors());
const port = 3000;

app.use(bodyParser.json());

// Create a new house record
app.post("/api/houses", async (req: Request, res: Response) => {
  try {
    const { address, currentValue, loanAmount } = req.body || {};

    const image = await fetchRandomHousePic();
    const house = await House.create({
      address,
      currentValue,
      loanAmount,
      risk: calculateRisk({ currentValue, loanAmount }),
      image,
    });

    res.json(house);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a house record" });
  }
});

// Fetch a house record by ID
app.get("/api/houses/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const house = await House.findByPk(id);

    if (!house) {
      res.status(404).json({ error: "House record not found" });
    } else {
      res.json(house);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch the house record" });
  }
});

// Update a house record by ID
app.put("/api/houses/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { address, currentValue, loanAmount, risk } = req.body;

    const house = await House.findByPk(id);

    if (!house) {
      res.status(404).json({ error: "House record not found" });
    } else {
      await house.update({
        address,
        currentValue,
        loanAmount,
        risk: calculateRisk({ currentValue, loanAmount }),
      });

      res.json(house);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the house record" });
  }
});

// fetch houses using pagination
app.get("/api/fetchHouses", async (req: Request, res: Response) => {
  try {
    const offset = Number(req.query.offset) || 0; // Get the offset from query parameter, default to 0
    const limit = Number(req.query.limit) || 100; // Get the limit from query parameter, default to 10

    const houses = await House.findAll({
      offset,
      limit,
    });

    res.json(houses);
  } catch (error) {
    console.error("Failed to fetch houses:", error);
    res.status(500).json({ error: "Failed to fetch houses" });
  }
});

app.delete("/api/houses/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const house = await House.findByPk(id);

    if (!house) {
      res.status(404).json({ error: "House record not found" });
    } else {
      await house.destroy();

      res.json({ message: "House record deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete the house record" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
