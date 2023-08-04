-- open the dev console and keep it on autoscroll
--SIZE = 68x38 (roughly 16:9, looks 4:3 because of the font size)
-- -padero
if getgenv().STOP then getgenv().STOP() end
if not isfile('videodata_ascii.txt') then
    print('downloading video data...')
    writefile('videodata_ascii.txt',game:HttpGet('https://onigirya.paderos-neko.shop/raw/videodata_tqFXXUWdobskhBG.txt'))
end
local videodata = readfile('videodata_ascii.txt') -- ascii tonescale
data = {}
for s in videodata:gmatch("[^\r\n]+") do
    table.insert(data, s)
end
local FRAME_SPEED = 60

local plr = game:GetService('Players').LocalPlayer
local backpack = plr.Backpack
local chr = plr.Character or plr.CharacterAdded:Wait()
local boombox;

local boomboxes = {"SuperFlyGoldBoombox","BoomBox", 'BoomboxYellow'}
for _,v in ipairs(boomboxes) do
    boombox = backpack:FindFirstChild(v) or chr:FindFirstChild(v) or boombox
end

if not boombox then return print('no boombox, cant play') end

if boombox.Parent ~= chr then
    chr:FindFirstChildOfClass('Humanoid'):EquipTool(boombox)
end

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

local slave = boombox:FindFirstChildOfClass('RemoteEvent')
local scriptz = boombox:FindFirstChildOfClass('LocalScript',true)
local scriptdata = decompile(scriptz)
fire = function()end
if string.find(scriptdata, 'PenguinAttack') then
    fire = function(d)
        slave:FireServer('PlaySong',d)
    end
else
    fire = function(d)
        slave:FireServer(d)
    end
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
    the sound file is clientsided (only the local player can hear), however, the "video" itself is serversided (others can see in their dev console)
    starting in 3 seconds...
]])

task.wait(3)
sound:Play()
local stop=false
getgenv().STOP = function() stop = true end
for _,frame in ipairs(data) do
    local parsed = ""
    for z=1,#frame do
        local char = frame:sub(z,z)
        --char = char == '0' and "⬛" or char == "1" and "⬜"
        parsed = parsed .. char
        if z%68==0 then parsed = parsed .. "\n" end
    end
    parsed = [[
       

     
     

        
      
     
]] .. parsed .. [[

  


    - padero#3957 / padero (@NeighborlyBipbip) / github.com/shidemuri
     
         
     
    ]]
    if stop == true then
        fire("")
        break;
    end
    fire(parsed)
    ArtificialHB.Event:Wait()
end

ArtificialHB:Destroy()
hb:Disconnect()
screengui:Destroy()
stop = nil
getgenv().STOP = nil