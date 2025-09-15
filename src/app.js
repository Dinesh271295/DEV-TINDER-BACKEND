const express =  require('express');

const app = express();

app.use("/test",(req, res)=> {
    res.send('Hello World from server test route!!!!!!!!!!!!!!');
})

app.use("/hello", (req, res) => {
    res.send('Hello World from server hello route!!!!!!!!!!!!!!');
})

app.use("/",(req, res)=> {
    res.send('Hello World from server!');
})


app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});