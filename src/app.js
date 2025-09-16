const express =  require('express');

const app = express();

app.get(/.*fly$/, (req, res) => {
    console.log(req.query);
    res.send({
        name: "Dinu",
        age: 29,
    })
});

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');
});