module.exports = {
    configuration: {
        connection: {
            urls: ["http://localhost:8529"],
        },
        database: {
            name: 'testing',
            collections: [
                {
                    name: 'cuisines',
                    properties: {
    
                    },
                    indexes: [
                        {
                            name: "nameSearch",
                            type: "fulltext",
                            fields: ['name'],
                            minLength: 2
                        }
                    ]
                },
                {
                    name: 'trucks',
                    properties: {

                    },
                    indexes: [
                    ]
                }
            ]
        },
        graphs: [
            {
                name: 'parked',
                edges: [
                    {
                        name: 'child_cuisine',
                        from: 'cuisines',
                        to: 'cuisines',
                        indexes: [
                            {
                                name: 'unique',
                                type: 'hash',
                                fields: ['_from', '_to'],
                                unique: true
                            }
                        ]
                    }
                ],
                vertices: ['trucks']
            }
        ]
    }
};