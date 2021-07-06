module.exports.mute=function(message,discord){
    let toMute=message.guild.member(message.mentions.members.first());
    let unmute=message.guild.roles.cache.find(role => role.name==='member');
    if(!toMute){
        message.reply('No such user');
    }
    if(toMute.hasPermission("MANAGE_MESSAGES")){
        message.reply('Cant mute');
        return;
    }
    let muteRole=message.guild.roles.cache.find(role => role.name === 'muted');
    if(!muteRole){
        try{
            console.log('muted role made');
            muteRole=message.guild.roles.create({
                data: {
                  name: 'muted',
                  color: 'RED',
                  permissions: []
                }
              })
              message.guild.channels.cache.forEach(async function(channel,id){
                  channel.updateOverwrite('muted',{
                      SEND_MESSAGES:false,
                      ADD_REACTIONS:false
                  })
              });
        }catch(e){
            console.log(e.stack);
        }
    }
    else{
        console.log('muted');
    }
    toMute.roles.add(muteRole);
    let embed=new discord.MessageEmbed()
    .setTitle(`${toMute.user.username} has been muted by admin`)
    .setColor(`red`)
    message.channel.send(embed);
    toMute.roles.remove(unmute);
};
module.exports.unmute=function(message,discord){
    let toUnmute=message.guild.member(message.mentions.members.first());
    let unmute=message.guild.roles.cache.find(role => role.name==='member');
    toUnmute.roles.add(unmute);
    let embed=new discord.MessageEmbed()
    .setTitle(`${toUnmute.user.username} has been unmuted by admin`)
    .setColor(`red`)
    let muteRole=message.guild.roles.cache.find(role => role.name === 'muted');
    message.channel.send(embed);
    toUnmute.roles.remove(muteRole);
}