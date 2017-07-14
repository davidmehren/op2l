module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        {
            name: "ophase API",
            script: "server.js",
            env: {
                NODE_ENV: "production",
                DB_NAME: "ophase",
                DEBUG: false,
                PORT: 5003
            }

        },
        {
            name: "ophase-staging API",
            script: "server.js",
            env: {
                NODE_ENV: "development",
                DB_NAME: "ophase-staging",
                DEBUG: true,
                PORT: 5004
            }

        }
    ]

};
