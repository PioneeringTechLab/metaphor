var elixir = require('laravel-elixir');
var scssLint = require('laravel-elixir-scss-lint');

// Set Base Paths
var basePath = {
  bower: './bower_components',
  styles: {
    src: './src/sass',
    dist: './dist/css'
  },
  scripts: {
    src: './src/js',
    dist: './dist/js'
  },
  fonts: './dist/fonts'
};


elixir(function(mix) {
  mix.scripts([
    'scripts.js',
  ], basePath.scripts.dist + '/metaphor.js', basePath.scripts.src );

  mix.sass('metaphor.scss', basePath.styles.dist, basePath.styles.src);

  mix.scssLint();
});
