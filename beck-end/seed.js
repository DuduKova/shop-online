const seeder = require('mongoose-seed');
const {ObjectID} = require('mongodb');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost/27017', function () {

    // Load Mongoose models
    seeder.loadModels([
        'models/Company.js',
        'models/User.js',
        'models/Cart.js'
    ]);

    // Clear specified collections
    seeder.clearModels(['User', 'Company','Cart'], function () {

        // Callback to populate DB once collections have been cleared
        seeder.populateModels(data, function () {
            seeder.disconnect();
        });

    });
});

const user1 = new ObjectID();
const user2 = new ObjectID();

// Data array containing seed data - documents organized by Model
const data = [
    {
        'model': 'User',
        'documents': [
            {
                _id: user1,
                password: '12345678',
                email: 'dudu@gmail.com',
                firstName: 'david',
                lastName: 'kovalski',
                city: 'TLV',
                street: 'lalala',
                isAdmin: true,
                tokens: [{
                    access: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzZjNGIwNTc1YzIyNjBhZWI0M2VhNmMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTUwNjAwOTcxfQ.C-JiV8zQfkEu_H7cnZSbsDRMK3cq_g5QPB-ohfwmX-7',
                    token: 'x-auth'
                }]

            },
            {
                _id: user2,
                password: '12345678',
                email: '1@gmail.com',
                firstName: 'asaf',
                lastName: 'azulay',
                city: 'Haifa',
                street: 'popopo',
                isAdmin: false,
                tokens: [{
                    access: 'x-auth',
                    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YzZjNGIwNTc1YzIyNjBhZWI0M2VhNmMiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTUwNjAwOTcxfQ.C-JiV8zQfkEu_H7cnZSbsDRMK3cq_g5QPB-ohfwmX-8'
                }]

            }
        ]
    },
    {
        'model': 'Company',
        'documents': [
            {
                name: 'water-world',
                bio: 'There are many variations of passages of Lorem Ipsum available,' +
                    ' but the majority have suffered alteration in some form, by injected ' +
                    'humour, or randomised words which don\'t look even slightly believable. ' +
                    'If you are going to use a passage of Lorem Ipsum, you need to be sure' +
                    ' there isn\'t anything embarrassing hidden in the middle of text. ' +
                    'All the Lorem Ipsum generators on the Internet tend to repeat ' +
                    'predefined chunks as necessary, making this the first true ' +
                    'generator on the Internet. It uses a dictionary of over 200 ' +
                    'Latin words, combined with a handful of model sentence structures,' +
                    ' to generate Lorem Ipsum which looks reasonable. The generated Lorem ' +
                    'Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
                logo: 'logo.png',
                products: [{
                    name: 'prod1',
                    price: 50,
                    image: 'Aiptasia__Majano.jpg',
                    description: 'Ipsum generators on the Internet tend to repeat \' +\n' +
                        ' \'predefined chunks as necessary, making this the first true \' +\n' +
                        ' \'generator on the Internet. It uses a dictionary of over 200 \' +\n' +
                        'Latin words, combined with a h',
                },
                    {
                        name: 'prod2',
                        price: 78,
                        image: 'Ultra_Ground_1-600x600.jpg',
                        description: 'Ipsum generators on the Internet tend to repeat \' +\n' +
                            ' \'predefined chunks as necessary, making this the first true \' +\n' +
                            ' \'generator on the Internet. It uses a dictionary of over 200 \' +\n' +
                            'Latin words, combined with a h',
                    },
                    {
                        name: 'prod3',
                        price: 20,
                        image: 'Blue-Green_Slime-600x490.jpg',
                        description: 'Ipsum generators on the Internet tend to repeat \' +\n' +
                            ' \'predefined chunks as necessary, making this the first true \' +\n' +
                            ' \'generator on the Internet. It uses a dictionary of over 200 \' +\n' +
                            'Latin words, combined with a h',
                    }
                ]
            },
            {
                name: 'aqua wow',
                bio: 'There are many variations of passages of Lorem Ipsum available,' +
                    ' but the majority have suffered alteration in some form, by injected ' +
                    'humour, or randomised words which don\'t look even slightly believable. ' +
                    'If you are going to use a passage of Lorem Ipsum, you need to be sure' +
                    ' there isn\'t anything embarrassing hidden in the middle of text. ' +
                    'All the Lorem Ipsum generators on the Internet tend to repeat ' +
                    'predefined chunks as necessary, making this the first true ' +
                    'generator on the Internet. It uses a dictionary of over 200 ' +
                    'Latin words, combined with a handful of model sentence structures,' +
                    ' to generate Lorem Ipsum which looks reasonable. The generated Lorem ' +
                    'Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
                logo: 'logo.png',
                products: [{
                    name: 'prod1',
                    price: 50,
                    image: 'Ultra_Ground_2-600x600.jpg',
                    description: 'Ipsum generators on the Internet tend to repeat \' +\n' +
                        ' \'predefined chunks as necessary, making this the first true \' +\n' +
                        ' \'generator on the Internet. It uses a dictionary of over 200 \' +\n' +
                        'Latin words, combined with a h',
                },
                    {
                        name: 'prod2',
                        price: 78,
                        image: 'Red_Slime-600x490.jpg',
                        description: 'Ipsum generators on the Internet tend to repeat \' +\n' +
                            ' \'predefined chunks as necessary, making this the first true \' +\n' +
                            ' \'generator on the Internet. It uses a dictionary of over 200 \' +\n' +
                            'Latin words, combined with a h',
                    },
                    {
                        name: 'prod3',
                        price: 20,
                        image: 'Worm_Tube-600x600-1.jpg',
                        description: 'Ipsum generators on the Internet tend to repeat \' +\n' +
                            ' \'predefined chunks as necessary, making this the first true \' +\n' +
                            ' \'generator on the Internet. It uses a dictionary of over 200 \' +\n' +
                            'Latin words, combined with a h',
                    }
                ]
            }
        ]
    },
    {
        'model': 'Cart',
        'documents': [{
            userId: user1,
            items: []
        },{
            userId: user2,
            items: []
        }
        ]
    }

];

// userId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
// items: [CartItem]
