const {
    BASE_URL,
    DEF_TIME,
    JWT_SECRET,
    JWT_REFRESH_SECRET,
    EMAIL_FROM,
    EMAIL_FROM_HELP,
    EMAIL_HELP,
    SES_KEY,
    SES_SECRET,
    SES_REGION,
    API_KEY_GEOCODER
} = process.env

exports.bootstrap = _ => {
    global.config = {
        base_url: BASE_URL,
        default_timezone: DEF_TIME,

        maxTokenAge: 1000 * 60 * 60 * 4, // 4 hours
        maxRefreshAge: 1000 * 60 * 60 * 24, // 24 hours
        tokenSecret: JWT_SECRET,
        tokenSecretRefresh: JWT_REFRESH_SECRET,
        FIREBASE_CONFIG: {
            type: process.env.FIREBASE_TYPE,
            project_id: process.env.FIREBASE_PROJECT_ID,
            private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
            private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDQCCzKjdrb4XpK\n+LU4LbkU0Wn3uRQhkL3px0AlPbWVeJIccg4F+ViCOWBgRGap9TieXsxvEBTKFZMq\nQ0UIpjkgC6M8Gr1jsz8w0KLsME78naIiHtaOg5Fg5GyUyXTI3D9RzpxKYU7yp5aI\n9AntXLwRbPFsBdFASxyD8RzH9ifqX9bnx+eG/tV9gsTLvzzaO+rM77GDobKooHc4\nj0U14dF7NOeqHETG5US5WUe3oL3SDSSnq0tDhy5OiB6WOYpsqSLdlubjSsmMqiZn\n1nua/OmjaacsaOyhdgRZ8CRbXedhMbmOK3+944pd+IkYOSEm5huU7Wo1b6OR+o1F\nIawpfUITAgMBAAECggEAHvIoX5VMikr3WzG2G35JuvwP7GbexMN4TM90DlYorex6\np7qbtW3LKcwJNyjVsNCmtIBbnuXggdNFyhKpsUiw1MCGbsl3hN5ENynCIqppBZEZ\nbkPyHM8bkDNKp7N0KPEChlPa0gG5scUWUpci5ulVnK39F9mhsBO8UTBL3L8UXvvQ\nGmdP6hSxNQbNjYho8Jm68Dl/rm6Zl+QoJFWVE3De1jS4lGWkEvTNQ4ROpy3QHE8X\n0smBp6/v7UZEIM91uSpBcxk1zAHK0BgnHQVkziFxQaAGRS9cRSRsAvZS1ej7RtFo\nKHpNK1yn/f1dcFdbL5J7PWSOMRMEuUJ1pyndeEivYQKBgQDr4PQydjIoxkTcK0tv\nlPA/+4Cdw2ickRu9sq5rMgTh1doxsue7LDsSI9/m9pnwruPneQVSUOjFuApVUq86\nqfVTphr9eOIGTJwpST7Ol3eMmI2LlGEmvXr/ZOz5oyBPQO8sY7mMMPqLlYwmkJC6\nhH9JlaPLx2J1GalLYpxFL0sZQwKBgQDhxxyKrFD14YuD8MepN3c3irTnD0gh0Rkd\nMIshkg63UXEdjgFmD1ZYtCfxqkzaXmVymKyGjthLMsfMzopgVwOsagP2g2R1/7iC\niZXDc5abAxsh4/s8R5bjrTzI30Q05eupIoC331DXOEBjvtweFRV5eyg6ay8I6YP+\nA9SOi77+8QKBgCv05u0Ec8J/eFOjSdKIaeEyiDxeLv+GVyoZw0E8uAYx6RB7641I\n59UwlEghSny8ysHXHrPBWi+GZX6TAw6mn44wFTWJMm3EFxHmkWrEdUXhI/eP9i7W\n/rXbZAH9cUbzrd6S0wAaHIaons6NADuR93qKBVUzWdjCqHbg8IhAEPmrAoGBALB9\nUyRbuxXZ75N9/rWadAjo1qzgV0SIDZexwLDHWdWXRlMSFKnRR3AjtC3HMDhrHeZM\nzmCI/S8bTPAebDEPFAINBXgIEdnjwjnYj0ev7YTTEryVWGkwlRT48NEdJlYrfOJD\n5FbXrHvwrvTJ14t0c8r4qOOxsZzH3bQNDnU3bGAhAoGBAL3bCyB/4Da2BHK9oiaG\nVwu5zj9f/sXtqT3HbFvH0EYJ1Rbh9sA4MI0mqZ+SwU7oOOOc+HL11dcJVRdP25AC\nJjN0tEX43xfmzQlsaAqXxUrFqQJZdV7lEZWrUFmyT9Ct27Sx3fGzpzkBNwNsxFFv\nTvz9buC4nB4qDCICQwsZLyfE\n-----END PRIVATE KEY-----\n",
            client_email: process.env.FIREBASE_CLIENT_EMAIL,
            client_id: process.env.FIREBASE_CLIENT_ID,
            auth_uri: process.env.FIREBASE_AUTH_URI,
            token_uri: process.env.FIREBASE_TOKEN_URI,
            auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
            client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
        },
        email: {
            from: EMAIL_FROM,
            fromHelp: EMAIL_FROM_HELP,
            help: EMAIL_HELP,
            templatePath: 'views/emailTemplates',
            serviceData: {
                ses: {
                    accessKeyId: SES_KEY,
                    secretAccessKey: SES_SECRET,
                    region: SES_REGION
                }
            }
        },
        emailTemplatePath: 'emailTemplates',
        debugger: {
            // paths to exclude from logging
            exclude: [
                'login',
                'forgot',
                'verify',
                'reset',
                'register',
                'ping',
                '^/api/([a-z]*)/stats$',
                '^/api/([a-z]*)/auth/me$',
                '^/api/([a-z]*)/users$',
                '^/api/([a-z]*)/admin/logs$',
                '^/api/theme/.*',
                '^/api/widget.*',
                '^/api/updateWidgetImplementationStatus$',
            ],
        },
        warehouses: {
            exclude: [
                'testone',
                'TEST WAREHOUSE',
                'Virtual Warehouse',
                'Testing Sections'
            ]
        },
        pushNotificationOptions: {
            priority: "high",
            timeToLive: 60 * 60 * 24
        },
        geocoderOptions: {
            provider: "google",
            httpAdapter: "https",
            apiKey: API_KEY_GEOCODER,
            formatter: null,
        },
    };
}
