--piano bosta
-- padero


if getgenv().STOP then getgenv().STOP() end

local input = 'input.shitballspiano'


assert(isfile(input),'cadê a porra do arquivo')
pcall(setfpscap, 9999)
--dps eu taco artificial heartbeat pra n precisar aumentar o fps
--o wait n é tão preciso em fps mais baixos

local http = game:GetService('HttpService')
local ran,data = pcall(http.JSONDecode,http,readfile(input))
if not ran then return print('tu cagou no arquivo brother') end

data['_'] = nil

local toignore = {
    1
}
for _,v in ipairs(toignore) do data['track'..v] = nil end



local r = getsenv(game:GetService("Players").LocalPlayer.PlayerGui.PianoGui.Main).PlayNoteClient
print(r)

local function HOLD(key)
    if key < 62 and key > 0 then r(key) end
end

local function RELEASE(key)

end




local stop = false

for _,v in pairs(data) do
    task.spawn(function()
        task.spawn(function()
            for i,h in ipairs(v[1]) do
                if stop then break end
                for __,v in ipairs(h[2]) do
                    task.spawn(HOLD,v)
                end
                task.wait(h[1]-(v[1][math.max(1,i-1)][1]))
            end
        end)
        task.spawn(function()
            for i,h in ipairs(v[2]) do
                if stop then break end
                for __,v in ipairs(h[2]) do
                    task.spawn(RELEASE,v)
                end
                task.wait(h[1]-(v[2][math.max(1,i-1)][1]))
            end
        end)
    end)
end

getgenv().STOP = function() stop = true print('stop')end