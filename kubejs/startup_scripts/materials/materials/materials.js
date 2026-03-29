// priority: 100
// Ignore this
const $IngotProperty = global.IngotProperty;
const $DustProperty = global.DustProperty;
const $FluidProperty = global.FluidProperty;
const $BlastProperty = global.BlastProperty;
const $FluidPipeProperties = global.FluidPipeProperties;

// Icon Sets
const DULL = GTMaterialIconSet.DULL;
const METALLIC = GTMaterialIconSet.METALLIC;
const MAGNETIC = GTMaterialIconSet.MAGNETIC;
const SHINY = GTMaterialIconSet.SHINY;
const BRIGHT = GTMaterialIconSet.BRIGHT;
const DIAMOND = GTMaterialIconSet.DIAMOND;
const EMERALD = GTMaterialIconSet.EMERALD;
const GEM_HORIZONTAL = GTMaterialIconSet.GEM_HORIZONTAL;
const GEM_VERTICAL = GTMaterialIconSet.GEM_VERTICAL;
const RUBY = GTMaterialIconSet.RUBY;
const OPAL = GTMaterialIconSet.OPAL;
const GLASS = GTMaterialIconSet.GLASS;
const NETHERSTAR = GTMaterialIconSet.NETHERSTAR;
const FINE = GTMaterialIconSet.FINE;
const SAND = GTMaterialIconSet.SAND;
const WOOD = GTMaterialIconSet.WOOD;
const ROUGH = GTMaterialIconSet.ROUGH;
const FLINT = GTMaterialIconSet.FLINT;
const LIGNITE = GTMaterialIconSet.LIGNITE;
const QUARTZ = GTMaterialIconSet.QUARTZ;
const CERTUS = GTMaterialIconSet.CERTUS;
const LAPIS = GTMaterialIconSet.LAPIS;
const FLUID = GTMaterialIconSet.FLUID;
const RADIOACTIVE = GTMaterialIconSet.RADIOACTIVE;

// Flags
// Generic flags
const no_unify = GTMaterialFlags.NO_UNIFICATION;
const electrolyze = GTMaterialFlags.DECOMPOSITION_BY_ELECTROLYZING;
const centrifuge = GTMaterialFlags.DECOMPOSITION_BY_CENTRIFUGING;
const no_decomp = GTMaterialFlags.DISABLE_DECOMPOSITION;
const explosive = GTMaterialFlags.EXPLOSIVE;
const flammable = GTMaterialFlags.FLAMMABLE;
const sticky = GTMaterialFlags.STICKY;
const phosphorescent = GTMaterialFlags.PHOSPHORESCENT;
// Generation Flags
// Dust Flags
const plates = GTMaterialFlags.GENERATE_PLATE;
const dense_plate = GTMaterialFlags.GENERATE_DENSE;
const rod = GTMaterialFlags.GENERATE_ROD;
const bolt_and_screw = GTMaterialFlags.GENERATE_BOLT_SCREW;
const frame = GTMaterialFlags.GENERATE_FRAME;
const gear = GTMaterialFlags.GENERATE_GEAR;
const long_rod = GTMaterialFlags.GENERATE_LONG_ROD;
const block = GTMaterialFlags.FORCE_GENERATE_BLOCK;
// Ingot Flags
const foil = GTMaterialFlags.GENERATE_FOIL;
const ring = GTMaterialFlags.GENERATE_RING;
const spring = GTMaterialFlags.GENERATE_SPRING;
const small_spring = GTMaterialFlags.GENERATE_SPRING_SMALL;
const small_gear = GTMaterialFlags.GENERATE_SMALL_GEAR;
const fine_wire = GTMaterialFlags.GENERATE_FINE_WIRE;
const rotor = GTMaterialFlags.GENERATE_ROTOR;
const round = GTMaterialFlags.GENERATE_ROUND;
const magnetic = GTMaterialFlags.IS_MAGNETIC;
// Gem Flags
const crystallizable = GTMaterialFlags.CRYSTALLIZABLE;
const lens = GTMaterialFlags.GENERATE_LENS;
// Fluid Flags
const solder_mat = GTMaterialFlags.SOLDER_MATERIAL;
const solder_mat_bad = GTMaterialFlags.SOLDER_MATERIAL_BAD;
const solder_mat_good = GTMaterialFlags.SOLDER_MATERIAL_GOOD;
// Ore Flags
const more_sifter = GTMaterialFlags.HIGH_SIFTER_OUTPUT;
// Misc
const no_block_craft = GTMaterialFlags.EXCLUDE_BLOCK_CRAFTING_RECIPES;
const no_plate_compressor_craft = GTMaterialFlags.EXCLUDE_PLATE_COMPRESSOR_RECIPE;
const no_hand_craft = GTMaterialFlags.EXCLUDE_BLOCK_CRAFTING_BY_HAND_RECIPES;
const mortar_grind = GTMaterialFlags.MORTAR_GRINDABLE;
const no_working = GTMaterialFlags.NO_WORKING;
const no_smashing = GTMaterialFlags.NO_SMASHING;
const no_smelt = GTMaterialFlags.NO_SMELTING;
const blast_furnace_double = GTMaterialFlags.BLAST_FURNACE_CALCITE_DOUBLE;
const blast_furnace_triple = GTMaterialFlags.BLAST_FURNACE_CALCITE_TRIPLE;
const no_abs_recipe = GTMaterialFlags.DISABLE_ALLOY_BLAST;
const not_alloy = GTMaterialFlags.DISABLE_ALLOY_PROPERTY;

// Useful functions
const V = (voltage) => {
    return global.v[voltage];
}

const VA = (voltage) => {
    return global.va[voltage];
}

const VH = (voltage) => {
    return global.vh[voltage];
}

const VHA = (voltage) => {
    return global.vha[voltage];
}

// Moving all of this ( ^ ) to helpers is ideal

/*
    Materials are in-game items or fluids. They can be dusts, ingots, gems, fluids and all their derivatives.
    To make a new material(NOTE: to add a material that is present on the periodic table, but 
        it doesn't have any in-game items/fluids, look below for how to do it),
    write an `event.create()` call in the bellow registering function.
    Write inside the parantheses the name of the material inside '' or "".
    You can change the properties of the material by adding any combination of the following calls:
        .ingot() -> this will make the material have both an ingot and dust form.
        .dust() -> this will make the material have a dust form. Don't use this together with .dust().
        .gem() -> this will make the material have both a gem form and a dust form. Don't use thos together with .dust() or .ingot()
        .fluid() -> this will make the material have a fluid form. 
        .gas() -> this will make the material have a gas(fluid) form with gas properties. 
        .plasma() -> this will make the material have a plasma(fluid) form with plasma properties.
        .polymer() -> this will make the material have a dust form with polymer properties.
            For .ingot(), .dust() and .gem(), optionally you can put inside the parantheses any of these sets of parameters:
                1. harvest level (ex. .ingot(2) will make the material have the harvest level of iron tools)
                2. harvest level, burn time (2x. ingot(2, 2000) will make the material have the harvest level of iron tools and will burn in furnaces as fuel for 2000 ticks or 100 seconds).
        .burnTime(burn time in ticks) -> this will turn the material into a furnace fuel.
        .fluidBurnTime(burn time in ticks) -> how long the fluid of the material will burn.
        .color(color code) -> gives the material a color. The colo must be providen in the following form: 0xNNNNNN, where N are digits.
            To chose a color for your material, you can checkout https://www.w3schools.com/colors/colors_picker.asp
            After you select a color with the above tool, copy the 6 digits that follow the # under the color preview.
        .secondaryColor(color code) -> gives the material a secondary color. If this is not being called, the secondary value will default to white(0xffffff).
        .iconSet(set) -> gives the material an icon set. View line 9 to see the posible icon sets.
        .components(component1, component2, ...) -> describes the composition. The components are a list of elements of the following form: 'Kx material_name', where K is a positive integer.
            Depending on the composition, gt will autogenerate an electrolyzer or centrifuge recipe to decompose the material. You can block that by adding the disable decomposition flag.
        .flags(flag1, flag2, ...) -> flags can be used to select certain properties of the material, like generating gears, or disabling decomposition.
        .element(element) -> similar to .components(), but is used when the material represents an element. 
            See line X for a list of posible flags.
        .rotorStats(power, efficiency, damage, durability) -> this will create a turbine rotor from this material.
        blastTemp() -> this is meant to be paired together with .ingot(). Will generate a EBF recipe(and an ABS recipe) based on the parameters you give it:
            1. temperature -> dictates what coil tier it will require(check the coil tooltips for their max temperature). 
                If the temperature is below 1000, it will also generate a PBF recipe.
                If temperature is above 1750, a hot ingot will be generated, this requiring a Vacuum Freezer.
            2. (optional) gas tier -> can be null for none, 'low' for nitrogen, 'mid' for helium, 'high' for argon, 'higher' for neon or 'highest' for krypton.
            3. (optional) EU per tick -> the recipe voltage
                (USEFUL NOTE: gt has some inbuilt functions to ease chosing the voltages, you can use V('tier') for full amp, VA('tier') for full amp, but adjusted for cable loss, VH('tier) for half an amp or VHA('tier) for half an amp adjusted for cable loss).
            4. (optional) duration in ticks -> how long the recipe should take
        .ore() -> this will create an ore from the material.
            Optionally you can add any of these sets of parameters:
                1. is emissive -> true for emissive textures
                2. ore multiplier and byproduct multiplier -> how many crushed ores will be given from one raw ore and how many byproducts dusts will be given throughout the ore processing
                3. ore multiplier, byproduct multiplier, is emissive
        .washedIn()
        .separatedIn()
        .separatedInto()
        .oreSmeltInto()
        .polarizesInto()
        .arcSmeltInto()
        .maceratesInto()
        .ingotSmeltInto()
        .addOreByproducts()
        .cableProperties() -> generates wires and cables(if material is not a superconducter). The following parameter sets can be given:
            1. Voltage, amperage, loss per block
            2. Voltage, amperage, loss per block, is superconductor -> for a super conductor, set loss as 0 and is super conductor as true
            3. Voltage, amperage, loss per block, is super conductor and critical temperature
        .toolProperties()
        .fluidPipeProperties() ->
            (int maxTemp, int throughput [tiny pipe], boolean gasProof, boolean acidProof, boolean cryoProof, boolean plasmaProof)
        .itemPipeProperties() ->
            (int priority, float stacksPerSec)
        .addDefaultEnchant()
        
*/

/*
event.create('netherite')
        .dust()
        .components('4x debris', '4x gold')
        .color(0x1a0d00)
        .iconSet(DULL)
        .flags(no_decomp);
*/

GTCEuStartupEvents.registry('gtceu:material_icon_set', event => {
    event.create('fluix').parent('certus');
});

GTCEuStartupEvents.materialModification(event => {

    GTMaterials.Netherite.setMaterialARGB(0x1a0d00);
    GTMaterials.Netherite.setMaterialIconSet(DULL);
    GTMaterials.Netherite.addFlags(rod, foil);
    GTMaterials.Lutetium.setProperty(PropertyKey.INGOT, new IngotProperty());
    GTMaterials.get('netherite_trisulfate_complex').setFormula('[*Nr*(SO4)3](OH)2');
    GTMaterials.get('netherite_hexammine_sulfate').setFormula('[*Nr*(NH3)6]SO4');
    GTMaterials.get('glowstone').setFormula('(Si(FeS2)5(CrAl2O3)Hg3)Au');
    GTMaterials.get('ohmderblux_alloy').setFormula('Cx5(Fe16TiAlNi4Co2)2Zr4(Si(FeS2)5(CrAl2O3)Hg3)Au)9(Co5Cr2NiMo)3');
    GTMaterials.get('netherite').setFormula('Nr');
    GTMaterials.get('netherite_gold_skystone_alloy').setFormula('Nr4(SkC2)2(Sk(SiAu2)2)');
    GTMaterials.get('netherite_certus_quartz_skystone_alloy').setFormula('Nr4(SkC2)2(Sk(SiO2)2)');
    GTMaterials.get('nether_star').setFormula('✧');
    // GTMaterials.get('nether_star_concentrate').setFormula('*✧*');
    GTMaterials.get('dissipated_helish_concentrate').setFormula('⛧-');
    GTMaterials.get('helish_concentrate').setFormula('⛧');
    GTMaterials.get('hellfire_ash').setFormula('🔥-');
    // GTMaterials.get('starium_alloy').setFormula('*✧*4(Ke6Nq2C)2El2');
    GTMaterials.get('nyanium').setFormula('ᗢ');
    GTMaterials.get('maxwellium').setFormula('ᓚᘏᗢ')
    GTMaterials.get('low_saturation_voidic_excression').setFormula('[∅-]');
    GTMaterials.get('moderate_saturation_voidic_excression').setFormula('[∅]');
    GTMaterials.get('high_saturation_voidic_excression').setFormula('[∅+]');
    GTMaterials.get('lethargic_voidic_slurry').setFormula('?[∅-]*');
    GTMaterials.get('tempered_voidic_slurry').setFormula('?[∅]*');
    GTMaterials.get('vibrant_voidic_slurry').setFormula('?[∅+]*');
    GTMaterials.get('alpha_state_void_sludge').setFormula('?α∅');
    GTMaterials.get('beta_state_void_sludge').setFormula('?β∅');
    GTMaterials.get('gamma_state_void_sludge').setFormula('?γ∅');
    GTMaterials.get('delta_state_void_sludge').setFormula('?δ∅');
    GTMaterials.get('epsilon_state_void_sludge').setFormula('?ε∅');
    GTMaterials.get('zeta_state_void_sludge').setFormula('?ζ∅');
    GTMaterials.get('alpha_state_void_residue').setFormula('α∅');
    GTMaterials.get('beta_state_void_residue').setFormula('β∅');
    GTMaterials.get('gamma_state_void_residue').setFormula('γ∅');
    GTMaterials.get('delta_state_void_residue').setFormula('δ∅');
    GTMaterials.get('epsilon_state_void_residue').setFormula('ε∅');
    GTMaterials.get('zeta_state_void_residue').setFormula('ζ∅');
    GTMaterials.get('order_centric_void').setFormula('⚖∅');
    GTMaterials.get('chaos_centric_void').setFormula('✹∅');
    GTMaterials.get('voidic_waste_residue').setFormula('?∅?');
    // GTMaterials.get('dragon_breath').setFormula('🜍');
    // GTMaterials.get('pure_dragon_breath').setFormula('*🜍*');
    // GTMaterials.get('voidic').setFormula('∅');
    GTMaterials.get('preon').setFormula('✶');
    GTMaterials.get('paradox').setFormula('☯');
    GTMaterials.get('rare_earth').setFormula('?');
    GTMaterials.get('platinum_group_sludge').setFormula('Pt?');
    // GTMaterials.get('draconyallium').setFormula('🜍Dr68Ag20O94N76🜍');
    GTMaterials.get('draco_abyssal').setFormula('🜍∅🜍');
    GTMaterials.get('silver_sulfate').setFormula('Ag2(SO4)');
    GTMaterials.get('chromium_sulfate').setFormula('Cr2(SO4)3');
    GTMaterials.get('sparse_electron_akreyrium').setFormula('Ak(?e?)?');
    GTMaterials.get('dense_electron_akreyrium').setFormula('Ak(e)?');
    GTMaterials.get('sparse_muon_akreyrium').setFormula('Ak(?μ?)?');
    GTMaterials.get('dense_muon_akreyrium').setFormula('Ak(μ)?');
    GTMaterials.get('sparse_tau_akreyrium').setFormula('Ak(?τ?)?');
    GTMaterials.get('dense_tau_akreyrium').setFormula('Ak(τ)?');
    GTMaterials.get('lepton_sparse_akreyrium').setFormula('Ak(?ℓ?)?');
    GTMaterials.get('lepton_dense_akreyrium').setFormula('Ak(ℓ)?');
    GTMaterials.get('echo_shard').setFormula('Ec');
    GTMaterials.get('zavaritskite').setFormula('(BiO)F');

});

GTCEuStartupEvents.registry('gtceu:material', event => {

    // Periodic table materials
    const element = global.periodicTableElement;
    // Ingots
    element('zirconium', 'ingot');
    element('tellurium', 'ingot');
    element('polonium', 'ingot');
    element('astatine', 'ingot');
    element('hafnium', 'ingot');
    element('seaborgium', 'ingot');
    element('flerovium', 'ingot');
    element('rhenium', 'ingot');

    // Dusts
    element('selenium', 'dust');
    element('strontium', 'dust');
    element('thallium', 'dust');

    // Liquids
    element('seaborgium', 'fluid');
    element('flerovium', 'fluid');
    element('rhenium', 'fluid');
    element('zirconium', 'fluid');
    element('hafnium', 'fluid');

    // Gasses
    // periodicTableElement('iodine', 'gas');
    element('oganesson', 'gas');

    // Plasmas
    
    // Materials used as placeholders
    [
        'mystery','star','dragon','excited','soul'
    ].forEach(elem => {
        event.create(elem)
                .element(GTElements.get(elem));
    });

    // Material modification
    const matmod = (mat, flag) => {
        GTMaterials.get(mat).addFlags(flag);
    }
    matmod('lead', gear);
    matmod('silver', gear);
    matmod('naquadah', dense_plate);
    matmod('enriched_naquadah', [dense_plate, rotor, gear, small_gear, frame, long_rod]);
    matmod('naquadria', dense_plate);
    matmod('neutronium', [foil, small_gear,rotor, dense_plate]);
    matmod('europium', [small_spring,bolt_and_screw]);
    matmod('zirconium', fine_wire);
    matmod('hafnium', fine_wire);
    matmod('rhenium', fine_wire);
    matmod('red_steel', [rod, frame]);
    matmod('sterling_silver', [rod, frame]);
    matmod('nether_star', foil);
    matmod('netherite', no_decomp);
    matmod('echo_shard', [lens, foil]);
    matmod('copper', gear);
    matmod('vanadium_gallium', fine_wire);
    matmod('titanium', foil);
    matmod('rhodium_plated_palladium', [frame, foil]);
    matmod('darmstadtium', [frame, foil]);
    matmod('ruthenium_trinium_americium_neutronate', fine_wire);
    matmod('gold', gear);
    matmod('electrum', gear);
    matmod('blue_alloy', gear);
    matmod('cupronickel', small_spring);
    matmod('kanthal', small_spring);
    matmod('nichrome', small_spring);
    matmod('tantalum_carbide', foil);
    // matmod('borosilicate_glass', foil); //is force ignored in GT code

    // Blast Properties of periodic table metals
    const blast = global.blastProperty;
    blast('zirconium', 10900, 'higher', VA('uv'), 800);
    blast('tellurium', 11200, 'higher', VA('uhv'), 900);
    blast('polonium', 13400, 'higher', VHA('uiv'), 1350);
    blast('astatine', 12800, 'higher', VA('uhv'), 1400);
    blast('hafnium', 11900, 'higher', VA('uv'), 750);
    blast('rhenium', 14800, 'highest', VA('uiv'), 1200);
    blast('seaborgium', 13300, 'higher', VA('uev'), 1500);
    blast('flerovium', 12200, 'higher', VA('uhv'), 1200);

    // Fluid Pipes
    GTMaterials.NaquadahEnriched.setProperty(PropertyKey.FLUID_PIPE, new FluidPipeProperties(8000, 500, true, true, true, false));

    // Materials from elements
    const compIngot = (name, elements, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().components(elements).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().components(elements).color(color).iconSet(icon).flags(flags);
        }
    }

    const elemIngot = (name, element, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().element(GTElements.get(element)).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().element(GTElements.get(element)).color(color).iconSet(icon).flags(flags);
        }
    }

    const compIngotLiquid = (name, elements, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().fluid().components(elements).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().components(elements).color(color).iconSet(icon).flags(flags);
        }
    }

    const compIngotLiquidSecColor = (name, elements, color1, color2, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().fluid().components(elements).color(color1).secondaryColor(color2).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().components(elements).color(color1).secondaryColor(color2).iconSet(icon).flags(flags);
        }
    }

     const elemLiquidSecColor = (name, color1, color2, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().fluid().element(GTElements.get(name)).color(color1).secondaryColor(color2).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().element(GTElements.get(name)).color(color1).secondaryColor(color2).iconSet(icon).flags(flags);
        }
    }

    const elemIngotFluid = (name, color, icon, blasting, flags) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().fluid().element(GTElements.get(name)).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
        } else {
            event.create(name).ingot().fluid().element(GTElements.get(name)).color(color).iconSet(icon).flags(flags);
        }
    }
    
    const compLiquid = (name, elements, color, flags) => {
        event.create(name).fluid().components(elements).color(color).flags(flags);
    }

    const elemFluid = (name, element, color, flags) => {
        event.create(name).fluid().element(GTElements.get(element)).color(color).flags(flags);
    }

    const compLiquidTemp = (name, heat, elements, color, flags) => {
        event.create(name).liquid(new GTFluidBuilder().temperature(heat)).components(elements).color(color).flags(flags);
    }
    
    const compLiquidStill = (name, elements, flags) => {
        event.create(name).liquid(new GTFluidBuilder().state(GTFluidState.LIQUID).customStill()).components(elements).flags(flags);
    }
    
    const compDustLiquid = (name, elements, color, flags) => {
        event.create(name).dust().fluid().components(elements).color(color).flags(flags);
    }

    const elemDustFluid = (name, color, flags) => {
        event.create(name).dust().fluid().element(GTElements.get(name)).color(color).flags(flags);
    }
    
    const compDust = (name, elements, color, flags) => {
        event.create(name).dust().components(elements).color(color).flags(flags);
    }
    
    const compDustIcon = (name, elements, color, icon, flags) => {
        event.create(name).dust().components(elements).color(color).iconSet(icon).flags(flags);
    }

    const elemDust = (name, color, flags) => {
        event.create(name).dust().element(GTElements.get(name)).color(color).flags(flags);
    }
    
    const compGem = (name, elements, color, icon, flags) => {
        event.create(name).gem().components(elements).color(color).iconSet(icon).flags(flags);
    }

    const elemGem = (name, color, icon, flags) => {
        event.create(name).gem().element(GTElements.get(name)).iconSet(icon).color(color).flags(flags);
    }
    
    const compGas = (name, elements, color, flags) => {
        event.create(name).gas().components(elements).color(color).flags(flags);
    }

    const elemGas = (name, color, flags) => {
        event.create(name).gas().element(GTElements.get(name)).color(color).flags(flags);
    }

    const polymerFluidPipe = (name, elements, color, pipe, flags) => {
            event.create(name).polymer().fluid().components(elements).color(color).flags(flags).fluidPipeProperties(pipe[0], pipe[1], pipe[2], pipe[3], pipe[4], pipe[5]);
    }

    const polymerFluid = (name, elements, color, flags) => {
            event.create(name).polymer().fluid().components(elements).color(color).flags(flags);
    }

    const conductor = (name, elements, color, icon, blasting, cable, flags) => {
        event.create(name).ingot().fluid().components(elements).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]).cableProperties(cable[0], cable[1], cable[2], cable[3]);
    }
    
    const conductorSuper = (name, elements, color, blasting, cable, rotorstat) => {
        if (blasting.includes(blasting[0])){
            event.create(name).ingot().fluid().components(elements).color(color).iconSet(SHINY).flags(foil, gear, long_rod, plates, rod, rotor, small_gear, ring, frame, fine_wire)
                .blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]).cableProperties(cable[0], cable[1], cable[2], cable[3]).rotorStats(rotorstat[0], rotorstat[1], rotorstat[2], rotorstat[3]);
        } else {
            event.create(name).ingot().fluid().components(elements).color(color).iconSet(SHINY).flags(foil, gear, long_rod, plates, rod, rotor, small_gear, ring, frame, fine_wire)
                .cableProperties(cable[0], cable[1], cable[2], cable[3]).rotorStats(rotorstat[0], rotorstat[1], rotorstat[2], rotorstat[3]);
        }
    }

    const compDustLiquidOre = (name, elements, color, flags) => {
        event.create(name).dust().liquid().ore(2, 1).components(elements).color(color).flags(flags);
    }
    
    const compDustOre = (name, elements, color, flags) => {
        event.create(name).dust().ore(2, 1).components(elements).color(color).flags(flags);
    }
    
    const compGemOre = (name, elements, color, icon) => {
        event.create(name).gem().ore(2, 1).components(elements).color(color).iconSet(icon);
    }

    const compIngotPlasma = (name, elements, color, icon, blasting, flags) => {
        event.create(name).ingot().fluid().plasma().components(elements).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
    }

    const compIngotPlasmaSecColor = (name, elements, color1, color2, icon, blasting, flags) => {
        event.create(name).ingot().fluid().plasma().components(elements).color(color1).secondaryColor(color2).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]);
    }

    const conductorPlasma = (name, elements, color, icon, blasting, cable, flags) => {
        event.create(name).ingot().fluid().plasma().components(elements).color(color).iconSet(icon).flags(flags).blastTemp(blasting[0], blasting[1], blasting[2], blasting[3]).cableProperties(cable[0], cable[1], cable[2], cable[3]);
    }

    const noCompFluid = (name, color) => {
        event.create(name).fluid().color(color);
    }

    const compPlasma = (name, temp, elements, color, flags) => {
        event.create(name).liquid(new GTFluidBuilder().temperature(temp)).plasma().components(elements).color(color).flags(flags);
    }
    // Materials

    elemIngotFluid('ronium', 0x1a0d00, DULL, [3000, 'highest', VA('ev'), 1800], [fine_wire,gear,rod,plates,long_rod,frame]);
});
