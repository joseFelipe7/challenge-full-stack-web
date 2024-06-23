import express from "express";
import dotenv from 'dotenv';
import {router} from "@/routes/index";
import cors from "cors";

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());
app.use(router);

app.listen(3030, () => console.log("Server is running on PORT 3030"));