export  async function cronJob(req,res) {
    try{

        res.status(200).json({ status: "ok", time: new Date().toISOString() });
    }catch(error){
        console.log(error);
    }
}
