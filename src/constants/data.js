module.exports = {
    DATA: {
        "nodes": [
            {
              "id": "id1",
              "name": "EUROPA",
              "val": 1
            },
            {
              "id": "id2",
              "name": "ZONA SCHENGEN",
              "val": 2
            },
            {
                "id": "id3",
                "name": "O.M.S.",
                "val": 3
            },
            {
                "id": "id4",
                "name": "EXAMPLE 4",
                "val": 1
              },
              {
                "id": "id5",
                "name": "EXAMPLE 5",
                "val": 2
              },
              {
                  "id": "id6",
                  "name": "EXAMPLE 6",
                  "val": 3
              },
              {
                "id": "id7",
                "name": "EXAMPLE 7",
                "val": 1
              },
              {
                "id": "id8",
                "name": "EXAMPLE 8",
                "val": 2
              },
              {
                  "id": "id9",
                  "name": "EXAMPLE 9",
                  "val": 3
              },
              {
                  "id": "id10",
                  "name": "EXAMPLE 10",
                  "val": 1
                },
                {
                  "id": "id11",
                  "name": "EXAMPLE 11",
                  "val": 2
                },
                {
                    "id": "id12",
                    "name": "EXAMPLE 12",
                    "val": 3
                },
                {
                    "id": "id13",
                    "name": "EXAMPLE 13",
                    "val": 2
                  },
                  {
                      "id": "id14",
                      "name": "EXAMPLE 14",
                      "val": 3
                  },
                  {
                    "id": "id15",
                    "name": "EXAMPLE 15",
                    "val": 3
                },
                {
                    "id": "id16",
                    "name": "EXAMPLE 16",
                    "val": 3
                }
        ],
        "links": [
            {
                "source": "id1",
                "target": "id2"
            },
            {
                "source": "id2",
                "target": "id1"
            },
            {
                "source": "id3",
                "target": "id8",
            },
            {
                "source": "id3",
                "target": "id4",
            },
            {
                "source": "id3",
                "target": "id5",
                "curvature": 0.3,
                "rotation": Math.PI * 2 / 3
            },
            {
                "source": "id4",
                "target": "id3"
            },
            {
                "source": "id4",
                "target": "id8"
            },
            {
                "source": "id5",
                "target": "id3"
            },
            {
                "source": "id6",
                "target": "id9"
            },
            {
                "source": "id7",
                "target": "id3"
            },
            {
                "source": "id7",
                "target": "id2"
            },
            {
                "source": "id8",
                "target": "id3"
            },
            {
                "source": "id8",
                "target": "id4"
            },
            {
                "source": "id8",
                "target": "id10"
            },
            {
                "source": "id8",
                "target": "id11"
            },
            {
                "source": "id8",
                "target": "id12"
            },
            {
                "source": "id9",
                "target": "id6"
            },
            {
                "source": "id10",
                "target": "id8"
            },
            {
                "source": "id11",
                "target": "id7"
            },
            {
                "source": "id11",
                "target": "id8"
            },
            {
                "source": "id11",
                "target": "id12"
            },
            {
                "source": "id11",
                "target": "id13"
            },
            {
                "source": "id12",
                "target": "id11"
            },
            {
                "source": "id12",
                "target": "id7"
            },
            {
                "source": "id13",
                "target": "id11"
            },
            {
                "source": "id12",
                "target": "id3"
            },
            {
                "source": "id14",
                "target": "id15"
            },
            {
                "source": "id14",
                "target": "id16"
            },
            {
                "source": "id15",
                "target": "id14"
            },
            {
                "source": "id15",
                "target": "id16"
            },

            {
                "source": "id16",
                "target": "id14"
            },
            {
                "source": "id16",
                "target": "id15"
            }
        ]
    },
    GROUPS: 12,
    DIFF_DAYS: 5
};
