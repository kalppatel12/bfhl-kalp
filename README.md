# 🚀 BFHL API

An **Express.js** API that processes an array of input strings and classifies them into numbers, alphabets, and special characters.  
It also computes the sum of numbers and generates a special `concat_string` using all letters in the input.

---

## 📂 Project Setup

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd <repo-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the server
```bash
node index.js
```

By default, the API runs on **http://localhost:3000**

---

## ⚙️ Configuration

You can provide your personal details using **environment variables** or edit them directly in `index.js`.

| Variable         | Description                          | Default Value                              |
|------------------|--------------------------------------|--------------------------------------------|
| `FULL_NAME`      | Your full name                       | `kalp patel`                               |
| `DOB_DDMMYYYY`   | Date of birth in `ddmmyyyy` format   | `24012005`                                 |
| `EMAIL`          | Email address                        | `kalp.patel2022@vitstudent.ac.in`          |
| `ROLL_NUMBER`    | University Roll Number               | `22BCE1177`                                |

Example (Linux/macOS):
```bash
export FULL_NAME="John Doe"
export DOB_DDMMYYYY="01011999"
export EMAIL="john@xyz.com"
export ROLL_NUMBER="20BCE1001"
node index.js
```

---

## 📡 API Endpoints

### 1. Health Check
```http
GET /
```
**Response**
```
OK
```

---

### 2. Process Data
```http
POST /bfhl
Content-Type: application/json
```

**Request Body**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response**
```json
{
  "is_success": true,
  "user_id": "kalp_patel_24012005",
  "email": "kalp.patel2022@vitstudent.ac.in",
  "roll_number": "22BCE1177",
  "odd_numbers": ["1"],
  "even_numbers": ["334","4"],
  "alphabets": ["A","R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

---

## 🔍 Logic Overview

- **Numbers**
  - Integers are classified into `odd_numbers` or `even_numbers`.
  - `0` is excluded from odd/even arrays but still added to the sum.
  - Sum is returned as a string.

- **Alphabets**
  - Pure alphabetic strings are added to `alphabets` in uppercase.

- **Special Characters**
  - Strings with only symbols (e.g., `@`, `$`, `%`) or mixed content (`abc123`, `a$`) are treated as `special_characters`.

- **concat_string**
  - Collects **all letters** across all items.
  - Reverses them.
  - Applies **alternating caps** (Upper, lower, Upper, …).

---

## 🧪 Example Test Cases

### ✅ Test Case 1
**Input**
```json
{ "data": ["2","a","y","4","&","-","*","5","92","b"] }
```

**Output**
```json
{
  "is_success": true,
  "user_id": "kalp_patel_24012005",
  "email": "kalp.patel2022@vitstudent.ac.in",
  "roll_number": "22BCE1177",
  "odd_numbers": ["5"],
  "even_numbers": ["2","4","92"],
  "alphabets": ["A","Y","B"],
  "special_characters": ["&","-","*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

---

### ✅ Test Case 2
**Input**
```json
{ "data": ["A","ABcD","DOE"] }
```

**Output**
```json
{
  "is_success": true,
  "user_id": "kalp_patel_24012005",
  "email": "kalp.patel2022@vitstudent.ac.in",
  "roll_number": "22BCE1177",
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A","ABCD","DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}
```

---

### ✅ Test Case 3
**Input**
```json
{ "data": ["-7", "0", "Hello", "123", "9xyz", "@", "99"] }
```

**Output (highlights)**
```json
{
  "odd_numbers": ["-7","123","99"],
  "even_numbers": ["0"],
  "alphabets": ["HELLO"],
  "special_characters": ["9xyz","@"],
  "sum": "215",
  "concat_string": "OlleH"
}
```

---

## 🚀 Deployment

You can deploy this API on:
- [Railway](https://railway.app/)  
- [Render](https://render.com/)  
- [Vercel](https://vercel.com/) (requires serverless setup under `/api`)  

When deployed, your endpoint will be:
```
https://<your-app-host>/bfhl
```

---

## 👨‍💻 Author
- **Name**: Kalp Patel  
- **Roll Number**: 22BCE1177  
- **Email**: kalp.patel2022@vitstudent.ac.in  
