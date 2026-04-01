ServerEvents.recipes(event => {
    event.remove({ type: 'minecraft:blasting' })

    function remove_ingot_recipes(itemtype) {
        event.remove([{ type: 'minecraft:smelting', output: '#forge:ingots/'+itemtype,  not: { input: '#forge:dusts/'+itemtype  } }, { type: 'minecraft:blasting', output: '#forge:ingots/'+itemtype,  not: { input: '#forge:dusts'+itemtype  } }, { type: 'thermal:smelter', output: '#forge:ingots/'+itemtype ,  not: { input: '#forge:dusts'+itemtype  }}, { type: 'thermal:pulverizer', output: '#forge:dusts/'+itemtype, input: '#forge:raw_materials/'+itemtype}, { type: 'thermal:pulverizer', output: '#forge:dusts/'+itemtype, input: '#forge:ores/'+itemtype}]);
    };

    remove_ingot_recipes('iron');
    remove_ingot_recipes('copper');
    remove_ingot_recipes('gold');
    remove_ingot_recipes('lead');

    //iron

    event.remove([{ input: 'create:crushed_raw_iron'}])

    event.smelting('kubejs:iron_bloom', '#forge:raw_materials/iron', 0.5)
    event.blasting('10x kubejs:iron_bloom', '#forge:storage_blocks/raw_iron', 6.5, 2400)
    event.smelting('minecraft:iron_nugget', 'kubejs:iron_bloom', 0.75, 150)
    event.recipes.thermal.smelter('4x minecraft:iron_nugget', '3x kubejs:iron_bloom')  
    event.recipes.thermal.centrifuge([Fluid.of('tconstruct:molten_invar', 20), 'minecraft:iron_nugget', Item.of('thermal:slag').withChance(0.8)], 'kubejs:iron_bloom') 
    event.recipes.thermal.centrifuge(['minecraft:iron_nugget', Item.of('thermal:copper_dust').withChance(0.1), Item.of('thermal:tin_dust').withChance(0.03)], 'create:crushed_raw_iron')  

    event.recipes.create.splashing(['minecraft:iron_nugget', Item.of('thermal:nickel_dust').withChance(0.04), Item.of('thermal:slag').withChance(0.8)], 'create:crushed_raw_iron')
    event.recipes.create.splashing(['minecraft:iron_nugget', Item.of('minecraft:iron_nugget').withChance(0.65), Item.of('thermal:rich_slag').withChance(0.3)], 'kubejs:iron_bloom')

    //copper

    event.remove([{ input: 'create:crushed_raw_copper'}])
    event.remove([{ output: 'create:crushed_raw_copper'}])

    event.recipes.create.cutting(['2x create:copper_nugget', 'kubejs:patina', Item.of('4x create:copper_nugget').withChance(0.35)], 'create:crushed_raw_copper')
    event.recipes.thermal.sawmill(['4x create:copper_nugget', 'kubejs:patina'], 'create:crushed_raw_copper')

    event.recipes.create.cutting(['2x create:copper_nugget', '2x minecraft:clay_ball', Item.of('2x minecraft:clay_ball').withChance(0.35)], '#forge:raw_materials/copper')
    event.recipes.thermal.sawmill(['3x create:copper_nugget', '2x minecraft:clay_ball'], '#forge:raw_materials/copper')

    event.recipes.create.splashing(['minecraft:green_dye', Item.of('create:copper_nugget').withChance(0.8), Item.of('create:copper_nugget').withChance(0.15), Item.of('thermal:slag').withChance(0.05)], 'kubejs:patina')
    event.blasting('create:copper_nugget', 'kubejs:patina', 0.5, 100)

    event.recipes.create.milling(['create:crushed_raw_copper', Item.of('kubejs:patina').withChance(0.5)], '#forge:raw_materials/copper')
    event.recipes.create.crushing(['kubejs:patina', Item.of('create:crushed_raw_gold').withChance(0.2), Item.of('create:experience_nugget').withChance(0.75)], 'create:crushed_raw_copper')

    //gold

    event.remove([{ input: 'create:crushed_raw_gold'}])
    event.remove([{ output: 'create:crushed_raw_gold'}])

    event.recipes.create.pressing(['minecraft:gold_ingot', Item.of('minecraft:gold_ingot').withChance(0.25)], 'minecraft:raw_gold_block')
    event.recipes.create.crushing(['9x create:crushed_raw_gold', Item.of('thermal:gold_dust').withChance(0.1), Item.of('9x create:experience_nugget').withChance(0.75)], 'minecraft:raw_gold_block')

    event.recipes.create.pressing(['minecraft:gold_nugget'], 'minecraft:raw_gold')
    event.recipes.create.pressing(['minecraft:gold_nugget', Item.of('minecraft:gold_nugget').withChance(0.15)], 'create:crushed_raw_gold')

    event.recipes.create.compacting(['kubejs:heated_gold', Fluid.of('tconstruct:molten_gold', 20)], ['#forge:raw_materials/gold', Fluid.of('minecraft:lava', 50)]).heated()
    event.recipes.create.compacting(['kubejs:heated_gold'], ['#forge:raw_materials/gold', '#forge:sand']).heated()
    event.recipes.create.compacting(['create:golden_sheet'], ['8x kubejs:heated_gold', '3x #forge:sand']).heated()

    event.recipes.create.splashing(['2x minecraft:gold_nugget', Item.of('thermal:rich_slag').withChance(0.1)], 'kubejs:heated_gold')
    event.recipes.thermal.centrifuge(['minecraft:gold_nugget', Item.of('minecraft:raw_copper').withChance(0.75), Item.of('create:rose_quartz').withChance(0.3)], 'kubejs:heated_gold')  
    event.recipes.thermal.centrifuge(['create:crushed_raw_gold', Item.of('create:copper_nugget').withChance(0.75), Item.of('ae2:certus_quartz_dust').withChance(0.5)], '#forge:raw_materials/gold')  

    event.custom({
        "type": "tconstruct:casting_basin",
        "cast": {
            "item": "kubejs:heated_gold"
        },
        "cast_consumed": true,
        "cooling_time": 600,
        "fluid": {
            "amount": 60,
            "tag": "forge:molten_gold"
        },
        "result": "create:golden_sheet"
    })

    //lead & silver

    event.remove([{ input: 'create:crushed_raw_lead'}])
    event.remove([{ output: 'create:crushed_raw_lead'}])

    event.recipes.create.crushing(['9x create:crushed_raw_lead', 'thermal:raw_silver', Item.of('9x create:experience_nugget').withChance(0.75)], '#forge:storage_blocks/raw_lead')
    event.recipes.create.crushing(['create:crushed_raw_lead', Item.of('thermal:raw_silver').withChance(0.25), Item.of('create:experience_nugget').withChance(0.75)], '#forge:raw_materials/lead')

    event.recipes.create.deploying(['thermal:lead_nugget', Item.of('thermal:lead_nugget').withChance(0.5)], ['create:crushed_raw_lead', 'tconstruct:sledge_hammer'])
    event.recipes.create.sandpaper_polishing('thermal:lead_ingot', 'thermal:raw_lead_block')
    event.recipes.create.sandpaper_polishing('thermal:lead_nugget', '#forge:raw_materials/lead')

    event.remove([{ input: 'create:crushed_raw_silver'}])
    event.remove([{ output: 'create:crushed_raw_silver'}])

    event.recipes.create.crushing(['9x create:crushed_raw_silver', 'thermal:raw_lead', Item.of('9x create:experience_nugget').withChance(0.75)], '#forge:storage_blocks/raw_silver')
    event.recipes.create.crushing(['create:crushed_raw_silver', Item.of('thermal:raw_lead').withChance(0.25), Item.of('create:experience_nugget').withChance(0.75)], '#forge:raw_materials/silver')

    event.recipes.create.deploying(['thermal:silver_nugget', Item.of('thermal:silver_nugget').withChance(0.5)], ['create:crushed_raw_silver', 'tconstruct:sledge_hammer'])
    event.recipes.create.sandpaper_polishing('thermal:silver_ingot', 'thermal:raw_silver_block')
    event.recipes.create.sandpaper_polishing('thermal:silver_nugget', '#forge:raw_materials/silver')

    event.recipes.create.compacting(['3x thermal:silver_nugget', '3x thermal:lead_nugget'], ['create:crushed_raw_lead', 'create:crushed_raw_silver']).heated()
})

ServerEvents.tags('fluid', event => {
  event.remove('create:fan_processing_catalysts/blasting', 'minecraft:lava')
})