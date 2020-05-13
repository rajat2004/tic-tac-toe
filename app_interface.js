// Events triggered by App

var EVENTS = {
    READY: 'ready',
    RESUME: 'resume',
    PAUSE: 'pause',
    ORIENTATION: 'orientation'
};

var ready = new Event(EVENTS.READY);
var resume = new Event(EVENTS.RESUME);
var pause = new Event(EVENTS.PAUSE);
var orien = new Event(EVENTS.ORIENTATION);
