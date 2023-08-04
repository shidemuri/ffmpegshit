
-- go to the middle of the skate park
-- SIZE: 30x16
-- -padero
if getgenv().STOP then getgenv().STOP() task.wait(1) end
local videodata = readfile('videodata_spray_paint.txt') -- for the sake of simplicity
data = {}
for s in videodata:gmatch("[^\r\n]+") do
    table.insert(data, s)
end
local FRAME_SPEED = 120 --oh lord

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



task.wait(0)
sound:Play()
local stop=false
getgenv().STOP = function() stop = true end
for _,frame in ipairs(data) do
    local y=1
    local pixdata = {}
    for row in frame:gmatch(('%d'):rep(60)) do
        for x=1,#row do
            table.insert(pixdata,{
                ["brushType"] = "Square",
                ["scale"] = 0.4,
                ["color"] = row[x] == '0' and Color3.new() or Color3.new(1,1,1),
                ["cframe"] = CFrame.new(Vector3.new(0.4*x, -7.964837074279785, (0.4*y)-30)),
                ["layer"] = 1,
                ["trans"] = 0
            })
            task.spawn(function() game:GetService("Players").LocalPlayer.Character.SprayPaint.SendPaintInfo:InvokeServer(tick()/300,pixdata,false,{}) end)
            ArtificialHB.Event:Wait()
            pixdata={}
        end
        y=y+1
    end
    if stop == true then
        break;
    end
end
for _=1,60 do
    task.spawn(function()
local args = {
    [1] = tick()/300,
    [2] = {
        [1] = {
            ["brushType"] = "Square",
            ["scale"] = 0.5,
            ["color"] = Color3.new(0, 0, 0),
            ["cframe"] = CFrame.new(Vector3.new(0.4*_, -7.964837074279785, -30)),
            ["layer"] = 1,
            ["trans"] = 0
        }
    },
    [3] = false,
    [4] = {}
}

game:GetService("Players").LocalPlayer.Character.SprayPaint.SendPaintInfo:InvokeServer(unpack(args))
end)
end

ArtificialHB:Destroy()
hb:Disconnect()
screengui:Destroy()
stop = nil
getgenv().STOP = nil