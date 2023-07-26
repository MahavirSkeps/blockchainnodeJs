// const crypto = require('crypto')
const fs = require('fs');
let blocks = [] ;
async function getfile() {

}
blocks =  fs.readFileSync('data.json', 'utf8')
blocks = JSON.parse(blocks);
// console.log(blocks[3]);
// // console.log(blocks); 
// console.log(Array.isArray(blocks));
// console.log(blocks[blocks.length -1].hash);
module.exports =  blocks;



// function generateSHA256HashWithPrefixZero(data) {
//   let nounce = 0;
//   let hash = '';

//   while (true) {
//     const hashInput = data + nounce.toString();
//     hash = crypto.createHash('sha256').update(hashInput).digest('hex');
    
//     if (hash.startsWith('00')) { // Change the number of zeros as per your requirement
//       break;
      
//     }

//     nounce++;
//   }

//   return { nounce, hash };
// }

// console.log(generateSHA256HashWithPrefixZero("abcd"));
// console.log(generateSHA256HashWithPrefixZero("abcdyfhfhj"));
