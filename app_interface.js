// Events triggered by App

var EVENTS = {
    READY: 'ready',
    RESUME: 'resume',
    PAUSE: 'pause',
    ORIENTATION: 'orientation'
};

// create events to be dispatched by app
var ready = new Event(EVENTS.READY);
var resume = new Event(EVENTS.RESUME);
var pause = new Event(EVENTS.PAUSE);
var orien = new Event(EVENTS.ORIENTATION);

var HotstarAppInterface = {

    /**
     * Close the Ad
     */
    close() {
        HotstarAndroid.close();
    },

    /**
     * Open a link in a browser
     * @param {string} URL - URL to open
     */
    open(URL) {
        HotstarAndroid.open(URL);
    },

    /**
     * Returns the Orientation of the device
     *
     * 1-Portrait, 2-Landscape
     */
    getOrientation() {
        console.log("getOrientation called");
        return HotstarAndroid.getOrientation();
    },

    /**
     * Returns the width of screen in pixels
     */
    getWidth() {
        var size = HotstarAndroid.getScreenSize();
        var width = parseInt(JSON.parse(size)[0]);
        return width;
    },

    /**
     * Returns the height of screen in pixels
     */
    getHeight() {
        var size = HotstarAndroid.getScreenSize();
        var height = parseInt(JSON.parse(size)[1]);
        return height;
    },

    /**
     * Register that click has occurred
     */
    click() {
        HotstarAndroid.registerClick();
    },

    /**
     * Register that the user is replaying the game
     */
    replay() {
        HotstarAndroid.registerReplay();
    }
}
