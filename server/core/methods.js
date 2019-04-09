import { Volvo } from '../../imports/api/collections'

Meteor.methods({ 
    async Volvo_getPlates() {
        const plates = await Volvo.rawCollection().distinct('events.vehicle')
        return plates
    },
});

