//아래와 같이 동작하는 parse 함수를 구현.
//출력된 name은 모두 'sk' 타입을 가진 사람들이다.
//obj https://gist.github.com/nigayo/a9a118977f82780441db664d6785efe3
const resultObj = {};
var obj = [{
    "id": 1,
    "name": "Yong",
    "phone": "010-2786-9902",
    "type": "sk",
    "childnode": [{
        "id": 11,
        "name": "echo",
        "phone": "010-3923-1333",
        "type": "kt",
        "childnode": [{
            "id": 115,
            "name": "hary",
            "phone": "010-2786-9302",
            "type": "sk",
            "childnode": [{
                "id": 1159,
                "name": "pobi",
                "phone": "010-9302-0009",
                "type": "kt",
                "childnode": [{
                    "id": 11592,
                    "name": "cherry",
                    "phone": "010-1223-9932",
                    "type": "lg",
                    "childnode": []
                },
                {
                    "id": 11595,
                    "name": "solvin",
                    "phone": "010-534-7843",
                    "type": "sk",
                    "childnode": []
                }
                ]
            }]
        },
        {
            "id": 116,
            "name": "kim",
            "phone": "010-3796-1102",
            "type": "kt",
            "childnode": [{
                "id": 1168,
                "name": "hani",
                "phone": "010-1223-6713",
                "type": "sk",
                "childnode": [{
                    "id": 11689,
                    "name": "ho",
                    "phone": "010-4434-4534",
                    "type": "kt",
                    "childnode": [{
                        "id": 116890,
                        "name": "wonsuk",
                        "phone": "010-3434-1302",
                        "type": "kt",
                        "childnode": []
                    },
                    {
                        "id": 1168901,
                        "name": "chulsu",
                        "phone": "010-3100-9841",
                        "type": "sk",
                        "childnode": []
                    }
                    ]
                }]
            }]
        },
        {
            "id": 117,
            "name": "hong",
            "phone": "010-2786-9902",
            "type": "lg",
            "childnode": []
        }
        ]
    }]
}]

resultObj.sk = [];
function parse(obj, keyword) {
    for (property in obj) {
        if (obj[property] == keyword) resultObj.sk.push(obj['name']);
        else if (obj[property].constructor == Object || obj[property].constructor == Array) 
            parse(obj[property], keyword);
    }
}
parse(obj, "sk");
console.log(resultObj.sk);