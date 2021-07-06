var discord=require('discord.js');

var userMap=new Map();
module.exports.ban=function(msg){
    if(userMap.has(msg.author.id)){
        const user=userMap.get(msg.author.id);
        var msgcount=user.msgCount;
        msgcount++;
        if(parseInt(msgcount)==5){
            const role=msg.guild.roles.cache.find(r=>r.name==="Muted");
            msg.member.roles.add(role);
            msgcount++;
            user.msgCount=msgcount;
            msg.channel.send(`BANNNED DUE TO SPAMMING: ${msg.author.username}`);
        }
        else{
            user.msgCount=msgcount;
        }
    }
    else{
        userMap.set(msg.author.id,{
            msgCount:0
        });
        setTimeout(function(){
            userMap.delete(msg.author.id);
            console.log('removed');
        },5000)
    }
}