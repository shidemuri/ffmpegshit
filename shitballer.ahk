#NoEnv
SendMode Input
SetWorkingDir %A_ScriptDir%

#Include <JSON>
FileRead owo, input.shitballspiano
uwu := JSON.Load(owo)

notes := StrSplit("zxcvbnmasdfghjqwertyu","")
uwu["_"] := ""

; Unfortunately, AutoHotkey doesn't support multiple threads (docs say so)
; So it can only play 1 track at a time (i plan on figuring it out soon)

TRACK := 0


WinGet proc, PID, Genshin Impact
WinActivate ahk_pid %proc%


for i,dwn in uwu["track" . TRACK][1] {
    if (i < uwu["track" . TRACK][1].Length()) 
        Sleep (dwn[1] - uwu["track" . TRACK][1][i-1][1])*1000
    for __,note in dwn[2]
        if (note between 1 and 21) and WinActive("ahk_pid" . proc) 
            Send % notes[note]
            WinSetTitle,% note
}


Numpad0::
WinSetTitle,ahk_pid %proc%,, Genshin Impact
ExitApp