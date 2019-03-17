const https = require('https');

const region= process.env.region || 'us-east-1';
const service= process.env.service || 'AMAZON';

console.log(`Fetching IP ranges for Region: ${region} & Service: ${service}`);

https.get('https://ip-ranges.amazonaws.com/ip-ranges.json', function(response) {
    let body = '';
    // A chunk of data has been recieved.
    response.on('data', function(d) {
        body += d;
    });
    // The whole response has been received. Print out the result.
    response.on('end', function() {
        const ipRangesJSON = JSON.parse(body);
        ipRangesJSON.prefixes.filter(prefix=>(prefix.service===service && prefix.region===region)).map(prefix=>{
            console.log(`"${prefix.ip_prefix}",`);
        });
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
});;
