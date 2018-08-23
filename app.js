let UrlAssembler = require('url-assembler');

const url = UrlAssembler('https://bopoolen.nu/wp-admin/admin-ajax.php').query({
    'action': 'get_rentad',
    'args[max-rent]': 25000,
    'args[min-rent]': 0,
    'args[multiselect-all]': false,
    'args[city-lund]': true,
    'args[city-malmo]': true,
    'args[city-helsingborg]': true,
    'args[outside-lund]': true,
    'args[roominhouse]': true,
    'args[roominapartment]': true,
    'args[roominstudent]': true,
    'args[ownhouse]': true,
    'args[ownapartment]': true,
    'args[contractfirst]': true,
    'args[contractsecond]': true,
    'args[contractchange]': true    
}).toString();