import express from 'express';
import { addData, getAllData, getData } from './Controllers/DataController.js';




const router = express.Router()

router.get("/", (req, res) => {
    res.send("Hello,Server running for svg Application");;
})

router.post("/data", addData);
router.get("/data", getData);
router.get("/datas", getAllData);



export default router;
