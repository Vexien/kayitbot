const dc = require("discord.js");
const db = require("quick.db");

exports.run = async (client, message, args) => {
  if (
    !["805588624615145473"].some(role =>
      message.member.roles.cache.get(role)
    ) &&
    !message.member.hasPermission("ADMINISTRATOR")
  )
    return message.reply(`Bu Komutu Kullanabilmek İçin Yetkin Bulunmuyor.`);

  const kayıtlı = message.guild.roles.cache.find(
    r => r.id === "805587543037837342"
  );
  const kayıtlı2 = message.guild.roles.cache.find(
    r => r.id === "811647351248650341"
  );
  const kayıtsız = message.guild.roles.cache.find(
    r => r.id === "805588342070181898"
  );
  

  const member = message.guild.member(
    message.mentions.members.first() || message.guild.members.cache.get(args[0])
  );
  if (!member) return message.channel.send("Bir Kullanıcı Belirt.");
  if (!member.roles.highest.position >= message.member.roles.highest.position)
    return message.channel.send(
      "Etiketlenen kullanıcı ile Üst/Aynı pozisyonda bulunuyorsunuz."
    );
  const x = message.guild.member(member);
  let bilgi = db.get(`yetkili.${member.id}`);

  db.add(`yetkili.${message.author.id}.erkek`, 1);
  db.add(`yetkili.${message.author.id}.toplam`, 1);
  let toplami = db.fetch(`yetkili.${message.author.id}.toplam`);

  let tag = "ᴰᴱᴱᴾ";
  let isim = args[1];
  let yas = args[2];
  if (!isim) return message.channel.send(`Bir İsim Belirt.`);
  if (!yas) return message.channel.send(`Bir Yaş Belirt.`);

  x.setNickname(`${tag}${isim} | ${yas}`);
  x.roles.add(kayıtlı);
  x.roles.add(kayıtlı2);
  x.roles.remove(kayıtsız);

 
   

  let levi_tamisim = tag + isim + yas;
  db.push(
    `isimler_${member.id}`,
    `${levi_tamisim} [**<@&805587543037837342>**]`
  );

  let isimgecmisi = db.get(`isimler_${member.id}`);
  let liste = "";
  var sayı = 0;
  if (isimgecmisi) {
    sayı = isimgecmisi.lenght;
    for (let i = 0; i < isimgecmisi.length; i++) {
      liste += `\n\`${i + 1}.\` ${isimgecmisi[i]}`;
    }
  } else {
    liste = `\nBu Kullanıcının Geçmiş Adı Bulunmuyor.`;
  }

  const embed = new dc.MessageEmbed()
    .setDescription(
      `
<:eboy:811649904899915837> • ${member} Adlı Kullanıcı <@${message.author.id}> Tarafından Kayıt Edildi.
<:eboy:811649904899915837> • Kullanıcının Adı \`${tag} ${isim} | ${yas}\` Olarak Güncellendi 
<:eboy:811649904899915837> • ${kayıtlı} ${kayıtlı2} Rolü Verildi
`
    )
    .setColor("BLUE")
    .setFooter(`Toplam Kayıt ${toplami} Sayısına Ulaştın`);
  message.channel.send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["erkek", "e", "man", "boy"],
  permLevel: 0
};

exports.help = {
  name: "erkek"
};
