# Linux Mint global mute applet
## How to install
Just clone this repository and copy the directory to `~/.local/share/cinnamon/applets` and restart Cinnamon (`ALT+F2` -> `r` does that!). The applet should now be available in the Applets panel. Add it!

## How to use
By default, this applet binds `Super + m` and `Pause` to mute/unmute globally. You can also click on the applet to trigger the action. 

If the icon is green, you're not muted.

If the icon is red, you're muted globally!

## How does it work
Under the hood, it uses the command `amixer set Capture toggle` to toggle between muted and unmuted. The command is triggered by the `Super + m`/`Pause` shortcut. There's also a reconliation loop every second so if the command is executed from the shell directly, the applet will get in sync within the second to show you the real mute status.
