// create templates for each plant type

const templates = {
    Herb: [
        {
            taskName: "Check soil and water if dry",
            frequencyDays: 3
        },
        {
            taskName: "Check plant health and pests",
            frequencyDays: 7
        },
        {
            taskName: "Harvest or trim leaves",
            frequencyDays: 14
        }
    ],
    Flower: [
        {
            taskName: "Check soil and water if dry",
            frequencyDays: 2
        },
        {
            taskName: "Remove dead flowers",
            frequencyDays: 7
        },
        {
            taskName: "Feed plant",
            frequencyDays: 14
        }
    ],
    Vegetable: [
        {
            taskName: "Check soil and water if dry",
            frequencyDays: 1
        },
        {
            taskName: "Check plant health and pests",
            frequencyDays: 5
        },
        {
            taskName: "Harvest ripe produce if ready",
            frequencyDays: 7
        }
    ],
    GeneralPlant: [
        {
            taskName: "Check soil and water if dry",
            frequencyDays: 4
        },
        {
            taskName: "Check plant health and pests",
            frequencyDays: 7
        },
        {
            taskName: "Check plant growth and prune/harvest if needed",
            frequencyDays: 14
        }
    ],
}