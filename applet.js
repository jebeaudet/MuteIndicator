const Applet = imports.ui.applet;
const Lang = imports.lang;
const Main = imports.ui.main;
const Mainloop = imports.mainloop;
const Util = imports.misc.util;

const UUID = 'MuteIndicator@jebeaudet.com';


MyApplet.prototype = {
    __proto__: Applet.IconApplet.prototype,
    
    _init: function(metadata, orientation, panel_height, instance_id) {
        try {
            global.log("Initializing MuteIndicator applet")
            Applet.IconApplet.prototype._init.call(this, orientation, panel_height, instance_id);
            this.uuid = UUID;
            
            this.set_applet_tooltip(_("Click to mute/unmute"));
            
            Main.keybindingManager.addHotKey("mute-indicator-shortcut-super-m", "<Super>m", Lang.bind(this, this.on_applet_clicked));
            Main.keybindingManager.addHotKey("mute-indicator-shortcut-pause", "Pause", Lang.bind(this, this.on_applet_clicked));
            this.set_not_muted_icon();
            this.is_audio_muted();
            
            this.refresh_loop();
            global.log("Done initializing MuteIndicator applet")
        } catch (e) {
            global.logError(e)
        }
    },
    
    refresh_loop: function() {
        this.is_audio_muted();
        Mainloop.timeout_add(1000, Lang.bind(this, this.refresh_loop));
    },

    is_audio_muted: function() {
        try {
            let cmd = [
                "bash",
                "-c",
                "amixer sget Capture"
                ];
            Util.spawn_async(cmd, (stdout) => {
                try{
                    if(stdout.toString().indexOf("] [on]") != -1){
                        this.set_not_muted_icon();
                    } else {
                        this.set_muted_icon();
                    }
                }catch(e){
                    global.logError(e);
                }
            });
        } catch (e) {
            global.logError(e);
        }
    },

    set_not_muted_icon: function() {
        this.current_icon = "not_muted";
        this.set_applet_icon_name("not_muted");
    },

    set_muted_icon: function() {
        this.current_icon = "muted";
        this.set_applet_icon_name("muted");
    },
    
    on_applet_clicked: function(event) {
        global.log("click")
        try{
            let cmd = [
                "bash",
                "-c",
                "amixer set Capture toggle"
            ];
            Util.spawn_async(cmd, (stdout) => {
                this.is_audio_muted();
        });
        }catch(e){
            global.logError(e);
        }
    }
};

function MyApplet(metadata, orientation, panel_height, instance_id) {
    this._init(metadata, orientation, panel_height, instance_id);
}

function main(metadata, orientation, panel_height, instance_id) {
    let myApplet = new MyApplet(metadata, orientation, panel_height, instance_id);
    return myApplet;
}