import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as mysql from './db';
import { Router} from 'express';
const app = Router();


app.use(express.json());
app.use(cors());


interface TokenPayload {
    ID: number;
}

const signatureKey = 'pavan123@';
app.get('/', async (req, res) => {
    let getTokenFromHeader = req.headers.authorization;
    if (!getTokenFromHeader) {
        return res.status(401).json({ message: "Authorization header missing."});
    }

    const decodedToken = jwt.verify(getTokenFromHeader, signatureKey) as TokenPayload;

    console.log(decodedToken.ID);

    try {
        const resultOfQuery1 = await  mysql.query(`CALL SenderData(?)`, [decodedToken.ID]);
        const resultOfQuery2 = await mysql.query(`CALL groups1_Info(?)`, [decodedToken.ID]);
        const resultOfQuery3 = await mysql.query(`CALL Get_Msgs(?)`, [decodedToken.ID]);
        const resultOfQuery4 = await mysql.query(`CALL Get_Temps(?)`, [decodedToken.ID]);

        console.log(resultOfQuery1[0], resultOfQuery2[0], resultOfQuery3[0], resultOfQuery4[0]);

        if (decodedToken.ID > 0) {
            res.status(200).json({
                SenderData: resultOfQuery1[0],
                groups1_Info: resultOfQuery2[0],
                Get_Msgs: resultOfQuery3[0],
                Get_Temps: resultOfQuery4[0]
            });
        } else {
            res.status(401).json({
                message: "Invalid username or password."
            });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
});

export default app;