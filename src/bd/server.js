import express from "express"
import routerUser from "./routes/users.js"
import cors from "cors";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/",routerUser)

app.listen(8800)
