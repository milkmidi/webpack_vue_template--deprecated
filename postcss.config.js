module.exports = () => ({
    plugins: {
        autoprefixer: {
            browsers: ['last 5 version', 'iOS >=8', 'Safari >=8'],
        },
        cssnano: {
            zindex: false,
            calc: false,
            autoprefixer: false,
        },
    },
});
