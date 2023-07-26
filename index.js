const express = require('express')
const crypto = require('crypto')
const app = express();
const blocks = require('./blocksdata')
const fs = require('fs')


app.use(express.json())

const port =   3000



function generateSHA256HashWithPrefixZero(data) {
    let nounce = 0;
    let hash = '';
  
    while (true) {
      const hashInput = data + nounce.toString();
      hash = crypto.createHash('sha256').update(hashInput).digest('hex');
      
      if (hash.startsWith('00')) { // Change the number of zeros as per your requirement
        break;
        
      }
  
      nounce++;
    }
  
    return { nounce, hash };
  }

app.post('/addBlock', async (req, res)=>{
    const data = req.body.data;
    try{
        const newBlock ={}
    newBlock.data = req.body.data;
    newBlock.previosHash = blocks[blocks.length -1].hash; 
    newBlock.blockNo =  blocks.length+1;

    const temp = generateSHA256HashWithPrefixZero(JSON.stringify(newBlock));
    newBlock.hash = temp.hash;
    newBlock.nounce = temp.nounce;
    // console.log(blocks);
    blocks.push(newBlock);
    // console.log(newBlock);
    fs.writeFileSync('data.json', JSON.stringify(blocks, null, 2), 'utf8', (err) => {
        if (err) {
          console.error('Error writing to file:', err);
        } else {
          console.log('New entry has been added to data.json');
        }
      });

      res.send(newBlock).status(200);

    }
    catch(error){
        console.log(error, "pta kro kuo");
    }

})

app.get('/block',async (req,res)=>{
    const no = parseInt(req.query.number);
    try{
        res.send(blocks[no-1]).status(200);
    } 
    catch(e){
        console.log(e, "not found");
    }

})

app.get('/blocks/stats',async (req,res)=>{
    
    try{
        const responsed = {
            "blockCount": 2,
            "lastBlockHash": 3
             

        };
        responsed.blockCount = await blocks.length;
        responsed.lastBlockHash = await blocks[blocks.length-1].hash;
        res.send(responsed).status(200)
    } 
    catch(e){
        console.log(e, "stats not found");
    }

})





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });