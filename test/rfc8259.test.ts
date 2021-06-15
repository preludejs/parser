import * as Rfc8259 from '../rfc8259.js'

test('basic', () => {
  expect(Rfc8259.parse(`
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
    "type": "object",
    "members": [
      [
        "Image",
        {
          "type": "object",
          "members": [
            [
              "Width",
              {
                "type": "number",
                "value": "800"
              }
            ],
            [
              "Height",
              {
                "type": "number",
                "value": "600"
              }
            ],
            [
              "Title",
              {
                "type": "string",
                "value": "View from 15th Floor"
              }
            ],
            [
              "Thumbnail",
              {
                "type": "object",
                "members": [
                  [
                    "Url",
                    {
                      "type": "string",
                      "value": "http://www.example.com/image/481989943"
                    }
                  ],
                  [
                    "Height",
                    {
                      "type": "number",
                      "value": "125"
                    }
                  ],
                  [
                    "Width",
                    {
                      "type": "number",
                      "value": "100"
                    }
                  ]
                ]
              }
            ],
            [
              "Animated",
              {
                "type": "false"
              }
            ],
            [
              "IDs",
              {
                "type": "array",
                "elements": [
                  {
                    "type": "number",
                    "value": "116"
                  },
                  {
                    "type": "number",
                    "value": "943"
                  },
                  {
                    "type": "number",
                    "value": "234"
                  },
                  {
                    "type": "number",
                    "value": "38793"
                  }
                ]
              }
            ]
          ]
        }
      ]
    ]
  })
})
