# Care Schedule Template Plan

## Purpose

This document explains how Garden Buddy could create simple care tasks for users after they add a plant to their garden.

The aim is to keep this feature simple for the MVP, while still making the app useful for beginner gardeners.

## Why This Is Useful

When a user saves a plant, they may not know what care it needs or how often to look after it.

Garden Buddy can help by using basic care templates based on the plant type.

For example, if a user adds basil, the app could create tasks such as:

- Water basil every 3 days
- Check sunlight weekly
- Harvest leaves every 2 weeks

This gives the user a simple care plan without them having to create every task themselves.

## Plant Categories

To keep the MVP simple, we can start with four main plant types:

| Plant Type | Examples |
|---|---|
| Herbs | Basil, mint, parsley, coriander |
| Vegetables | Tomatoes, lettuce, carrots, peppers |
| Flowers | Roses, tulips, daisies, sunflowers |
| Houseplants | Pothos, peace lily, spider plant, snake plant |

## Example Care Templates

### Herb Template

| Task | Frequency |
|---|---|
| Water plant | Every 3 days |
| Check sunlight | Weekly |
| Check soil moisture | Weekly |
| Harvest leaves | Every 2 weeks |

### Vegetable Template

| Task | Frequency |
|---|---|
| Water plant | Every 2 days |
| Check soil moisture | Weekly |
| Check for pests | Weekly |
| Harvest when ready | Seasonal |

### Flower Template

| Task | Frequency |
|---|---|
| Water plant | Every 4 days |
| Check sunlight | Weekly |
| Remove dead flowers | Weekly |
| Check soil condition | Every 2 weeks |

### Houseplant Template

| Task | Frequency |
|---|---|
| Water plant | Weekly |
| Wipe leaves | Every 2 weeks |
| Check sunlight | Weekly |
| Rotate pot | Every 2 weeks |

## How It Could Work

When a user adds a plant to their garden, Garden Buddy can check the plant type and apply the matching care template.

Example flow:

1. User searches for a plant.
2. User views the plant details.
3. User clicks “Add to Garden”.
4. Garden Buddy checks the plant type.
5. The correct care template is applied.
6. Care tasks are created with due dates.
7. User can view and complete the tasks.

## Example Task Generation

If a user adds basil on 10 June, Garden Buddy could create:

| Task | Due Date |
|---|---|
| Water basil | 13 June |
| Check sunlight | 17 June |
| Check soil moisture | 17 June |
| Harvest leaves | 24 June |

The due dates would be based on the date the plant was added.

## MVP Scope

For the MVP, this feature should stay basic.

The first version should include:

| Feature | Included in MVP? |
|---|---|
| Basic care templates | Yes |
| Automatically created tasks | Yes |
| Due dates based on date added | Yes |
| Task list page | Yes |
| Mark task as complete button | Yes |
| Weather-based suggestions | Not for MVP |
| Notifications | Not for MVP |

## Future Ideas

Later, we could improve this feature by adding:

- Weather-based care tips
- Notifications or reminders
- More detailed plant care from the API
- Custom tasks created by users
- Seasonal growing advice
