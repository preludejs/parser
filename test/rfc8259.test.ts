import * as P from '../index.js'
import * as Rfc8259 from '../rfc8259.js'

const p = P.exhaustive(Rfc8259.jsonText)

test('basic', () => {
  expect(p(`
    {
      "Image": {
        "Width":  800,
        "Height": 600,
        "Title":  "View from 15th Floor",
        "Thumbnail": {
          "Url":    "http://www.example.com/image/481989943",
          "Height": 125,
          "Width":  100
        },
        "Animated" : false,
        "IDs": [116, 943, 234, 38793]
      }
    }
  `)).toEqual({
    "type": "@prelude/parser/rfc8259/Object",
    "members": [
      {
        "type": "@prelude/parser/rfc8259/Member",
        "name": {
          "type": "@prelude/parser/rfc8259/String",
          "value": "Image"
        },
        "value": {
          "type": "@prelude/parser/rfc8259/Object",
          "members": [
            {
              "type": "@prelude/parser/rfc8259/Member",
              "name": {
                "type": "@prelude/parser/rfc8259/String",
                "value": "Width"
              },
              "value": {
                "type": "@prelude/parser/rfc8259/Number",
                "value": "800"
              }
            },
            {
              "type": "@prelude/parser/rfc8259/Member",
              "name": {
                "type": "@prelude/parser/rfc8259/String",
                "value": "Height"
              },
              "value": {
                "type": "@prelude/parser/rfc8259/Number",
                "value": "600"
              }
            },
            {
              "type": "@prelude/parser/rfc8259/Member",
              "name": {
                "type": "@prelude/parser/rfc8259/String",
                "value": "Title"
              },
              "value": {
                "type": "@prelude/parser/rfc8259/String",
                "value": "View from 15th Floor"
              }
            },
            {
              "type": "@prelude/parser/rfc8259/Member",
              "name": {
                "type": "@prelude/parser/rfc8259/String",
                "value": "Thumbnail"
              },
              "value": {
                "type": "@prelude/parser/rfc8259/Object",
                "members": [
                  {
                    "type": "@prelude/parser/rfc8259/Member",
                    "name": {
                      "type": "@prelude/parser/rfc8259/String",
                      "value": "Url"
                    },
                    "value": {
                      "type": "@prelude/parser/rfc8259/String",
                      "value": "http://www.example.com/image/481989943"
                    }
                  },
                  {
                    "type": "@prelude/parser/rfc8259/Member",
                    "name": {
                      "type": "@prelude/parser/rfc8259/String",
                      "value": "Height"
                    },
                    "value": {
                      "type": "@prelude/parser/rfc8259/Number",
                      "value": "125"
                    }
                  },
                  {
                    "type": "@prelude/parser/rfc8259/Member",
                    "name": {
                      "type": "@prelude/parser/rfc8259/String",
                      "value": "Width"
                    },
                    "value": {
                      "type": "@prelude/parser/rfc8259/Number",
                      "value": "100"
                    }
                  }
                ]
              }
            },
            {
              "type": "@prelude/parser/rfc8259/Member",
              "name": {
                "type": "@prelude/parser/rfc8259/String",
                "value": "Animated"
              },
              "value": {
                "type": "@prelude/parser/rfc8259/False"
              }
            },
            {
              "type": "@prelude/parser/rfc8259/Member",
              "name": {
                "type": "@prelude/parser/rfc8259/String",
                "value": "IDs"
              },
              "value": {
                "type": "@prelude/parser/rfc8259/Array",
                "values": [
                  {
                    "type": "@prelude/parser/rfc8259/Number",
                    "value": "116"
                  },
                  {
                    "type": "@prelude/parser/rfc8259/Number",
                    "value": "943"
                  },
                  {
                    "type": "@prelude/parser/rfc8259/Number",
                    "value": "234"
                  },
                  {
                    "type": "@prelude/parser/rfc8259/Number",
                    "value": "38793"
                  }
                ]
              }
            }
          ]
        }
      }
    ]
  })
})
