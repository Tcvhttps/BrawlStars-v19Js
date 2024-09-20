class Events {
    static eventarray = [
      {
        reward: 20,
        slotid: 0,
        id: 11,
        timer: 3600,
        Ended: false,
        tokensclaimed: []
      },
      {
        reward: 20,
        slotid: 1,
        id: 13,
        timer: 3600,
        Ended: false,
        tokensclaimed: []
      },
      {
        reward: 20,
        slotid: 2,
        id: 5,
        timer: 3600,
        Ended: false,
        tokensclaimed: []
      },
      {
        reward: 20,
        slotid: 3,
        id: 25,
        timer: 3600,
        Ended: false,
        tokensclaimed: []
      },
    ];
  
    getAllEvents() {
      return Events.eventarray;
    }
  
    addTokenById(slotID, id) {
      const event = Events.eventarray.find((e) => e.slotid === slotID);
      if (event) {
        event.tokensclaimed.push(id);
        return event;
      }
      return false;
    }
  
    getIdBySlotID(slotID) {
      const event = Events.eventarray.find((e) => e.slotid === slotID);
      if (event) {
        return event.id;
      }
      return null;
    }

    update() {
      const gemgrab = [7,8,9,10,11,12,31,40,41];
      const shd = [13,14,15,16,32, 33,43,45];
      const bounty = [0,1,2,3,4,5,6,54];
      const brawlboll = [24,25,26,50,51,52];
      Events.eventarray.forEach((event) => {

          switch (event.slotid) {
              case 0:
                  event.id = gemgrab[Math.floor(Math.random() * gemgrab.length)];
                  event.tokensclaimed = []
                  break;
              case 1:
                  event.id = shd[Math.floor(Math.random() * shd.length)];
                  event.tokensclaimed = []
                  break;
              case 2:
                  event.id = bounty[Math.floor(Math.random() * bounty.length)];
                  event.tokensclaimed = []
                  break;
              case 3:
                  event.id = brawlboll[Math.floor(Math.random() * brawlboll.length)];
                  event.tokensclaimed = []
                  break;
              default:
                  // handle unexpected slotid
                  break;
          }
      });
  }
  }

  module.exports = Events;
  