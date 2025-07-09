const { initializeDatabase } = require("./db/db.connect");
const Hotel = require("./models/hotel.models");
require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.use(express.json());

initializeDatabase();

const PORT = process.env.PORT || 3000;

// 1. Create an API with route "/hotels" to read all hotels from the Database. Test your API with Postman.

app.get("/hotels", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    if (hotels) {
      res.json(hotels);
    } else {
      return res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Unable to fetch data" });
  }
});
// 1. Create an API with route "/hotels" to create a new hotel data in the Database. Test your API with Postman.
app.post("/hotels", async (req, res) => {
  try {
    const newHotel = new Hotel(req.body);
    const saveHotel = await newHotel.save();
    if (!saveHotel) {
      return res.status(400).json({ error: "Unable to save hotel data" });
    }
    return res
      .status(201)
      .json({ message: "Successfully saved hotel data", hotel: saveHotel });
  } catch (error) {
    return res.status(500).json({ error: "Failed to save data" });
  }
});

// 2. Create an API with route "/hotels/:hotelName" to read a hotel by its name. Test your API with Postman.
app.get("/hotels/:hotelName", async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ name: req.params.hotelName });
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      return res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error fetching data" });
  }
});
// 3. Create an API with route "/hotels/directory/:phoneNumber" to read a hotel by phone number. Test your API with Postman.
app.get("/hotels/directory/:phoneNumber", async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ phoneNumber: req.params.phoneNumber });
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      return res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error fetching data" });
  }
});
// 4. Create an API with route "/hotels/rating/:hotelRating" to read all hotels by rating. Test your API with Postman.
app.get("/hotels/rating/:hotelRating", async (req, res) => {
  try {
    const hotel = await Hotel.find({ rating: req.params.hotelRating });
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      return res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error fetching data" });
  }
});
// 5. Create an API with route "/hotels/category/:hotelCategory" to read all hotels by category. Test your API with Postman.
app.get("/hotels/category/:hotelCategory", async (req, res) => {
  try {
    const hotel = await Hotel.find({ category: req.params.hotelCategory });
    if (hotel) {
      res.status(200).json(hotel);
    } else {
      return res.status(404).json({ error: "Hotel not found" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error fetching data" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// 1. Create an API with route "/hotels/:hotelId" to delete a hotel data by their ID in the Database. Test your API with Postman.
app.delete("/hotels/:hotelId", async (req, res) => {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.hotelId);
    if (!deletedHotel) {
      return res.status(404).json({ error: "Restaurant not found" });
    }
    res.status(200).json({
      message: "Hotel deleted successfully",
      deletedHotel: deletedHotel,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete hotel data" });
  }
});

//  1. Create an API to update a hotel data by their ID in the Database. Update the rating of an existing hotel. Test your API with Postman.
app.post("/hotels/:hotelId", async (req, res) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.hotelId,
      req.body,
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).json({ error: "Hotel not found" });
    }
    return res.status(200).json({
      message: "Hotel updated successfully.",
      updatedHotel: updatedHotel,
    });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update hotel details." });
  }
});
