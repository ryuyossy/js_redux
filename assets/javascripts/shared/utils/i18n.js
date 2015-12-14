export resStore = {
  "kh": {
      "locale": {
          "language": "Khmer"
      },
      "resource": {
          "loading": "Loading...",
          "cd643ef3": "Loading...", // crc32
          "8524de963f07201e5c086830d370797f": "Loading...", // md5
          "b04ba49f848624bb97ab094a2631d2ad74913498": "Loading...", // sha1
          "0854d41ab62928cdcbff1006a3d5953c45de0ddb": "YouTube has more than one billion users each month."
      }
  },
    "en": {
        "locale": {
            "language": "English"
        },
        "resource": {
            "loading": "Loading...",
            "cd643ef3": "Loading...", // crc32
            "8524de963f07201e5c086830d370797f": "Loading...", // md5
            "b04ba49f848624bb97ab094a2631d2ad74913498": "Loading...", // sha1
            "0854d41ab62928cdcbff1006a3d5953c45de0ddb": "YouTube has more than one billion users each month."
        }
    },
    "de": {
        "locale": {
            "language": "Deutsch"
        },
        "resource": {
            "loading": "Wird geladen...",
            "b04ba49f848624bb97ab094a2631d2ad74913498": "Wird geladen..."
        }
    },
    "es": {
        "locale": {
            "language": "Español"
        },
        "resource": {
            "loading": "Cargando...",
            "b04ba49f848624bb97ab094a2631d2ad74913498": "Cargando..."
        }
    },
    "fr": {
        "locale": {
            "language": "Français"
        },
        "resource": {
            "loading": "Chargement...",
            "b04ba49f848624bb97ab094a2631d2ad74913498": "Chargement..."
        }
    },
    "it": {
        "locale": {
            "language": "Italiano"
        },
        "resource": {
            "loading": "Caricamento in corso...",
            "b04ba49f848624bb97ab094a2631d2ad74913498": "Caricamento in corso..."
        }
    },
    "ja": {
        "locale": {
            "language": "日本語"
        },
        "resource": {
            "loading": "ロード中...",
            "b04ba49f848624bb97ab094a2631d2ad74913498": "ロード中..."
        }
    },
    "zh-cn": {
        "locale": {
            "language": "中文 (简体)"
        },
        "resource": {
            "loading": "加载中...",
            "b04ba49f848624bb97ab094a2631d2ad74913498": "加载中...",
            "0854d41ab62928cdcbff1006a3d5953c45de0ddb": "YouTube每个月有超过十亿个用户。"
        }
    },
    "zh-tw": {
        "locale": {
            "language": "中文 (繁體)"
        },
        "resource": {
            "loading": "載入中...",
            "b04ba49f848624bb97ab094a2631d2ad74913498": "載入中...",
            "0854d41ab62928cdcbff1006a3d5953c45de0ddb": "YouTube每個月有超過十億個用戶。"
        }
    }
};

var options = {
    lng: 'en',
    load: 'current',
    lowerCaseLng: true,
    fallbackLng: false,
    resGetPath: 'i18n/__lng__/__ns__.json',
    customLoad: function(lng, ns, options, loadComplete) {
        var data = resStore[lng][ns];
        loadComplete(null, data);
    },
    ns: {
        namespaces: ['resource', 'locale'],
        defaultNs: 'resource'
    }
};

i18n.init(options, function(t) {

    // You can omit this step if using default options
    i18nText.init({
        'debug': false,
        'hash': 'sha1' // crc32|md5|sha1
    });

    // Extends i18n object to provide a new _() method
    i18n._ = i18nText._;

    (function() { // loading
        var $el = $('#loading');
        var lngs = ['en','de','es','fr','it','ja','zh-cn','zh-tw'];
        lngs.forEach(function(lng) {
            var str1 = i18n.t('locale:language', {lng: lng})
            $el.find('.cols.' + lng + ' .col-1').text(str1);

            var str2 = i18n._('Loading...', {lng: lng});
            $el.find('.cols.' + lng + ' .col-2').text(str2);
        });
    }());

    //
    // https://github.com/cheton/i18next-text/tree/dev#locates-missing-translation
    //
    (function() { // locate-missing-translations
        var $el = $('#locate-missing-translations');
        var lngs = ['en','de','es','fr','it','ja','zh-cn','zh-tw'];
        lngs.forEach(function(lng) {
            var str1 = i18n.t('locale:language', {lng: lng})
            $el.find('.cols.' + lng + ' .col-1').text(str1);

            var strNotTranslated = '<span class="highlight-error">STRING_NOT_TRANSLATED</span>';
            var str2 = i18n._('YouTube has more than one billion users each month.', {
                lng: lng,
                defaultValue: strNotTranslated
            });
            $el.find('.cols.' + lng + ' .col-2').html(str2);
        });
    }());

    //
    // https://github.com/cheton/i18next-text/tree/dev#handlebars-i18n-helper
    //
    (function() { // handlebars-i18n-helper
        var $el = $('#handlebars-i18n-helper');

        i18n.setLng('en');

        // Registers the Handlebars i18n helper
        Handlebars.registerHelper('i18n', i18nText.handlebarsHelper);

        var source = [
            '{{i18n "Basic Example"}}',
            '{{i18n "__first-name__ __last-name__" first-name=firstname last-name=lastname}}',
            '{{i18n "English" defaultKey="locale:language.en-US"}}',
            '{{i18n defaultKey="loading"}}',
            '{{#i18n}}Some text{{/i18n}}',
            '{{#i18n this}}Description: {{description}}{{/i18n}}',
            '{{#i18n this last-name=lastname}}{{firstname}} __last-name__{{/i18n}}',
            ''
        ].join('\n');
        var template = Handlebars.compile(source);
        var context = {
            'firstname': 'Foo',
            'lastname': 'Bar',
            'description': 'Foo Bar Test'
        };
        var html = template(context).replace(/\n/g, "<br/>");
        $el.find('.example').html(html);
    }());
});
