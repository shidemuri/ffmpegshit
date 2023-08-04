if getgenv().close then getgenv().close() end
local ws = syn.websocket.connect('ws://localhost:8080')
ws.OnMessage:Connect(function(frame)
    game.ReplicatedStorage.ws:FireServer(frame)
    print(#workspace.screenshare.SurfaceGui.TextLabel.Text)
    ws:Send('next')
end)
ws:Send('next')
getgenv().close = function()ws:Close() getgenv().close = nil end
ws.OnClose:Connect(function()getgenv().close = nil end)
--game.ReplicatedStorage.ws:FireServer(('⬛'):rep(66666))
--print(#'⬛')