import { Message, MessageEmbed } from 'discord.js'
import axios from '../../utils/connection'

export default {
  callback : async(message : Message , ...args : string[]) => 
  {
    if(args.length === 0) 
    {
      return message.reply({
        content : `\`z!dep (amount || all)\``,
      })
    }

    const amountToDep = args[0]

    const { id : userId } = message.author

    const embed = new MessageEmbed({
      author : 
      {
        iconURL : message.author.displayAvatarURL({ dynamic : true }),
        name : message.author.username
      },
      color: "RANDOM"
    }).setTimestamp()

    await axios({
      url : `/user/update/dep/${userId}`,
      method : "PUT",
      data : 
      {
        amount : amountToDep
      }
    }).then(res => {
      if(res.status === 200)
      {
        console.log(res.data.amountToDep);
        embed.setDescription(`Deposited`)
      }
      return
    }).catch(err => {
      console.error(err);
      embed.setDescription(`Ha ocurrido un error al depositar.`)
    })


    return message.reply({
      embeds : [ embed ]
    })
  }, 
  cooldown : 1
}