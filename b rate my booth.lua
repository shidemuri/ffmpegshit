--SIZE = 24x8 (character limit)
-- -padero
--[[if not isfile('videodata.txt') then
    print('downloading video data...')
    writefile('videodata.txt',game:HttpGet('https://onigirya.paderos-neko.shop/raw/videodata_tqFXXUWdobskhBG.txt'))
end]]

if getgenv().STOP then getgenv().STOP() task.wait(1) end

local BLACK = '口' --thanks for the shitty text filtering roblox
local WHITE = '爹'

-- game:HttpGet('https://onigirya.paderos-neko.shop/raw/videodatae_UbFsLwESlqtdqLS.txt') --bad apple
-- game:HttpGet('https://onigirya.paderos-neko.shop/raw/videodatae_uzJIRZUyTExriLl.txt') -- rickroll
-- game:HttpGet('https://onigirya.paderos-neko.shop/raw/videodatae_vFJGrrdXjtaoBEX.txt') ankha minus8
-- game:HttpGet('https://onigirya.paderos-neko.shop/raw/videodatae_gRySZlsZXAHcMPm.txt') porn
local videodata = game:HttpGet('https://onigirya.paderos-neko.shop/raw/videodatae_vFJGrrdXjtaoBEX.txt') -- 0-1 tonescale
local data = {}
for s in videodata:gmatch("[^\r\n]+") do
    table.insert(data, s)
end
local FRAME_SPEED = 20 --oh lord

--[[local plr = game:GetService('Players').LocalPlayer
local backpack = plr.Backpack
local chr = plr.Character or plr.CharacterAdded:Wait()
local boombox;

local boomboxes = {'TextSign', 'Sign'}
for _,v in ipairs(boomboxes) do
    boombox = backpack:FindFirstChild(v) or chr:FindFirstChild(v) or boombox
end

if not boombox then return print('no text sign, cant play') end

if boombox.Parent ~= chr then
    chr:FindFirstChildOfClass('Humanoid'):EquipTool(boombox)
end]]

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

--[[local slave = boombox:FindFirstChildOfClass('RemoteEvent')
local scriptz = boombox:FindFirstChildOfClass('LocalScript',true)]]
fire = function(d)
    --pcall(function() game:GetService("ReplicatedStorage").OtherThingsEv:FireServer({'SignServer',game:GetService("Players").LocalPlayer.Character.TextSign,d}) end)
    --[[if boombox.Parent ~= chr then
        chr:FindFirstChildOfClass('Humanoid'):UnequipTools()
        chr:FindFirstChildOfClass('Humanoid'):EquipTool(boombox)
    end
    pcall(function() boombox.UpdateSign:FireServer(d) end)]]
    game:GetService("ReplicatedStorage").CustomiseBooth:FireServer("Update",{["DescriptionText"]=d,["ImageId"]=10333125119})
    --print(d, #d)
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


--task.wait(3)
local debug = {}
sound:Play()
local stop=false
getgenv().STOP = function() stop = true end
for _,frame in ipairs(data) do
    local parsed = frame:gsub('%|','\n')--[[""
    for z=1,#frame do
        local char = frame:sub(z,z)
        char = char == '0' and BLACK or char == "1" and WHITE or char
        parsed = parsed .. char
        if z%68==0 then parsed = parsed .. "\n" end
    end]]
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