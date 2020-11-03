#How to use

Clone this repo and then in command line type:

* `npm install` or `yarn` - install all dependencies
* `gulp` - run dev-server and let magic happen, or
* `gulp build` - build project from sources

--

## List of Gulp tasks

To run separate task type in command line `gulp [task_name]`.
Almost all tasks also have watch mode - `gulp [task_name]:watch`, but you don't need to use it directly.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`build:dev`        | build dev version of project (without code optimizations)
`build`            | build production-ready project (with code optimizations)

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`sass` 	         | compile .sass/.scss to .css. We also use [postcss](https://github.com/postcss/postcss) for [autoprefixer](https://github.com/postcss/autoprefixer) and [Lost](https://github.com/peterramsing/lost), so feel free to include other awesome postcss [plugins](https://github.com/postcss/postcss#plugins) when needed
`copy`             | copy common files from `./src` path to `./build` path
`nunjucks`         | compile Mozilla's awesome [nunjucks](https://mozilla.github.io/nunjucks/) templates
`sprite:svg`       | create svg symbol sprites ([css-tricks](https://css-tricks.com/svg-sprites-use-better-icon-fonts/))
`sprite:png`       | create png sprites
`server`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean`            | remove `./build` folder
`list-pages`       | create index file with links to all project pages


## SVG icons (SVG-sprite)

Source folder: `src/icons/` 

Build: `build/img/sprite.svg`

From the SVG-files of the `src/icons/` folder to the `build/img/` folder, sprite file will be generated.
To create new SVG-icon, you need to:
* put SVG picture in the folder `src/icons/`
* start the sprite generation process with `gulp` or `npm start`
* in html insert - `<svg width="22" height="22"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="img/sprite.svg#icon-logo"></use></svg>`, where `logo` - name of the picture.
You can set the size of the svg directly in the tag, or through CSS.

## PNG icons (PNG-sprite)

Source folder: `src/icons/`
Build: `build/img/sprite.png`, `build/img/sprite@2x.png` - retina sprite

From the PNG-files of the `src/icons/` folder to the `build/img/` folder, sprite files will be generated, including the sprite for retina displays `sprite.png` and `sprite@2x.png`. 
To create new PNG-icon, you need to:
* put two pictures in the folder `src/icons/` - `brand.png` for default screen and `brand@2x.png` for retina. If the size of `brand@2x.png` is `64x100px` then the size of the `brand.png` sholud be `32x50px`. It is impossible that the width or height of the retina-picture was equal to an odd number of pixels. For example, if the size of the retina picture `brand@2x.png` is `64x101px`, then you need to increase it to `64x102px`.
* start the sprite generation process with `gulp` or `npm start`
* include your PNG-icon in HTML - `<i class="icon icon_brand"></i>`, where `brand` - name of the picture.