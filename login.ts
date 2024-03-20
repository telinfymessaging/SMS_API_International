import * as express from 'express';
import * as cors from 'cors';
import * as jwt from 'jsonwebtoken';
import * as mysql from './db';
import { Router } from 'express';
import { error } from 'console';



const app = Router();
interface loginres{
    status:number,
    data:{
        message: string,
        UID: number,
        UNAME:string,
        token:string
    },
    error:string
}

app.use(express.json());
app.use(cors());

const signatureKey = 'pavan123@';

const option = { expiresIn: '1h' };

app.post('/login', async (req, res) => {
    // const uname = req.body.uname;
    // const pwd = req.body.pwd;
    // const query_str = `CALL Check_User(?,?,@uid,@uname); SELECT @uid UID, @uname UNAME`;

    try {
        const uname = req.body.uname;
        const pwd = req.body.pwd;
        const query_str = `CALL Check_User(?,?,@uid,@uname); SELECT @uid UID, @uname UNAME`;
    
        let responseData :loginres = {
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
            // res.status(200).json({
            //     message: "Authentication successful",
            //     UID: result[1][0].UID,
            //     UNAME: result[1][0].UNAME,
            //     token
            // })
            
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