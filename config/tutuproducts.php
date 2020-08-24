<?php
// Тут прайс лист продукции и ее параметры
return [
    'data' =>
    [
        // $productArr
        [
            // $product
            'name' => 'Фотопечать',
            'code' => 'photoprint',
            'checked' => true,
            'params' =>
            [
                [
                    // $params
                    'name' => 'Формат',
                    'code' => 'size',
                    'main' => true,
                    'secondparams' =>
                    [
                        [
                            'name' => '10 x 15 cm',
                            'code' => '10x15',
                            'type' => 'radio',
                            'checked' => true,
                            'price' => 10
                        ],
                        [
                            'name' => '15 x 21 cm',
                            'code' => '15x21',
                            'type' => 'radio',
                            'price' => 20
                        ]
                    ]
                ],
                [
                    'name' => '',
                    'code' => '',
                    'secondparams' =>
                    [
                        [
                            'name' => 'Белая рамка по краям',
                            'code' => 'whiteborder',
                            'type' => 'checkbox',
                            'price' =>
                            [
                                '10x15' => 0,
                                '15x21' => 0,
                            ],
                        ]
                    ]
                ],
                [
                    'name' => '',
                    'code' => '',
                    'secondparams' =>
                    [
                        [
                            'name' => 'Коробка в комплекте',
                            'code' => 'box',
                            'type' => 'checkbox',
                            'price' =>
                            [
                                '10x15' => 500,
                                '15x21' => 750,
                            ],
                            'maxcount' =>
                            [
                                '10x15' => 100,
                                '15x21' => 150,
                            ]
                        ]
                    ]

                ]

            ]
        ],
        [
            // $product
            'name' => 'Фотокарточки',
            'code' => 'photocards',
            'checked' => true,
            'params' =>
            [
                [
                    // $params
                    'name' => 'Формат',
                    'code' => 'size',
                    'main' => true,
                    'secondparams' =>
                    [
                        [
                            'name' => '10 x 15 cm',
                            'code' => '10x15',
                            'type' => 'radio',
                            'checked' => true,
                            'price' => 30
                        ],
                        [
                            'name' => '15 x 21 cm',
                            'code' => '15x21',
                            'type' => 'radio',
                            'price' => 50
                        ]
                    ]
                ],
                [
                    'name' => '',
                    'code' => '',
                    'secondparams' =>
                    [
                        [
                            'name' => 'Белая рамка по краям',
                            'code' => 'whiteborder',
                            'type' => 'checkbox',
                            'price' =>
                            [
                                '10x15' => 0,
                                '15x21' => 0,
                            ],
                        ]
                    ]
                ],
                [
                    'name' => '',
                    'code' => '',
                    'secondparams' =>
                    [
                        [
                            'name' => 'Коробка в комплекте',
                            'code' => 'box',
                            'type' => 'checkbox',
                            'price' =>
                            [
                                '10x15' => 500,
                                '15x21' => 750,
                            ],
                            'maxcount' =>
                            [
                                '10x15' => 15,
                                '15x21' => 30,
                            ]
                        ]
                    ]

                ]

            ]
        ]
    ]
];
