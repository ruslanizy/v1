require("./setting")
require("./basexd/lib/apikeys")
const { default: makeWASocket, DisconnectReason, downloadContentFromMessage, useSingleFileAuthState, jidDecode, areJidsSameUser, makeInMemoryStore } = require("@adiwajshing/baileys")
const { state } = useSingleFileAuthState("./connect/session.json")
const PhoneNumber = require("awesome-phonenumber")
const fs = require("fs")
const pino = require("pino")
const FileType = require("file-type")
const figlet = require("figlet")
const moment = require("moment-timezone")
const { Boom } = require("@hapi/boom")
const { smsg } = require("./basexd/lib/myfunc")
const chalk = require("chalk")
const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) }
const { imageToWebp, videoToWebp, writeExifImg, writeExifVid } = require("./basexd/lib/exif")
const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

async function startXd() {
const xd = makeWASocket({
logger: pino({ level: 'silent' }),
printQRInTerminal: true,
browser: ['RusBot','Safari','1.0.0'],
auth: state,
})

console.log(color(figlet.textSync(`Rus Bot`, {
font: 'Standard',
horizontalLayout: 'default',
vertivalLayout: 'default',
whitespaceBreak: false
}), 'cyan'))
console.log(color(`\nINFO`, `yellow`))
console.log(color(`».Versi Bot : 1.0.0\n».Nama Bot : RusBot\n».Pemilik Bot : Ruslan`, `cyan`))
console.log(color(`\nTHANKS TO`, `yellow`))
console.log(color(`».Kirbotz ( Base Bot )\n».Dan Creator Bot Lainnya\n`, `cyan`))

store.bind(xd.ev)

xd.ev.on("messages.upsert", async chatUpdate => {
try {
m = chatUpdate.messages[0]
if (!m.message) return
m.message = (Object.keys(m.message)[0] === 'ephemeralMessage') ? m.message.ephemeralMessage.message : m.message
if (!xd.public && !m.key.fromMe && chatUpdate.type === 'notify') return
if (m.key.id.startsWith('BAE5') && m.key.id.length === 16) return
m = smsg(xd, m, store)
require('./rusxzy')(xd, m, chatUpdate, store)
} catch (err) {
console.log(err)}})

xd.ev.on("connection.update", (update) => {
const { connection, lastDisconnect } = update
if (connection === 'close') { lastDisconnect.error?.output?.statusCode !== DisconnectReason.loggedOut ? startXd() : ''}
else if (connection === 'open') {
console.log(update)}})

xd.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
let decode = jidDecode(jid) || {}
return decode.user && decode.server && decode.user + '@' + decode.server || jid
} else return jid
}

xd.ev.on("contacts.update", update => {
for (let contact of update) {
let id = xd.decodeJid(contact.id)
if (store && store.contacts) store.contacts[id] = { id, name: contact.notify }
}
})

xd.ev.on('group-participants.update', async (anu) => {
try {
let metadata = await xd.groupMetadata(anu.id)
let participants = anu.participants
for (let num of participants) {
try {
ppuser = await xd.profilePictureUrl(num, 'image')
} catch (err) {
ppuser = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60'
}
try {
ppgroup = await xd.profilePictureUrl(anu.id, 'image')
} catch (err) {
ppgroup = 'https://i.ibb.co/RBx5SQC/avatar-group-large-v2.png?q=60'
}
//welcome\\
memb = metadata.participants.length
xdWlcm = await getBuffer(ppuser)
xdLft = await getBuffer(ppuser)
if (anu.action == 'add') {
const xdbuffer = await getBuffer(ppuser)
let xdName = num
const xtime = moment.tz('Asia/Jakarta').format('HH:mm:ss')
const xdate = moment.tz('Asia/Jakarta').format('DD/MM/YYYY')
const xmembers = metadata.participants.length
xdbody = `━━❪ 𝗪𝗲𝗹𝗰𝗼𝗺𝗲 👋 ❫━━
».@${xdName.split("@")[0]}
».𝗪𝗲𝗹𝗰𝗼𝗺𝗲 𝘁𝗼 
».${metadata.subject}
».𝗠𝗲𝗺𝗯𝗲𝗿 : 
».${xmembers}th
».𝗝𝗼𝗶𝗻𝗲𝗱 : 
».${xtime} ${xdate}
`
xd.sendMessage(anu.id,
 { text: xdbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botNama}`,
"body": `${ownerNama}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": thumb,
"sourceUrl": `https://chat.whatsapp.com/F9rqZDCJVtY1uEKVODAVGl`}}})
} else if (anu.action == 'remove') {
const xdbuffer = await getBuffer(ppuser)
const xdtime = moment.tz('Asia/Kolkata').format('HH:mm:ss')
const xddate = moment.tz('Asia/Kolkata').format('DD/MM/YYYY')
let xdName = num
const xdmembers = metadata.participants.length
xdbody = `━━❪ 𝗚𝗼𝗼𝗱𝗯𝘆𝗲 👋 ❫━━
».@${xdName.split("@")[0]}
».𝗟𝗲𝗳𝘁 
».${metadata.subject}
».𝗠𝗲𝗺𝗯𝗲𝗿 : 
».${xdmembers}th
».𝗧𝗶𝗺𝗲 : 
».${xdtime} ${xddate}
`
xd.sendMessage(anu.id,
 { text: xdbody,
 contextInfo:{
 mentionedJid:[num],
 "externalAdReply": {"showAdAttribution": true,
 "containsAutoReply": true,
 "title": ` ${global.botNama}`,
"body": `${ownerNama}`,
 "previewType": "PHOTO",
"thumbnailUrl": ``,
"thumbnail": thumb,
"sourceUrl": `https://chat.whatsapp.com/F9rqZDCJVtY1uEKVODAVGl`}}})
}}
} catch (err) {
console.log(err)
}})

xd.getName = (jid, withoutContact  = false) => {
id = xd.decodeJid(jid)
withoutContact = xd.withoutContact || withoutContact 
let v
if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
v = store.contacts[id] || {}
if (!(v.name || v.subject)) v = xd.groupMetadata(id) || {}
resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
})
else v = id === '0@s.whatsapp.net' ? {
id,
name: 'WhatsApp'
} : id === xd.decodeJid(xd.user.id) ?
xd.user :
(store.contacts[id] || {})
return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
}

xd.public = true

xd.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
let quoted = message.m ? message.m : message
let mime = (message.m || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(quoted, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
let type = await FileType.fromBuffer(buffer)
trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
await fs.writeFileSync(trueFileName, buffer)
return trueFileName
}

xd.downloadMediaMessage = async (message) => {
let mime = (message.m || message).mimetype || ''
let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
const stream = await downloadContentFromMessage(message, messageType)
let buffer = Buffer.from([])
for await(const chunk of stream) {
buffer = Buffer.concat([buffer, chunk])
}
return buffer
}

const { getImg, getBuffer } = require("./basexd/lib/functions")

xd.sendImage = async (jid, path, caption = '', quoted = '', options) => {
let buffer = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
return await xd.sendMessage(jid, { image: buffer, caption: caption, ...options }, { quoted })}

xd.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getImg(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifImg(buff, options)
} else {
buffer = await imageToWebp(buff)
}
await xd.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

xd.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
let buffer
if (options && (options.packname || options.author)) {
buffer = await writeExifVid(buff, options)
} else {
buffer = await videoToWebp(buff)
}

await xd.sendMessage(jid, { sticker: { url: buffer }, ...options }, { quoted })
return buffer
}

xd.sendContact = async (jid, kon, quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: await xd.getName(i + '@s.whatsapp.net'),
vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await xd.getName(i + '@s.whatsapp.net')}\nFN:${await xd.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nEND:VCARD`
})
}
xd.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}

return xd
}

startXd()

require("http").createServer((_, res) => res.end("Uptime!")).listen(8080)