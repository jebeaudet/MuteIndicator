# Linux Mint global mute applet
## How to install
Just clone this repository and copy the directory to `~/.local/share/cinnamon/applets` and restart Cinnamon (`ALT+F2` -> `r` does that!). The applet should now be available in the Applets panel. Add it!

## How to use
By default, this applet binds `Super + m` to mute/unmute globally. You can also click on the applet to trigger the action. 

If the icon is green, you're not muted.

If the icon is red, you're muted globally!

## How does it work
Under the hood, it uses the command `amixer set Capture toggle` to toggle between muted and unmuted. If you do this command, the applet will get out of sync so beware!!
