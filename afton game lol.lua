
--boombox video player
-- -padero

if getgenv().STOP then getgenv().STOP() task.wait(1) end
if not isfile('videodatae.txt') then return print('video data not found (make sure its inside the workspace folder)') end
local vdata = readfile('videodatae.txt')
data = vdata:split('\n')

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

print([[
    starting in 3 seconds...
]])

task.wait(3)
--sound:Play()
local stop=false
getgenv().STOP = function() stop = true end
game:GetService("NetworkClient"):SetOutgoingKBPSLimit(math.huge)
local dt = 0
for _,frame in ipairs(data) do
    local parsed = frame:gsub('%|','\n')
    --[[for z=1,#frame do                      REPLACED DUE TO EXTREME INEFFICIENCE (60fps -> 10 fps)
        local char = frame:sub(z,z)
        char = char == '|' and '\n' or char
        --char = char == '0' and "⬛" or char == "1" and "⬜"
        parsed = parsed .. char
    end]]
    if stop == true then
        break;
    end
    workspace.Size:FireServer({
        ["BodyDepthScale"] = game.Workspace.Yeet.TIMEOFDAY.Value,
        ["BodyHeightScale"] = {Value = 1},
        ["BodyWidthScale"] = {Value = 1},
        ["HumanoidDescription"] = {Value = 1},
        ["HeadScale"] = {Value = 1}
    },parsed)
    ArtificialHB.Event:Wait()
end
--screengui:Destroy()
hb:Disconnect()
ArtificialHB:Destroy()
stop = nil
getgenv().STOP = nil