const fs = require('fs')




if(process.argv[2]==='list' ){
    fs.readFile('./list.json', 'utf8', function (erreur, data)
    {
        if (erreur)
        throw erreur; 
        var monJson = JSON.parse(data);
        console.log(monJson)
    });
}




else if(process.argv[2]==='add' && (process.argv[3]==='-t' || process.argv[3]==='--title')  && (process.argv[5]==='-b' || process.argv[5]==='-body')   && process.argv.length ===7) {

    const newtitle=process.argv[4],newbody=process.argv[6];
    var newnote = [{
        title:newtitle,
        body:newbody
    }]
    fs.readFile('./list.json', 'utf8', function (erreur, data){
        if(erreur)
        throw erreur;
        var monJson = JSON.parse(data).concat(newnote) 

        fs.writeFile('./list.json', JSON.stringify(monJson), function (err) {
            if (err) return console.log(err);
          });
    });   
}



 else if(process.argv[2]==='remove' && (process.argv[3]==='-t' || process.argv[3]==='--title') && process.argv.length ===5){

        const rmvtitle=process.argv[4];
        fs.readFile('./list.json', 'utf8', function (erreur, data){
            if(erreur)
            throw erreur;
            var monJson = JSON.parse(data)
            var newlist = monJson.filter(el=> el.title!==rmvtitle)
            fs.writeFile('./list.json', JSON.stringify(newlist), function (err) {
                if (err) return console.log(err);
              });

        })

}

else if(process.argv[2]==='read' && (process.argv[3]==='-t' || process.argv[3]==='--title') && process.argv.length ===5){

    const readtitle=process.argv[4];
    fs.readFile('./list.json', 'utf8', function (erreur, data){
        if(erreur)
        throw erreur;
        var monJson = JSON.parse(data)
        var newlist = monJson.filter(el=> el.title===readtitle)
       console.log(newlist)

    })

}

else if(process.argv.length < 3) {
    console.log('Options: \n'+
    '--help, -h       Show help\n'+
    '--title, -t  Title of note\n'+
    '--body, -b   Body of note\n'
    )
}

else {
    console.log('\n\n---------FOR ADDING NEW LIST :\n'+
    'node Note-app.js add -t newtiltle -b newbody\n'+ 
     'or\n'+
     'node Note-app.js add --tille newtitle --body newbody\n\n\n'+
    '---------FOR LIST ALL NOTE\n'+
    'node Note-app.js list\n\n\n'+
    '---------FOR ROMOVE A NOTE\n'+
    'node Note-app.js remove --tille title\n'+
    'or\n'+
    'node Note-app.js remove -t title\n\n\n'+
    '---------FOR READ A SPECIFIC NOTE\n'+
    'node Note-app.js read --tille title\n'+
    'or\n'+
    'node Note-app.js read -t title\n\n\n')

}