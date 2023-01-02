const Discord = require('discord.js')
const client = new Discord.Client()

const prefix = "$"
const setting = require("./setting.json");

const Database = require('st.db')
const db = new Database('setting')
client.on("ready", () => {
  console.log(`[ - Le Bot viens de ce alummer - ]`);
  console.log(`Nom Du Bot : ${client.user.username}`);
  console.log(`Serveurs : ${client.guilds.cache.size}`);
  console.log(`Users : ${client.users.cache.size}`);
  console.log(`Channels : ${client.channels.cache.size}`);
  client.user.setActivity(`${prefix}help`, {
    type: "PLAYING"
  });
});
client.on("message", message =>{
if(message.content === prefix + "help"){
const embed = new Discord.MessageEmbed()
.setTitle("Captcha Bot")
.setColor("BLUE")
.setThumbnail(message.guild.iconURL())
.addField(`${prefix}set-role`, "Modifier le Rôle du Captcha", true)
.addField(`${prefix}set-ch`, "Modifier le channel Captcha", true)
.addField(`${prefix}verify`, "Vérifie Toi", true)
.setFooter("Developpeur:On Hamza#1828")
message.channel.send(embed)
}
})


client.on("message", message =>{
if(message.content.startsWith(prefix + "set-role")){
if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n’avez pas l’autorisation ADMINISTRATEUR")

const role = message.mentions.roles.first()
db.set("role", role.id)
const embed = new Discord.MessageEmbed()
.setTitle("J'ai bien fait le changement du rôle")
.setFooter("Developpeur:On Hamza#1828")
.setColor("GREEN")
message.channel.send(embed)
}
})

client.on("message", message =>{
if(message.content.startsWith(prefix + "set-ch")){
  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n’avez pas l’autorisation ADMINISTRATEUR")

const ch = message.mentions.channels.first()
db.set("ch", ch.id)
const embed = new Discord.MessageEmbed()
.setTitle("J'ai bien fait le changement du channel")
.setFooter("Developpeur:On Hamza#1828")
.setColor("GREEN")
message.channel.send(embed)
}
})

client.on("message", message =>{
if(message.channel.id !== `${db.fetch("ch")}`) return;
    if (message.author.bot) return;
if(message.content === prefix + "verify"){
const c = [
"https://captcha.com/images/captcha/botdetect3-captcha-meltingheat.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-meltingheat2.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-negative.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-neon.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-neon2.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-overlap.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-overlap2.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-paintmess.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-radar.jpg", 
"https://captcha.com/images/captcha/botdetect3-captcha-ripple.jpg" 
  
]
const cc = [
"JA3V8", 
"HJ9PV", 
"459CT",
"D4TSH", 
"HAPK3", 
"6H3T8", 
"YU4RT", 
"HWJRC", 
"D35UA", 
"HSD5A"  
]
  let cap = Math.floor(Math.random() * cc.length)
const embed = new Discord.MessageEmbed()
.setAuthor(message.guild.name, message.guild.iconURL())
.setColor("BLUE")
.setDescription("Écrivez les symboles dans l’image pour prendre le rôle")
.setImage(c[cap])
.setFooter("Vous avez 15 secondes | Developpeur:On Hamza#1828")
.setTimestamp()
message.channel.send(embed)
      .then(() => {
  var filter = m => m.content.includes(cc[cap]) && m.author.id == message.author.id;
  message.channel.awaitMessages(filter ,{
    max: 1,
    time: 15000,
    errors: ['time'],
  }) 
      .then((collected) =>{
      let role = message.guild.roles.cache.get(db.fetch("role"));
let member = message.member;
member.roles.add(role).catch(console.error); 
const embed = new Discord.MessageEmbed()
.setColor("GREEN")
.setTitle("✅ | J'ai bien donner le rôle")
.setFooter("Developpeur:On Hamza#1828")
message.channel.send(embed)
    })
    .catch(() => {
 const embed = new Discord.MessageEmbed()
.setColor("RED")
.setTitle("🕘 | Le temps est révolu")
.setFooter("Developpeur:On Hamza#1828")
message.channel.send(embed)
    });
}) 
}
})





client.login(setting.token).catch(() => {
  console.log("Token Invalide")
})