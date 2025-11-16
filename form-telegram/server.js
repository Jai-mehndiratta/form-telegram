import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const TELEGRAM_URL = `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`;

app.post("/submit-form", async (req, res) => {
  try {
    const { name, phone, loanType, amount } = req.body;

    const message = `
New Loan Lead:
Name: ${name}
Phone: ${phone}
Type: ${loanType}
Amount: ${amount}
`;

    await axios.post(TELEGRAM_URL, {
      chat_id: process.env.CHAT_ID,
      text: message
    });

    return res.json({ success: true });
  } catch (err) {
    console.error(err.response?.data || err);
    return res.status(500).json({ success: false });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

