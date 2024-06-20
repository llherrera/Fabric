module.exports = {
    apps : [{
        name   : "api formatos siigo",
        script : "dist/index.js",
        watch: false,
        max_memory_restart: '1024M',
        instances: 1
    }]
}