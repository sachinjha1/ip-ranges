const fetch = require('node-fetch');

const region= process.env.region || 'us-west-2';
const service= process.env.service || 'AMAZON';

fetch('https://ip-ranges.amazonaws.com/ip-ranges.json').then(response => {
    return response.json();
}).then(ipRangesJSON => {
    ipRangesJSON.prefixes.filter(prefix=>(prefix.service===service && prefix.region===region)).map(prefix=>{
        console.log(`- ${prefix.ip_prefix}`);
    });
});

console.log('end');