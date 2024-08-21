import * as Sentry from '@sentry/vue';
import {
    Integrations
} from '@sentry/tracing';

export default defineNuxtPlugin( ( nuxtApp ) => {
    const {
        vueApp
    } = nuxtApp;

    const config = useRuntimeConfig();

    Sentry.init( {
        app: [ vueApp ],
        dsn: 'https://98b95a14ac4f63465fbe96d890aeddc8@o4506190446657536.ingest.sentry.io/4506190450196480',
        integrations: [
            new Integrations.BrowserTracing( {
                routingInstrumentation: Sentry.vueRouterInstrumentation( nuxtApp.$router ),
                tracingOrigins: [ 'benchmark.cuetip.com' ]
            } )
        ],
        logErrors: true,
        debug: false,
        sampleRate: 1,
        tracesSampleRate: 1,
        environment: config.environment,
        beforeSend( event ) {
            return event;
        }
    } );

    const defaults = {
        timeout: 2000,
        hooks: [ 'activate', 'mount', 'update' ]
    }
    vueApp.mixin( Sentry.createTracingMixins( {
        ...defaults,
        trackComponents: true
    } ) );

    Sentry.attachErrorHandler( vueApp, {
        ...defaults,
        logErrors: false,
        attachProps: true,
        trackComponents: true,
    } );

    return {
        provide: {
            sentrySetContext: ( n, context ) => Sentry.setContext( n, context ),
            sentrySetUser: ( user ) => Sentry.setUser( user ),
            sentrySetTag: ( tagName, value ) => Sentry.setTag( tagName, value ),
            sentryAddBreadcrumb: ( breadcrumb ) => Sentry.addBreadcrumb( breadcrumb )
        }
    }
} );