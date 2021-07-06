var discord=require('discord.js');
var randompuppy=require('random-puppy');
var token='NzU5Nzk4NTkzMDYxMTI2MTQ1.X3CvlA.JYGhasqZMiwB6-nYnzQTEWpigjg';
var client=new discord.Client();
var ban=require('./ban.js');
var mute=require('./mute.js');
client.on('message',async function(msg){
    if(msg.content==='!greet'){
        const attachment=new discord.MessageAttachment('./img/greetings.png');
        var embed=new discord.MessageEmbed()
        .setTitle(`greeting from admin`)
        .addFields({name:'Greetings',value:`${msg.author.username}`})
        .setColor(0xff0000);
        let msgEmbed=await msg.channel.send(embed);
        msgEmbed.react('😄');
        /*client.on('messageReactionAdd',function(reaction,user){
            if(reaction.emoji.name==='😄'){
                
            }
        })*/
    }
    if(msg.content==='!meme'){
        var img= await randompuppy("meme");
        const embed=new discord.MessageEmbed()
        .setTitle(`Here\'s your meme`)
        .setColor("RANDOM")
        .setImage(img);
        msg.channel.send(embed);
    }
    if(msg.content.split(' ')[0]==='!idiot'){
        var s='';
        s=s+Math.floor(Math.random()*9);
        s=s+Math.floor(Math.random()*9);
        var name=msg.content.split(' ')[1];
        msg.channel.send(name+ ` is `+s+`% idiot`);
    }
    if(msg.content==='!commands'){
        const embed=new discord.MessageEmbed()
        .setTitle('Commands are:')
        .setColor('4D2EC5')
        .addFields({name:'!greet',value:'To provide greeting'},
        {name:'!meme',value:'To give you content'},
        {name:'!reminder time(in s,m,h) msg',value:'Eg: !reminder 10s hi!'},
        {name:'!mute @someone',value:'To mute someone (only admin)'}
        )
        .setAuthor('MyBot')
        msg.channel.send(embed);
    }
    if(msg.content.split(' ')[0]==='!mute'){
        if(msg.member.hasPermission('ADMINISTRATOR')){
        mute.mute(msg,discord);
    }
    }
    if(msg.content.split(' ')[0]==='!unmute'){
        if(msg.member.hasPermission('ADMINISTRATOR')){
        mute.unmute(msg,discord);
    }
    }
    if(msg.content.startsWith('!reminder')){
        let args=msg.content.split(' ');
        if(!args[1]){
            let embed=new discord.MessageEmbed()
            .setTitle(`No time Specified`)
            .setColor('red')
            .setTimestamp(Date.now())
            msg.channel.send(embed);
            return;
        }
        if(!args[2]){
            let embed=new discord.MessageEmbed()
            .setTitle(`No msg Specified`)
            .setColor('red')
            .setTimestamp(Date.now())
            msg.channel.send(embed);
            return;
        }
        let embed=new discord.MessageEmbed()
        .setTitle(`Reminder set ${msg.author.username}`)
        .setDescription(`remind after ${args[1]}`)
        .setColor('red')
        .setTimestamp(Date.now())
        msg.channel.send(embed);
        var timeMeasure=args[1].substring(args[1].length-1,args[1].length);
        let rt =args[1].substring(0,args[1].length-1);
        let msgR=args[2];
        switch(timeMeasure){
            case 's':rt=rt*1000;
            break;
            case 'm':rt=rt*60*1000;
            break;
            case 'h':rt=rt*60**60*1000;
            break;
        }
        client.setTimeout(async function(){
            let remembed=new discord.MessageEmbed()
            .setTitle(`Reminder for ${msg.author.username}`)
            .setDescription(`Message: ${args[2]}`)
            .setColor('red')
            .setTimestamp(Date.now())
            let msgembed=await msg.channel.send(remembed);
            msgembed.react('⏰');
        },rt);
    }
})

client.on('ready',function (){
    console.log('ONLINE');
})
client.login(token);