const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development', entry: "./src/main.ts", output: {
        path: path.resolve(__dirname, "dist"), filename: '[name].js'
    }, module: {
        rules: [{
            test: /\.tsx?$/, loader: "ts-loader",
        }]
    }, resolve: {
        extensions: ['.ts', '.js', '.cjs', '.json'] //配置文件引入时省略后缀名
    }, plugins: [new HtmlWebpackPlugin({
        title: "苟福贵勿相忘",
        template: path.resolve(__dirname, "public/index.html"),
    })]
}
