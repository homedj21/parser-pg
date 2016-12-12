var http = require('http'), request = require('request'), cheerio = require('cheerio'), iconv = require('iconv-lite');                 
var i;                                                                                                                                 
var arr=[];                                                                                                                                                                                                                                                  
var n=1;                                                                                                                               
                                                                                                                                       
for (i = 0; i <= 480; i=i+60) {                                                                                                        
request({uri:'https://play.google.com/store/apps/collection/topselling_free?start='+i, method:'GET', encoding:'binary'},               
        function (err, res, page) {                                                                                                    
        var $=cheerio.load(iconv.encode(new Buffer (page, 'binary'), 'utf8'));                                                         
        $('a.title').each(function() {                                                                                                 
                        src=$(this).attr("href");                                                                                      
                        title=$(this).attr("title");                                                                                   
                                                                                                                                       
                                                                                                                                       
arr.push('\n' + n + '. ' + title + ' - ' + 'https://play.google.com' + src);                                                      
n=n+1;                                                                                                                                 
    });                                                                                                                                
                                                                                                                                       
        });                                                                                                                            
}                                                                                                                                      
   


function Vyvod(arg) {
http.createServer(function(request, response) {                                                                                        
response.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});                                                                
response.write(arr.toString());                                                                                               
response.end();                                                                                                                        
}).listen(81)                                                                                                                          
}
Vyvod(arr);
