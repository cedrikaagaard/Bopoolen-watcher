let UrlAssembler = require('url-assembler');

module.exports = (arguments) => {
    const parameterList = [
        'args[city-lund]',
        'args[city-malmo]',
        'args[city-helsingborg]',
        'args[outside-lund]',
        'args[roominhouse]',
        'args[roominapartment]',
        'args[roominstudent]',
        'args[ownhouse]',
        'args[ownapartment]',
        'args[contractfirst]',
        'args[contractsecond]',
        'args[contractchange]'
    ]
    
    const parameters = {
        'action': 'get_rentad',
        'args[max-rent]': 25000,
        'args[min-rent]': 0,
        'args[multiselect-all]': false,
    };
    
    parameterList.forEach(parameter => {
        parameters[parameter] = true;
    });
    
    const urlBuilder = UrlAssembler('https://bopoolen.nu/wp-admin/admin-ajax.php').query(parameters);
    return urlBuilder.toString();
}