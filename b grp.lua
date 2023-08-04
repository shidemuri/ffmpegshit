-- DO NOT USE
-- game has anti remote event spam










-- open the dev console and keep it on autoscroll
--SIZE = 24x8 (character limit)
-- -padero
--[[if not isfile('videodata.txt') then
    print('downloading video data...')
    writefile('videodata.txt',game:HttpGet('https://onigirya.paderos-neko.shop/raw/videodata_tqFXXUWdobskhBG.txt'))
end]]

local BLACK = '.' --thanks for the shitty text filtering roblox
local WHITE = ','

local videodata = readfile('videodata248.txt') -- for the sake of simplicity
data = {}
for s in videodata:gmatch("[^\r\n]+") do
    table.insert(data, s)
end
local FRAME_SPEED = 30 --oh lord

local plr = game:GetService('Players').LocalPlayer
local chr = plr.Character or plr.CharacterAdded:Wait()

local ArtificialHB = Instance.new("BindableEvent")
ArtificialHB.Name = "Heartbeat"

local tf = 0
local allowframeloss = false
local tossremainder = false
local lastframe = tick()
local fram = 1/FRAME_SPEED
ArtificialHB:Fire()

local hb = game:GetService('RunService').Heartbeat:Connect(function(s, p) --allows for movie framerate consistency regardless of the local framerate, same reason why its used on serversided animation scripts
	tf = tf + s
	if tf >= fram then
		if allowframeloss then
			ArtificialHB:Fire()
			lastframe = tick()
		else
			for i = 1, math.floor(tf / fram) do
				ArtificialHB:Fire()
			end
			lastframe = tick()
		end
		if tossremainder then
			tf = 0
		else
			tf = tf - fram * math.floor(tf / fram)
		end
	end
end)

local slave = game.ReplicatedStorage.Remotes.BoothRemotes.Booth
fire = function(d)
    slave:FireServer('Edit_Booth', 'Description',workspace.Booths.Booth, d)
end
local getasset = syn and getsynasset or getcustomasset
local screengui = Instance.new('ScreenGui',game:GetService('CoreGui'))
local sound = Instance.new('Sound',screengui)
sound.Volume = 0.6
if getasset then
    if not isfile('badapple.mp3') then
        print('downloading sound file...')
        writefile('badapple.mp3',game:HttpGet('https://github.com/shidemuri/scripts/blob/main/badapple.mp3?raw=true'))
        repeat task.wait() until isfile('badapple.mp3')
    end
    repeat pcall(function() sound.SoundId = getasset('badapple.mp3') end) until pcall(function() sound.SoundId = getasset('badapple.mp3') end)
end

for _=0,30 do print('\n') end

print([[
    the sound file is clientsided (only the local player can hear), however, the "video" itself is serversided (others can see it)
    starting in 3 seconds...
]])

--task.wait(3)
sound:Play()
local stop=false
getgenv().STOP = function() stop = true end
for _,frame in ipairs(data) do
    local parsed = ""
    for z=1,#frame do
        local char = frame:sub(z,z)
        char = char == '0' and BLACK or char == "1" and WHITE
        parsed = parsed .. char
        if z%24==0 and z/(24*8)~=1 then parsed = parsed .. "\n" end --it says it cant EXCEED 200 characters but idk why but the actual limit is 199
    end
    fire(parsed)
    if stop == true then
        fire("")
        break;
    end
    ArtificialHB.Event:Wait()
end

ArtificialHB:Destroy()
hb:Disconnect()
screengui:Destroy()
stop = nil
getgenv().STOP = nil