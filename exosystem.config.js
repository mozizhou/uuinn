
module.exports = {
    apps: [
        {
            name: 'uuinin',
            port: '3000',
            exec_mode: 'cluster',
            instances: '3',
            script: './.output/server/index.mjs'
        }
    ]
}
