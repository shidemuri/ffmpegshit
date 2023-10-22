
--boombox video player
-- -padero

if getgenv().STOP then getgenv().STOP() task.wait(1) end
if not isfile('videodatae.txt') then return print('video data not found (make sure its inside the workspace folder)') end
local vdata = readfile('videodatae.txt')
data = vdata:split('\n')

local data2 = {}

for i,v in ipairs(data) do
    data[i] = {}
    local i2 = 1
    for v2 in string.gmatch(v,".") do
        data2[i][i2] = v2 == ',' and Color3.new(0,0,0) or Color3.new(1,1,1)
        i2 = i2+1
    end
end

local ArtificialHB = Instance.new("BindableEvent")
ArtificialHB.Name = "Heartbeat"

local tf = 0
local allowframeloss = false
local tossremainder = false
local lastframe = tick()
local fram = 1/20
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

local slave = game:GetService("ReplicatedStorage"):WaitForChild("Modules"):WaitForChild("ObjectCode"):WaitForChild("ClassProps"):WaitForChild("Art"):WaitForChild("PaintModel"):WaitForChild("RecolorPixel")
local canvas = workspace:WaitForChild("School"):WaitForChild("Interior"):WaitForChild("Rooms"):WaitForChild("Classrooms"):WaitForChild("Art"):WaitForChild("Activity_Easel"):WaitForChild("ArtCanvas")


for _=0,30 do print('\n') end

print([[
    starting in 3 seconds...
]])

task.wait(3)
--sound:Play()
local stop=false
getgenv().STOP = function() stop = true end
game:GetService("NetworkClient"):SetOutgoingKBPSLimit(math.huge)
local dt = 0
for _,frame in ipairs(data2) do
    if stop == true then
        break;
    end
    slave:FireServer(canvas,frame,true)
    ArtificialHB.Event:Wait()
end
--screengui:Destroy()
hb:Disconnect()
ArtificialHB:Destroy()
stop = nil
getgenv().STOP = nil