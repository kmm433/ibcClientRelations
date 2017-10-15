module.exports = {
    entry: {
      homepage: "./app/client.js",
      signup: "./signup-app/app.js"
    },
    output: {
        path: __dirname + '/www/html/js',
        filename: "[name].index.js"
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
        }, { test: /\.css$/, use: ["style-loader", "css-loader"] },
        {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' }
      ]
   }
};
