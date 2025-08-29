const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FULL_NAME = process.env.FULL_NAME || "kalp patel";
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "24012005";
const EMAIL = process.env.EMAIL || "kalp.patel2022@vitstudent.ac.in";
const ROLL_NUMBER = process.env.ROLL_NUMBER || "22BCE1177";

function toSlug(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z\s]+/g, "")
    .replace(/\s+/g, "_");
}

function userId() {
  return `${toSlug(FULL_NAME)}_${DOB_DDMMYYYY}`;
}

function isNumericString(s) {
  return /^-?\d+$/.test(s);
}

function isAlphaString(s) {
  return /^[A-Za-z]+$/.test(s);
}

app.get("/", (_req, res) => res.status(200).send("OK"));

app.post("/bfhl", (req, res) => {
  try {
    const body = req.body || {};
    const data = body.data;

    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        user_id: userId(),
        email: EMAIL,
        roll_number: ROLL_NUMBER,
        message: "'data' must be an array of strings",
      });
    }

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0n;

    const letters = [];

    for (const item of data) {
      const s = String(item ?? "").trim();
      if (s.length === 0) continue;

      if (isNumericString(s)) {
        const n = BigInt(s);
        if (n % 2n === 0n && n != 0n) even_numbers.push(s);
        else odd_numbers.push(s);
        sum += n;
      } else if (isAlphaString(s)) {
        alphabets.push(s.toUpperCase());
      } else if (/^[^A-Za-z0-9]+$/.test(s)) {
        special_characters.push(s);
      } else {
        special_characters.push(s);
      }

      for (const ch of s) {
        if (/[A-Za-z]/.test(ch)) letters.push(ch);
      }
    }

    const concat_string = letters
      .reverse()
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join("");

    return res.status(200).json({
      is_success: true,
      user_id: userId(),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: sum.toString(),
      concat_string,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      is_success: false,
      user_id: userId(),
      email: EMAIL,
      roll_number: ROLL_NUMBER,
      message: "Internal server error",
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`BFHL API listening on :${PORT}`));
