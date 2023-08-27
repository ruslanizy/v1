const chalk = require("chalk")
const fs = require("fs")

global.apikeyai = "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"

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyanBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})