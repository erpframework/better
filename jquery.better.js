;(function($){

	// some private vars
	var xyz='xyz';

	$.better = function(){
		return 'better';
	}

	$.better.test = function(){
		return "better test";
	}

	$.better.defaults = {};
	$.better.plugins = {};

	// $.better = {
	// 	 id : 'Better'
	// 	,version : 0.1
	// 	,test : function(){console.log('Better test.');}
	// };

	$.fn.better = function(plugin){
		var args = [this];

		for (i=1; i<arguments.length; i++)
			args.push(arguments[i]);

		if (typeof $.better.plugins[plugin] == 'function')
			return $.better.plugins[plugin].apply(this,args);
		else
			console.log('plugin `' + plugin + '` is not defined.');
	};


})(jQuery);


;(function($){
	$.extend($.better.defaults, {
		  downloadUrl : ''
		, downloadType : 'text/plain'
		, downloadFilename : 'somefile.txt'
	});

	$.extend($.better, {
		download : function(options){
			if ( ! options)
				throw ">>> better.download: no parameters provided.";
			// if a string is passed, it is the data.
			$.isPlainObject(options) || (options.data = options);
			var  url  = options.downloadUrl || $.better.defaults.downloadUrl
				,data = options.data
				,filename = options.filename || $.better.defaults.filename || 'somefile.txt'
				, type = options.downloadType || $.better.defaults.downloadType
				;
			if ( ! url) throw(">>> better.download: no downloadUrl provided.");

			var $form = $('<form />', {
				  method : 'post'
				, action : url
				, style : 'display:hidden'
			}).append($('<input />', {
				  type : 'hidden'
				, name : 'filename'
				, value : filename
			})).append($('<input />', {
				  type : 'hidden'
				, name : 'data'
				, value : data
			})).append($('<input />', {
				  type : 'hidden'
				, name : 'type'
				, value : type
			})).appendTo('html').submit().remove();
		}

	});


	$.better.plugins.download = function (that, options) {
		return that.each(function(){
			var $table = $(this)
				, data = ''
				, csv = ''
				;
			$("th", $table).each(function(){
				csv += $(this).text() + ',';
			});
			$("tr", $table).each(function(index, tr){
				if ($(tr).css('display') == 'none')
					return;
				$("td", tr).each(function(){
					csv += $(this).text() + ',';
				});
				csv += "\n";
			});

			// console.log(csv);

			$.better.download({data: csv, type : 'text/csv', filename: options.filename});
		});
	};

	$.extend($.better.defaults, {
		panel : {
			returnPanel : true
		}
	});

	$.better.plugins.panel = function (that, options) {
		var $objects = that
			, ret = [];
		that.each(function(){
			var $container = $(this)
				, $panel = $("<div />", {class:'panel',text1:'abc'});
			$panel.appendTo($container);

			// ret.push($panel.get(0));
			ret.push($.better.defaults.panel.returnPanel ? $panel.get(0) : $container.get(0));
		});

		$objects.length = 0;
		Array.prototype.push.apply($objects,ret);

		return $objects;
	}

})(jQuery);