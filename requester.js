const request = require('request');
const urlgen = require('./url-generator');

const formatPost = (post) => {
    formattedPost = {};
    
    formattedPost.id = post.post.ID;
    formattedPost.content = post.post.post_content;
    formattedPost.name = post.post.post_name;
    formattedPost.title = post.post.post_title;
    formattedPost.rent = post.custom_fields._rentprice;
    formattedPost.housingType = post.custom_fields._housingType;
    formattedPost.area = post.custom_fields._area;
    formattedPost.city = post.custom_fields._city;
    formattedPost.from = post.custom_fields._availablefrom;
    formattedPost.to = post.custom_fields._availableto;
    formattedPost.yta = post.custom_fields._availableyta;
    formattedPost.gemensanYta = post.custom_fields._availablegemensam;
    
    return formattedPost;
}

const performRequest = (resolve, reject) => {
    const options = {
        headers: {
            'user-agent': 'node.js',
            'json': true
        }
    }
    
    request(urlgen(), options, (error, response, body) => {
        if (error) {
            reject(error);
            return;
        }
        
        try {
            const posts = JSON.parse(body.toString('utf8'));
            const formattedPosts = posts.map(formatPost);
            resolve(formattedPosts);
        }
        
        catch(err) {
            reject(err);
        }
    });
}

module.exports = () => {
    return new Promise(performRequest);
}