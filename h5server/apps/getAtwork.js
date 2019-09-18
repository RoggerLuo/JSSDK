const {getAtworkInstance} = require('../utils/atwork_tool')
const config = require('../config')
function getAtwork() {
    return getAtworkInstance(config.ctx)
}
module.exports = getAtwork
    // {user_id,ticket}
    // .then(atworkInstance => {
    //     return atworkInstance.validateUserTicket(ticket,user_id)
    // })
