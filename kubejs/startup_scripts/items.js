StartupEvents.registry('item', event => {
  function item(name){event.create(name).texture('kubejs:item/'+name)}
  item('basic_circuit')
  item('advanced_circuit')
})
