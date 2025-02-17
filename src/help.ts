import { Help, Interfaces } from "@oclif/core";

export default class extends Help {
  showHelp(argv: string[]): Promise<void> {
    // args for showHelp ===  argv: string[]
    if (argv.length === 0) {
      return this.showCommandHelp(
        this.config.findCommand(this.config.pjson.oclif.default || "plex-dvr", {
          must: true,
        })
      );
    }

    return super.showHelp(argv);
  }

  showCommandHelp(command: Interfaces.Command) {
    console.info(`\u001B[1mPLEX DVR POSTPROCESSING\u001B[0m
=======================
This script accepts a transport stream as an argument [FILE] and does
the following:

1. Copies the original ts to a subdirectory within the system tmpdir
2. Runs \`comskip\` to find commercial boundaries*. If found, it
    a. Generates chapter boundaries at commercial breaks
3. Extracts closed captions as subtitles
4. Remuxes to mp4 to add chapter markers
5. Transcodes to mkv to compress and add subtitles
6. Cleans up after itself
    a. Deletes original ts
    b. Deletes temporary files
    c. Moves mkv to source directory (presumably .grab/)

It does all of this while respecting quiet hours and ensuring only one file is
being processed at a time. It also produces detailed logs on its own and adds
begin/end lines to the PMS logs. (maybe. hopefully.)


\u001B[1mPREREQUISITES\u001B[0m
ffmpeg: https://ffmpeg.org/
comskip: https://github.com/erikkaashoek/Comskip
ccextractor: https://github.com/CCExtractor/ccextractor
HandbrakeCLI: https://handbrake.fr/downloads.php

You can likely get some or all of these programs from your package manager.

\u001B[1mSETUP\u001B[0m

plex-dvr looks for your comskip.ini file at $HOME/.config/plex-dvr/comskip.ini
You can also save yourself some hassle and set any of the above options as
default in $HOME/.config/plex-dvr/config.json. They will be overwritten by CLI
options.
`);

    return super.showCommandHelp(command);
  }
}
