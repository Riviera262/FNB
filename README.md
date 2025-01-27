# Project Notes

## ⚠️ WARNING
- This project can **only** be used with an account from **fnb.kiotviet.vn**.
- If you have an account, go to the `backend` folder, navigate to `config => token.js`, and provide the necessary credentials of your KiotViet account to establish the connection.

## 📂 DATABASE
- The project uses **local MongoDB** (MongoDB installed on your machine).  
- If the connection fails, check and ensure your local MongoDB setup is correct.
- You can modify the database connection configuration in the `.env` file located at the project root.

## 🐞 BUGS
- The code works **fairly well**, but there is a known bug in `src/pages/userDetail` in the `adminfe` folder:  
  - Specifically, the `password` field is affected by `bcrypt`, which causes it to automatically update to a new hashed password when you navigate away without making changes.  
  - This requires attention and debugging.

---

Feel free to adjust these notes or ask if you need further assistance!
