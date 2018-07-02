const path = require("path");

module.exports = function(env, options) {
    const isProduction = options.mode === "production";

    const config = {
        context: path.join(__dirname, "src"),
        entry: './client/index',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'public/js')
        },
        mode: isProduction ? "production" : "development",
        devtool: isProduction ? "none" : "source-map",

        resolve: {
            extensions: [".js", ".jsx"]
        },

        watch: isProduction ? false : true,

        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                },
                {
                    test: /\.css$/,
                    loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
                }
            ]
        },

        devServer: {
            contentBase: "./public"
        }
    };

    return config;
};
