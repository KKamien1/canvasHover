helper.text = {
	splitIntoWords: function($el) {
		
		console.log('splitText');
		
		/* only once */
		if ($el.hasClass('state-word-splitted'))
			return; 
		
		$el.addClass('state-word-splitted');
		
		var html = $el.html();
		html = html.replace('<br />','<br>');
		html = html.replace('&nbsp;',' ');
		
		
		console.log(words);
		
		// explode on br tags to rewrap
		
		var lines = html.split('<br>');
		
		for(var i = 0; i < lines.length; i++ ) {
			lines[i] = lines[i].trim();
			var words = lines[i].split(' ');
			
			if (words.length)
				lines[i] = '<div class="word"><div class="word-inner">'+words.join('</div></div> <div class="word"><div class="word-inner">')+'</div></div>';
		}
		
		html = lines.join('<br>');
		$el.html(html);
		
		var line = 1;
		
		var offset = $el.find('.word').eq(0).position().top;
		
		$el.find('.word').each(function() {
			
			if ($(this).position().top != offset) {
				line++;
				offset = $(this).position().top;
			}
			
			$(this).addClass('line'+line);
		});
		
		// rewrap
	},
	
	splitIntoWordsForLineSplit: function($el) {
		
		console.log('splitText');
		
		if ($el.hasClass('state-word-splitted'))
			return; 
		
		$el.addClass('state-word-splitted');
		
		var html = $el.html();
		html = html.replace('<br />','<br>');
		
		console.log(words);
		
		// explode on br tags to rewrap
		
		var lines = html.split('<br>');
		
		for(var i = 0; i < lines.length; i++ ) {
			lines[i] = lines[i].trim();
			var words = lines[i].split(' ');
			
			if (words.length)
				lines[i] = '<span class="word">'+words.join('&nbsp;</span><span class="word">')+'</span>';
		}
		
		html = lines.join('<br>');
		$el.html(html);
		
		var line = 1;
		
		var offset = $el.find('span.word').eq(0).position().top;
		
		$el.find('span.word').each(function() {
			
			if ($(this).position().top != offset) {
				line++;
				offset = $(this).position().top;
			}
			
			$(this).addClass('line'+line);
		});
		
		// rewrap
	},
	 
	

	splitIntoLines: function($el,rewrap_words) {
		
		if ($el.hasClass('state-line-splitted'))
			return; 
		
		if (typeof rewrap_words == "undefined")
			rewrap_words = false;
		
		$el.addClass('state-line-splitted');
		
		var $lines = $();
		helper.text.splitIntoWordsForLineSplit($el);
		
		var line = 1;
		
		while ($el.find('.line'+line).length) {
			
			console.log('line '+line);
			
			var $line = $('<div class="splitted-line-container splitted-line-container-line'+line+'" />')
			
			$line.append($el.find('.line'+line));
			$el.append($line);
			
			line++;	
		}
		
		$el.find('br').remove();
		
		if (rewrap_words) {
			//alert("rewrap_words");
				
			$el.find('.splitted-line-container').each(function() {
				var $words = $(this).find('.word');
				var text = "";
				
				$words.each(function() {
					var word = $(this).text();
					
					text += word;
				});
				
				console.log(text);
				text.replace('&nbsp;',' ');
				
				console.log('text',text);
				$(this).html(text);
			});
		}
	},
	
	prepareLineAnimation: function($el) {
		$el.find('.splitted-line-container').each(function() {
			
			var $line = $(this);
			
			if ($line.hasClass('state-line-animation-prepared'))
				return;
			
			$line.addClass('state-line-animation-prepared');
			
			var innerHtml = $line.html();
			$line.html('');
			
			var $first = $('<div class="splitted-line-container-inner splitted-line-container-inner-first" />');
			var $second = $('<div class="splitted-line-container-inner splitted-line-container-inner-second" />');
			
			$first.html('<div class="splitted-line-container-inner-text">'+innerHtml+'</div>');
			$second.html('<div class="splitted-line-container-inner-text">'+innerHtml+'</div>');
			
			
			$line.append($first);
			$line.append($second);
			
			$line.find('.splitted-line-container-inner-text').width($line.parent().width());
		});
	},
	
	splitIntoLetters: function($el) {
		$el.each(function() {
			if ($(this).hasClass('state-letter-splitted'))
				return;
			
			$(this).addClass('state-letter-splitted');
			
			var ret = '';
			var str = $(this).html();
			
			str = str.replace('<br />','|');
			str = str.replace('<br>','|');
			
			var i = 0;
			while (i < str.length) {
				if (str[i] != "|")
					ret += '<span class="letter">'+str[i]+'</span>';
				else 
					ret += '<br />';
				
				i++;
			}
			
			//str = str.replace('<span class="letter">|</span>','<br>');
			
			$(this).html(ret);
		});
		
	},
}