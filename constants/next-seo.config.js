export const DefaultSeo = (translate) => {
    return {
        title: translate('Track Your Order Status'),
        description: 'Description here',
        titleTemplate: '%s',
        openGraph: {
            type: 'website',
            locale: 'en_IE',
            url: 'https://www.homescapesonline.com/',
            site_name: 'Homescapes',
        },
        twitter: {
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
        },
    }
};
