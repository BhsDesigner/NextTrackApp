export const DefaultSeo = (translate) => {
    return {
        title: translate('homescapes.seo.title'),
        description: translate('homescapes.seo.description'),
        titleTemplate: '%s',
        openGraph: {
            type: 'website',
            locale: 'en_IE',
            url: translate('homescapes.seo.url'),
            site_name: 'Homescapes',
        },
        twitter: {
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
        },
    }
};
