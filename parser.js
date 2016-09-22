//Подключаем модули
var request = require('request'), cheerio = require('cheerio'), iconv = require('iconv-lite'), mysql = require('mysql');
//Параметры подключения к базе данных
var client = mysql.createConnection({
user: 'root',
password: 'root',
database: 'db'
});
//Очищаем таблицу
client.query('TRUNCATE TABLE apps');
//Загружаем страницу
var i;
for (i = 0; i <= 480; i=i+60) {
request({uri:'https://play.google.com/store/apps/collection/topselling_free?start='+i, method:'GET', encoding:'binary'},
        function (err, res, page) {
//Передаём страницу cheerio
        var $=cheerio.load(iconv.encode(new Buffer (page, 'binary'), 'utf8'));
//Находим нужные CSS-селекторы
        $('a.title').each(function() {
			src=$(this).attr("href");
			title=$(this).attr("title");
//Вывод в консоль
        console.log(title + ' - ' + 'https://play.google.com' + src);
        var srcnew='https://play.google.com' + src;
//Вставляем данные в базу
client.query('INSERT INTO `apps` (`title`, `src`) VALUES (?, ?)', [title, srcnew]);

    });
	
	});
}