import { Volvo } from '../../imports/api/collections'

Meteor.methods({
    async Volvo_getPlates() {
        const plates = await Volvo.rawCollection().distinct('events.vehicle')
        return plates
    },
    async Volvo_getOnePlate(str) {
        //  db.market.find({}).sort({_id:-1}).limit(1)
        // db.products.find( { description: { $regex: /S/ } } )
     //   console.log(str);

        const plate = await Volvo.find({ 'events.vehicle': new RegExp(str, 'i') }, {  sort: { 'events.created':-1 } ,limit: 1}).fetch()

       // console.log(plate);
        
        return plate
    },
});

