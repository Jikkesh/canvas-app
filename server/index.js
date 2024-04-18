import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import router from './Allroutes.js';
import pool from './db.js';


const app = express();
dotenv.config();

app.use(cors({
  origin: '*'
}));

app.use(express.json({ limit: 'Infinity', extended: true }))
app.use(express.urlencoded({ limit: 'Infinity', extended: true }))


app.use("/", router)


pool.on('error', (err) => {
  console.error('Unexpected error on idle client:', err)
  process.exit(-1)
});

const port = process.env.PORT
app.listen(port, () => console.log(`Server running http://localhost:${port}`));