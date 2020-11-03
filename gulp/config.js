var util = require('gulp-util');

var production = util.env.production || util.env.prod || false;
var destPath = 'build';

var config = {
    env       : 'development',
    production: production,

    src: {
        root         : 'src',
        templates    : 'src/templates',
        templatesData: 'src/templates/data',
        pagelist     : 'src/index.yaml',
        sass         : 'src/sass',
        // path for sass files that will be generated automatically via some of tasks
        sassGen      : 'src/sass/generated',
        img          : 'src/img',
        svg          : 'src/img/svg',
        icons        : 'src/icons',
		    favicons     : 'src/icons/favicons',
        // path to png sources for sprite:png task
        iconsPng     : 'src/icons',
        // path to svg sources for sprite:svg task
        iconsSvg     : 'src/icons',
        // path to svg sources for iconfont task
        iconsFont    : 'src/icons',
        fonts        : 'src/fonts',
        lib          : 'src/lib',
		    js           : 'src/js',
        jsAll        : [
                        './node_modules/jquery/dist/jquery.min.js',
                        './node_modules/lazysizes/lazysizes.min.js',
                        './node_modules/swiper/swiper-bundle.min.js',
                        './node_modules/pinch-zoom-js/dist/pinch-zoom.umd.min.js',
            			'src/js/jquery.ellipsis.min.js',
            			'src/js/app.js'
		]
    },
    dest: {
        root : destPath,
        html : destPath,
        css  : destPath + '/css',
        js   : destPath + '/js',
        img  : destPath + '/img',
		favicons  : destPath + '/img/favicons',
        fonts: destPath + '/fonts',
        lib  : destPath + '/lib'
    },

    setEnv: function(env) {
        if (typeof env !== 'string') return;
        this.env = env;
        this.production = env === 'production';
        process.env.NODE_ENV = env;
    },

    logEnv: function() {
        util.log(
            'Environment:',
            util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
        );
    },

    errorHandler: require('./util/handle-errors')
};

config.setEnv(production ? 'production' : 'development');

module.exports = config;
