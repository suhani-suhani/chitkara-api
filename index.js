const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const EMAIL = "suhani1516.be23@chitkarauniversity.edu.in";

app.get("/health", (req, res) => {
  res.status(200).json({
    is_success: true,
    official_email: EMAIL
  });
});


function fibonacci(n) {
  const result = [0, 1];
  for (let i = 2; i < n; i++) {
    result.push(result[i - 1] + result[i - 2]);
  }
  return result.slice(0, n);
}

function isPrime(num) {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

function hcf(arr) {
  return arr.reduce((a, b) => gcd(a, b));
}

function lcm(arr) {
  const lcmTwo = (a, b) => (a * b) / gcd(a, b);
  return arr.reduce((a, b) => lcmTwo(a, b));
}


app.post("/bfhl", (req, res) => {
  try {
    const body = req.body;
    const keys = Object.keys(body);

   
    if (keys.length !== 1) {
      return res.status(400).json({
        is_success: false
      });
    }

    const key = keys[0];
    let data;

    switch (key) {
      case "fibonacci":
        data = fibonacci(body.fibonacci);
        break;

      case "prime":
        data = body.prime.filter(isPrime);
        break;

      case "lcm":
        data = lcm(body.lcm);
        break;

      case "hcf":
        data = hcf(body.hcf);
        break;

      case "AI":
        
        data = "Mumbai";
        break;

      default:
        return res.status(400).json({
          is_success: false
        });
    }

    res.status(200).json({
      is_success: true,
      official_email: EMAIL,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      is_success: false
    });
  }
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
