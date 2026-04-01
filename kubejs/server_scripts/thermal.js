ServerEvents.recipes(event => {
    event.shaped(
        Item.of('kubejs:power_line'),
        [
            'BCB',
            'CAC',
            'BCB'
        ],
        {
            A: '#forge:plates/iron',
            B: '#forge:dusts/copper',
            C: '#forge:dusts/redstone'
        }
    )

    event.shaped(
        Item.of('kubejs:power_line', 3),
        [
            'BCB',
            'CAC',
            'BCB'
        ],
        {
            A: '#forge:plates/steel',
            B: '#forge:ingots/lumium', 
            C: '#forge:dusts/signalum'
        }
    )
})