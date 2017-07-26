module.exports = {
    entry: "./app/client.js",
    output: {
        path: __dirname + '/www/html/js',
        filename: "index.js"
    },
    module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',

            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
};
