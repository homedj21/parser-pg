request = require('request'), cheerio = require('cheerio'), iconv = require('iconv-lite');

function  Sbor(){
var i;
var array=[];
var num=1;
for (i = 0; i <= 480; i=i+60) {
request ({
           uri:'https://play.google.com/store/apps/collection/topselling_free?start='+i,
           method:'GET',
           encoding:'binary'
                             },
             function (err, res, page) {
             var $=cheerio.load(iconv.encode(new Buffer (page, 'binary'), 'utf8'));
             $('a.title').each(function() {
                        link=$(this).attr("href");
                        title=$(this).attr("title");
                        array.push( '\n' +  num + '. ' + title + ' - ' + 'https://play.google.com' + link  );
                        num=num+1;
                 });

          });

    }

return array;

}


function Vyvod() {

var http = require('http');
var list = Sbor();
http.createServer(function(request, response) {
response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
response.write(list.toString());
response.end();
}).listen(81)
}

var vyvod = new Vyvod();
