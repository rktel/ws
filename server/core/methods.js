import { Volvo } from '../../imports/api/collections'

Meteor.methods({
    async Volvo_getPlates() {
        const plates = await Volvo.rawCollection().distinct('events.vehicle')
        return plates
    },
    async Volvo_getOnePlate(str) {
        const plate = await Volvo.find({ 'events.vehicle': new RegExp(str, 'i') }, { sort: { 'events.created': -1 }, limit: 1 }).fetch()
        return plate
    },
    async Volvo_getRangePlate(str, start, end) {
        const range = await Volvo.find({ 'events.vehicle': new RegExp(str, 'i'), 'events.created': { $gte: start, $lte: end } }, { sort: { 'events.created': -1 } })
        return range
    }
});

