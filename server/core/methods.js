import { Volvo } from '../../imports/api/collections'

Meteor.methods({ 
    async Volvo_getPlates() {
        const plates = await Volvo.rawCollection().distinct('events.vehicle')
        return plates
    },
    async Volvo_getOnePlate(str) {
        //  db.market.find({}).sort({_id:-1}).limit(1)
        // db.products.find( { description: { $regex: /S/ } } )
        const plate = await Volvo.rawCollection().find({'events.vehicle': 'F3V841'}).sort({_id:-1}).limit(1).fetch()
        return plate
    },
});

