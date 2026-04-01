const to_delete = [];

ServerEvents.recipes(event => {
    to_delete.forEach((item) => {
        event.remove({ output: item })
    });
})