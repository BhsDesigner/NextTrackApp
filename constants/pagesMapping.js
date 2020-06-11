import HostnameProvider from "../util/HostnameProvider";

const pagesMapping = {
    'homescapesonline.com': {
        'privacy': 'info/website-privacy-and-cookies',
        'terms':   'terms-and-condtions',
        'contact': 'contact',
        'help_number': '0121 3680051',
        'support_mail': 'support@homescapesonline.com',
    },
    'homescapesonline.de': {
        'privacy': 'Datenschutzerklärung',
        'terms':   'agb',
        'contact':  'contact',
        'help_number': '+44 121 3680051',
        'support_mail': 'support@homescapesonline.de',
    },
    'homescapes.fr': {
        'privacy': 'donnees-personnelles-et-cookies' ,
        'terms':   'termes-et-conditions',
        'contact':  'contact',
        'help_number': '+44 (0) 121 3680051',
        'support_mail': 'service.client@homescapesonline.com',
    },
}

export const getDomainPage = (type) => {
    const domain = HostnameProvider.getDomain();
    const prefix = "//www." + domain + '/';
    if(pagesMapping[domain] && pagesMapping[domain][type]) return prefix + pagesMapping[domain][type];
    return prefix + type;
}
