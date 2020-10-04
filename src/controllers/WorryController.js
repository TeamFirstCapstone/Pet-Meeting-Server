import { Worry } from "../models"

const getWorries = async (req, res) => {
    const offset = req.query.offset;
    const limit = req.query.limit;
    //limit offset 
    const worries = await Worry.findAll({ limit: 3, offset:0});
    res.send({
        status: true,
        message:
            result: fetchWorries()
    })0
}

const fetchWorry=(worry)=>({
    WID: worry.WID,
    Title:worry.Title,
    Text:worry.Text,
    Date:worry.Date,
    UID:worry.UID
})
const fetchWorries= (worries)=> worries.map(fetchWorry);

/*
const createParameterWorry=async function(req,res){

    const body=req.body;
    const record={
        limit: record.limit,
        offset:record.offset
    }
    const result=await Record.create(record)
}
*/

export default {
    getWorries
}