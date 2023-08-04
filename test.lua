-- Decompiled by Valyse [ Made By (Co) ]
-- Path: Players.NeighborlyBipbip.PlayerScripts.MainHandler.PianoModule
local S_SoundService_1 = game:GetService("SoundService")
local S_Players_2 = game:GetService("Players")
local S_ReplicatedStorage_3 = game:GetService("ReplicatedStorage")
local S_RunService_4 = game:GetService("RunService")
local u1 = require(script.Parent.SynthModule)
local u2 = require(script.Parent.AssetRecycler)
local u3 = require(script.Parent.GuiModule)
local u4 = require(script.Parent.R6Module)
local u5 = require(script.Parent.RecordingModule)
local u6 = require(script.Parent.Handlers.SettingsHandler)
local L_PlayNotes_5 = S_ReplicatedStorage_3.Remotes:WaitForChild("PlayNotes")
local L_ReplicateSetting_6 = S_ReplicatedStorage_3.Remotes:WaitForChild("ReplicateSetting")
local u7 = require(S_ReplicatedStorage_3:WaitForChild("SoundFonts"))
local S_TweenService_7 = game:GetService("TweenService")
local u8 = S_Players_2.LocalPlayer
local u9 = {}
local u10 = {}
local u11 = {}
local v12 = {}
CreatePianoData = (function(a1)
if u9[a1] == nil then
if a1 < 0 then
if u9[a1 * -1] ~= nil then
local v1 = u9
end
end
v1.NotesDown = {}
v1.Sustained = {}
v1.Volume = 1
v1.Muted = false
v1.DefaultVelocity = 95
v1.Sustain = false
v1.InvertSustain = false
v1.Transpose = 0
v1.SoundFont = u7.New2
v1.ControlledPianos = {nil}
u9[a1] = v1
end
end)
v12.GetPianoData = (function(a1, a2)
if u9[a2] ~= nil then
return u9[a2]
end
end)
v12.SetPiano = (function(a1, a2, a3)
CreatePianoData(a2)
CreatePianoData(a2 * -1)
local v1, v2, v3 = pairs(a3)
for v4,v5 in v1 do
if table.find(u9[a2].ControlledPianos, v5) == nil then
local v6 = {}
table.insert(v6, v5)
end
end
local v7, v8, v9 = v1(v2)
for v10,v11 in v7 do
if table.find(a3, v11) == nil then
local v12 = {}
table.insert(v12, v11)
end
end
v7.ControlledPianos = a3
v7.ControlledPianos = a3
if a2 == v7 then
if v8 < v7 then
if v7 == 0 then
v8(v9)
v9(v10)
end
end
if v8 < v7 then
if v7 == v8 then
v8(v9)
v9(v10)
end
end
end
end)
CreateSound = (function(a1, a2, a3)
if a1 - 1 % 12 + 1 ~= 9 
else if a1 - 1 % 12 + 1 ~= 10 thenand a1 - 1 % 12 + 1 ~= 11 and a1 - 1 % 12 + 1 ~= 12 
else if a1 - 1 % 12 + 1 ~= 9 then
if a1 - 1 % 12 + 1 == 10 then
end
end
local v1 = u2:GetAsset()
local v2 = a3.Assets
v1.Name = v2[2 * a3.SoundFontData.AssetLength * a1 - 1 % 12(a1 / 12) + 1 + 2 - 0.5 - 1(a1 - 1 % 12 + 1 / 2)]
v2 = "rbxassetid://"
v1.SoundId = v2 .. a3.Assets[2 * a3.SoundFontData.AssetLength * a1 - 1 % 12(a1 / 12) + 1 + 2 - 0.5 - 1(a1 - 1 % 12 + 1 / 2)]
if a3.VelocityMaps ~= nil then
if a2 ~= nil then
if a2 <= 59 then
v2 = a3.VelocityMaps.40
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
else if a2 <= 69 then
v2 = a3.VelocityMaps.60
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
else if a2 <= 79 then
v2 = a3.VelocityMaps.70
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
else if a2 <= 84 then
v2 = a3.VelocityMaps.80
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
else if a2 <= 94 then
v2 = a3.VelocityMaps.85
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
else if a2 <= 104 then
v2 = a3.VelocityMaps.95
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
else if a2 <= 114 then
v2 = a3.VelocityMaps.105
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
else if 115 <= a2 then
v2 = a3.VelocityMaps.115
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
else if a3.Map ~= nil then
v2 = a3.Map
if v2[tostring(a1)] ~= nil then
v2 = a3.Map
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
end
end
else if a2 == nil then
if a3.VelocityMaps ~= nil then
v2 = a3.VelocityMaps.95
v2 = v2[tostring(a1)][1]
if v2 == nil then
v2 = 13205490121
end
v1.SoundId = "rbxassetid://" .. v2
end
end
u10[v1] = v2
v1.TimePosition = 0 + v2
return v1
end)
FadeNote = (function(a1, a2)
if not a2 then
local u1 = 0.6
end
local u2 = TweenInfo.new(u1)
if a1 ~= nil then
if u10[a1] ~= nil then
if u10[a1] < DateTime.now().UnixTimestampMillis - 200 then
end
local v3 = {Volume = 0}
local u4 = S_TweenService_7:Create(a1, u2, v3)
u4:Play()
task.delay(u1, (function()
a1:Stop()
if u4 ~= nil then
u4:Cancel()
end
u2:DestroyAsset(a1)
end))
end
end
else if a1 ~= nil then
u4(200 - DateTime.now().UnixTimestampMillis - u10[a1] / 1000, (function()
local u1 = S_TweenService_7:Create(a1, u2, v3)
u1:Play()
task.delay(u1, (function()
a1:Stop()
if u1 ~= nil then
u1:Cancel()
end
u2:DestroyAsset(a1)
end))
end))
end
end)
v12.ShiftTranspose = (function(a1, a2, a3)
CreatePianoData(a2)
if 16 > u9[a2].Transpose + a3 then
if u9[a2].Transpose + a3 < -16 then
end
return
end
v12:SetTranspose(a2, u9[a2].Transpose + a3)
end)
v12.ShiftVelocity = (function(a1, a2, a3)
print("Shift Velocity:" .. a3)
CreatePianoData(a2)
if 128 > u9[a2].DefaultVelocity + a3 then
if u9[a2].DefaultVelocity + a3 < 1 then
end
return
end
v12:SetVelocity(a2, u9[a2].DefaultVelocity + a3)
end)
v12.SetVelocity = (function(a1, a2, a3)
print("Set Velocity: " .. a3)
CreatePianoData(a2)
if a3 == nil then
end
u9[a2].DefaultVelocity = a3
if a2 == u8.UserId then
u3.SetVelocity(a3)
end
end)
v12.SetVolume = (function(a1, a2, a3)
CreatePianoData(a2)
u9[a2].Volume = a3
if 0 < a2 then
if u9[a2 * -1] ~= nil then
u9[a2 * -1].Volume = a3
end
end
if a2 == u8.UserId then
u3.SetVolume(a3)
end
end)
v12.SetMuted = (function(a1, a2, a3)
CreatePianoData(a2)
CreatePianoData(a2 * -1)
u9[a2].Muted = a3
if 0 < a2 then
if u9[a2 * -1] ~= nil then
u9[a2 * -1].Muted = a3
end
end
end)
v12.SetTranspose = (function(a1, a2, a3)
CreatePianoData(a2)
if a3 == nil then
end
u9[a2].Transpose = a3
if a2 == u8.UserId then
L_ReplicateSetting_6:FireServer("Transpose", a3)
u3.SetTransposition(a3)
end
end)
v12.SetSoundFont = (function(a1, a2, a3)
if u7[a3] == nil then
return
end
CreatePianoData(a2)
CreatePianoData(a2 * -1)
u9[a2].SoundFont = u7[a3]
if 0 < a2 then
if u9[a2 * -1] ~= nil then
u9[a2 * -1].SoundFont = u7[a3]
end
end
if a2 == u8.UserId then
L_ReplicateSetting_6:FireServer("SoundFont", a3)
end
end)
v12.ToggleSustain = (function(a1, a2, a3)
CreatePianoData(a2)
if a3 == nil then
end
if a3 then
end
u9[a2].Sustain = a3
if a2 ~= u8.UserId then
if a2 * -1 == u8.UserId then
end
L_ReplicateSetting_6:FireServer("Sustain", a3)
u5.RecordSustain(a3)
u3.SetSustain(a3)
end
else if a3 ~= true then
if u9[a2].InvertSustain then
end
else if a3 == true then
if u9[a2].InvertSustain then
end
local v1, v2, v3 = pairs(u9[a2].Sustained)
for v4,v5 in v1 do
if v5 then
if u9[a2].Sustained[v4] == v5 then
u9[a2].Sustained[v4] = nil
end
FadeNote(v5, 0.5)
u1.KeyUp(a2, v4, workspace:GetServerTimeNow() * 1000)
u3.KeyUp(a2, v4, workspace:GetServerTimeNow() * 1000)
local v6, v7, v8 = pairs(u9[a2].ControlledPianos)
for v9,v10 in v6 do
require(S_ReplicatedStorage_3.PianoAnimator:FindFirstChild("ExtraGrand")).KeyUp(v10, v4)
end
end
end
end
end
end)
v12.ApplyTranspose = (function(a1, a2, a3)
if u9[a2].Transpose + a3 < -14 then
else if 73 < -14 then
end
return 73
end)
v12.ToggleInvertSustain = (function(a1, a2, a3)
CreatePianoData(a2)
if a3 == nil then
end
if a3 then
end
u9[a2].InvertSustain = a3
if a2 == u8.UserId then
L_ReplicateSetting_6:FireServer("InvertSustain", a3)
u5.RecordInvertSustain(a3)
u3.SetInvertSustain(a3)
end
else if a3 ~= true then
if u9[a2].Sustain then
end
else if a3 == true then
if u9[a2].Sustain then
end
local v1, v2, v3 = pairs(u9[a2].Sustained)
for v4,v5 in v1 do
if v5 then
if u9[a2].Sustained[v4] == v5 then
u9[a2].Sustained[v4] = nil
end
FadeNote(v5, 0.5)
u1.KeyUp(a2, v4, workspace:GetServerTimeNow() * 1000)
u3.KeyUp(a2, v4, workspace:GetServerTimeNow() * 1000)
local v6, v7, v8 = pairs(u9[a2].ControlledPianos)
for v9,v10 in v6 do
require(S_ReplicatedStorage_3.PianoAnimator:FindFirstChild("ExtraGrand")).KeyUp(v10, v4)
end
end
end
end
end
end)
v12.NotesDown = (function(a1, a2, a3, a4)
else if a3 == nil then
warn("Notes Nil in Notes Down")
end
if a4 then
end
CreatePianoData(a2)
if a4 == nil then
end
local v1, v2, v3 = pairs(a3)
for v4,v5 in v1 do
local v6 = u9[a2].Muted
if v6 ~= true then
v6 = u9[a2].NotesDown[v5]
if v6 ~= nil then
v6 = v12
v6(a2, {v5}, true)
end
v6 = u9[a2].Sustained[v5]
if v6 ~= nil then
v6 = u9[a2].Sustained[v5]
u9[a2].Sustained[v5] = nil
FadeNote(v6, 0.5)
local v7 = workspace:GetServerTimeNow()
u1.KeyUp(a2, v5, v7 * 1000)
v7 = workspace
v7 = v7()
u3.KeyUp(a2, v5, v7 * 1000)
v7 = u9
local v8, v9, v10 = pairs(v7[a2].ControlledPianos)
for v11,v12 in v8 do
require(S_ReplicatedStorage_3.PianoAnimator:FindFirstChild("ExtraGrand")).KeyUp(v12, v5)
end
end
local v13 = u9
local u14 = v6(v8, v9, v10)
v8[v5] = u14
if a4 then
v13 = u9
if v9 ~= nil then
if a4 <= v9 then
else if a4 <= v9 then
v13 = 0.5
else if a4 <= v9 then
v13 = 0.15
else if a4 <= v9 then
v13 = 0.15
else if a4 <= v9 then
v13 = 0.1
else if a4 <= v9 then
v13 = 0.3
else if a4 <= v9 then
v13 = 0.1
else if v9 <= a4 then
v13 = 0.3
end
if v9 < v8 then
end
end
end
u14.Volume = v9
u14.Parent = v9
v9()
v9(v10, v11)
local u15 = v10[u14]
v10(v11)
end
end
if a2 ~= v1 then
if v1 == v2 then
end
else if a3 == nil then
v1(v2)
end
v1(v3, v4, v5)
local v16, v17, v18 = v1(v2)
for v19,v20 in v16 do
u14(v8, u15)
end
end
local v21, v22, v23 = v16(v17)
for v24,v25 in v21 do
local v26, v27, v28 = v8(u15)
for v29,v30 in v26 do
u14.KeyDown(v25, v30)
u4.KeyDown(a2, v25, v30)
end
end
local v31, v32, v33 = v21(v22)
for v34,v35 in v31 do
u14(v26, v27, v28)
u14(v26, v27, v28)
end
local v36, v37, v38 = v31(v32)
for v39,v40 in v36 do
local v41 = v26 .. v27 .. v28 .. v29
if a4 then
v41 = v26 .. v27 .. v28 .. v29
end
if v26 ~= nil then
v26.Text = v41
end
end
end)
v12.NotesUp = (function(a1, a2, a3, a4)
else if a3 == nil then
warn("Notes Nil in Notes Up")
end
CreatePianoData(a2)
if a4 ~= nil then
if a4 == false then
end
if u9[a2].Sustain == true then
if u9[a2].InvertSustain ~= false then
end
if u9[a2].Sustain == false then
if u9[a2].InvertSustain == true then
end
if a2 ~= u8.UserId then
if a2 * -1 == u8.UserId then
end
L_PlayNotes_5:FireServer(false, a3)
local v1, v2, v3 = pairs(a3)
for v4,v5 in v1 do
u5.RecordNoteDown(v5, 0)
end
end
local v6, v7, v8 = v1(v2)
for v9,v10 in v6 do
u9[a2].Sustained[v10] = u9[a2].NotesDown[v10]
u9[a2].NotesDown[v10] = nil
u1.KeyUp(a2, v10, workspace:GetServerTimeNow() * 1000)
u3.KeyUp(a2, v10, workspace:GetServerTimeNow() * 1000)
end
local v11, v12, v13 = v6(v7)
for v14,v15 in v11 do
local v16, v17, v18 = pairs(a3)
for v19,v20 in v16 do
require(S_ReplicatedStorage_3.PianoAnimator:FindFirstChild("ExtraGrand")).KeyUp(v15, v20)
u4.KeyUp(a2, v15, v20)
end
end
return
end
end
end
local v21, v22, v23 = v11(v12)
for v24,v25 in v21 do
local v26 = v16[v25]
if v26 ~= nil then
v26 = v16[v25]
v16[v25] = v17
v16(v17)
continue
end
end
if a2 ~= v21 then
if v21 == v22 then
end
v21(v23, v24)
local v27, v28, v29 = v21(v22)
for v30,v31 in v27 do
v26(v16, v17)
end
end
local v32, v33, v34 = v27(v28)
for v35,v36 in v32 do
local v37, v38, v39 = v16(v17)
for v40,v41 in v37 do
v26.KeyUp(v36, v41)
end
end
local v42, v43, v44 = v32(v33)
for v45,v46 in v42 do
v26(v37, v38, v39)
v26(v37, v38, v39)
end
end)
v12.Init = (function()
print("PM|Piano Module Init")
u2:Init()
L_PlayNotes_5.OnClientEvent:Connect((function(a1, a2, a3, a4)
if a3 == nil then
warn("Notes Nil in Piano Module 2")
end
if a1 ~= u8.UserId then
if a1 * -1 ~= u8.UserId then
if a2 then
v12:NotesDown(a1, a3, a4)
return
end
v12:NotesUp(a1, a3)
end
end
end))
L_ReplicateSetting_6.OnClientEvent:Connect((function(a1, a2, a3)
if a1 ~= u8.UserId then
if a1 * -1 ~= u8.UserId then
if a2 == "Sustain" then
CreatePianoData(a1)
v12:ToggleSustain(a1, a3)
return
end
else if a2 == "InvertSustain" then
v12:ToggleInvertSustain(a1, a3)
return
end
else if a2 == "Transpose" then
v12:SetTranspose(a1, a3)
return
end
else if a2 == "SoundFont" then
v12:SetSoundFont(a1, a3)
end
end
end
end))
S_RunService_4.RenderStepped:Connect((function(a1)
debug.profilebegin("NzUxMDI5OTk= Piano Queue")
local v1, v2, v3 = ipairs(u11)
for v4,v5 in v1 do
if 0 < #u11 - u6.GetSetting("MaxSounds") then
u11[v4] = nil
FadeNote(v5, 0)
continue
else if v5.Parent == nil then
u11[v4] = nil
continue
end
else if 1 ~= v4 then
u11[1] = v5
u11[v4] = nil
end
end
v1()
end))
end)
return v12
