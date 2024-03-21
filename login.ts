import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as mysql from './db';
import { Router } from 'express';
import { error } from 'console';
import * as inter from './Interfaces/Ilogin'
const app = Router();
app.use(express.json());
app.use(cors());

const signatureKey = 'pavan123@';

const option = { expiresIn: '1h' };

app.post('/login', async (req, res) => {
    try {
        let {uname,pwd}=req.body as inter.ILogin
        const query_str = `CALL Check_User(?,?,@uid,@uname); SELECT @uid UID, @uname UNAME`;
    
        let responseData : inter.ILoginResponce= {
            status : 400,
            data : {
                message : "null",
                UID : 0,
                UNAME:'null',
                token:"null"
            },
            error : 'Invalid'
        }
        const result = await mysql.query(query_str, [uname, pwd]);
        console.log(result,"1");
        if (result[1][0].UID > 0) {
            const token = jwt.sign({ ID: result[1][0].UID, NAME: result[1][0].UNAME }, signatureKey, option);
            console.log(token);

            responseData={
                status:200,
                data:{
                    message:"Successfully Logged In.",
                    UID:result[0][0],
                    UNAME:result[1][0],
                    token:token
                },
                error:"None"
            }
            res.status(200).json({
            Message : responseData
            })
        } else {
            res.status(400).json({
                message: responseData
            });
        }
    } catch (error) {
        console.error("error occurred", error);
        res.status(400).send({
            "code": 400,
            "failed": "Error occurred during authentication"
        });
    }
});
app.get('/gettoken', async (req, res) => {
    let readToken_header = req.headers.authorization;

    console.log(readToken_header, "This came from Browser Headers.");
    res.status(200).json({g:readToken_header})

});


export default app;