const express=require('express');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cors=require('cors');
const bodyParser=require('body-parser');
const userRoutes=require('./routes/userRoutes')
const jobRoutes=require('./routes/jobRoutes')
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(console.log('Database connected successfully')).catch((e)=>console.log(e))
const app=express();
const port=6000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/user',userRoutes)
app.use('/api/job',jobRoutes)
app.listen(port,()=>{
    console.log(`server running in port ${port}`)
})