

















-- discarded
-- color changing takes too long





















-- open the dev console and keep it on autoscroll
--SIZE = 30x26 (community canvas is actually 30x27 but ffmpeg was bitching about the height)
-- -padero
if getgenv().STOP then getgenv().STOP() end
local videodata = readfile('videodata_pixel_drawing.txt') -- for the sake of simplicity
data = {}
for s in videodata:gmatch("[^\r\n]+") do
    table.insert(data, s)
end
local FRAME_SPEED = 20 --oh lord

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
    for row in frame:gmatch(('%d'):rep(30)) do
        for x=1,#row do
            local b = workspace.Map.CommunityGrid.CurrentColor
            local color = frame:sub(x,x) == '0' and BrickColor.new('Really black') or BrickColor.new('Institutional white')
            if game.Workspace.Map.CommunityGrid.Pixels[x..';'..y].BrickColor ~= color then 
                if b.BrickColor ~= color then
                    game.ReplicatedStorage.PixelEvent:FireServer('changeColor',workspace.Map.CommunityGrid.Colors[(frame:sub(x,x) == '0' and '10' or '11')], frame:sub(x,x) == '0' and Color3.new() or Color3.new(1,1,1))
                    b:GetPropertyChangedSignal('BrickColor'):Wait()
                end
                game.ReplicatedStorage.PixelEvent:FireServer('draw',game.Workspace.Map.CommunityGrid.Pixels[(x..';'..y)])
            end
        end
        task.wait()
        y=y+1
    end
    if stop == true then
        break;
    end
end

ArtificialHB:Destroy()
hb:Disconnect()
screengui:Destroy()
stop = nil
getgenv().STOP = nil