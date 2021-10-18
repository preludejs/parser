import parse from '../rfc8259/parse.js'

test('basic', () => {
  expect(parse(`
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
  })
})
