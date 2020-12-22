export default {
    // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
    ssr: false,

    // Target (https://go.nuxtjs.dev/config-target)
    target: 'static',

    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Dental',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ],
        script: [
            // { src: 'vue-cal/dist/drag-and-drop.js' }
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        "./assets/plugins/bootstrap-datepicker/bootstrap-datepicker.css",

        "./assets/plugins/datatables/dataTables.bootstrap4.min.css",
        "./assets/plugins/datatables/buttons.bootstrap4.min.css",
        "./assets/plugins/dropify/css/dropify.min.css",
        "./assets/plugins/datatables/responsive.bootstrap4.min.css",

        "./assets/css/bootstrap.min.css",
        "./assets/css/icons.css",
        "./assets/css/metisMenu.min.css",
        "./assets/css/viewer.css",
        "./assets/css/style.css",
        "./assets/css/vue-form-wizard.css"
    ],


    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: "~/plugins/vue-pdf.js" },
        { src: './plugins/vue-gallery.client.js' },
        { src: './plugins/vue-carousel.js' },
        { src: "~/plugins/localStorage.js" },
        { src: './plugins/vuescroll.js' },
        { src: './plugins/vue-myupload.js' },
        { src: './plugins/vue-form-wizard.js' },
        { src: './plugins/vue-cal.js' },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [],

    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/auth',
        // https://go.nuxtjs.dev/bootstrap
        'bootstrap-vue/nuxt',
        // https://go.nuxtjs.dev/axios
        '@nuxtjs/moment',
        '@nuxtjs/axios',
        // https://go.nuxtjs.dev/pwa
        '@nuxtjs/pwa',
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL: 'http://localhost:8000/api'
    },
    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: "http://localhost:8000/api/user/token/",
                        method: "POST",
                        propertyName: "token",
                        altProperty: 'refresh'
                    },
                    logout: true,
                    user: {
                        url: "http://localhost:8000/api/user/me",
                        method: "get",
                        propertyName: false
                    }
                },
                tokenType: "Token "
            }
        },
        redirect: {
            login: '/login',
            logout: '/login',
            callback: '/login',
            home: '/'
        },
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
        extend(config, { isClient }) {
            if (isClient) {
                config.optimization.minimize = false;
                config.optimization.splitChunks = false;

            }
        }

        // maxChunkSize: 300000
    },
    server: {
        // port: 8080 // default: 3000
        //host: "0.0.0.0" // default: localhost
    }

}