module.exports = {
    presets: [
        ["@babel/preset-env", {
            modules: false,
            targets: {
                node: 'current',
                browsers: ["last 2 versions", "safari >= 7", "IE >= 11"]
            }
        }]
    ],
    plugins: [
        // "@babel/plugin-syntax-dynamic-import",
        '@babel/plugin-transform-runtime',
        ['@babel/plugin-proposal-class-properties', { "loose": false }],
        ["@babel/plugin-transform-modules-commonjs", {
            "allowTopLevelThis": true
        }]
    ]
}