if getgenv().scr then getgenv().scr:Destroy() end

function Dragify(Frame)
	local dragToggle = nil
	local dragSpeed = 0.1
	local dragInput = nil
	local dragStart = nil
	local dragPos = nil
	local startPos = Frame.Position
	local function updateInput(input)
		local Delta = input.Position - dragStart
		local Position = UDim2.new(startPos.X.Scale, startPos.X.Offset + Delta.X, startPos.Y.Scale, startPos.Y.Offset + Delta.Y)
		Frame.Position = Position
	end
	Frame.InputBegan:Connect(function(input)
		if (input.UserInputType == Enum.UserInputType.MouseButton1 or input.UserInputType == Enum.UserInputType.Touch) and game:GetService("UserInputService"):GetFocusedTextBox() == nil then
			dragToggle = true
			dragStart = input.Position
			startPos = Frame.Position
			input.Changed:Connect(function()
				if input.UserInputState == Enum.UserInputState.End then
					dragToggle = false
				end
			end)
		end
	end)
	Frame.InputChanged:Connect(function(input)
		if input.UserInputType == Enum.UserInputType.MouseMovement or input.UserInputType == Enum.UserInputType.Touch then
			dragInput = input
		end
	end)
	game:GetService("UserInputService").InputChanged:Connect(function(input)
		if input == dragInput and dragToggle then
			updateInput(input)
		end
	end)
end

local scr = Instance.new('ScreenGui')
syn.protect_gui(scr)
scr.Name = 'koko wa chinpo ketsumanko mirarete miserate'
scr.Parent = cloneref(game:GetService("CoreGui"))
getgenv().scr = scr

local thing = Instance.new('Frame')
thing.Size = UDim2.new(0,200,0,200)
thing.BackgroundColor3 = Color3.new(.1,.1,.1)
thing.AnchorPoint = Vector2.new(0.5,0.5)
thing.Position = UDim2.new(0.5,0,0.5,0)
thing.Parent = scr
Dragify(thing)

local textbox = Instance.new('TextBox')
textbox.Size = UDim2.new(0,175,0,150)
--textbox.AnchorPoint = Vector2.new(0.5,0.5)
textbox.ClearTextOnFocus = false
textbox.TextXAlignment = Enum.TextXAlignment.Left
textbox.TextYAlignment = Enum.TextYAlignment.Top
textbox.Position = UDim2.new(0,10,0,10)
textbox.TextWrapped = true
textbox.MultiLine = true
textbox.Parent = thing

local b = Instance.new('TextButton')
b.Size = UDim2.new(1,0,0,30)
b.AnchorPoint = Vector2.new(0,1)
b.Position = UDim2.new(0,0,1,0)
b.Parent = thing
b.Activated:Connect(function()
    local args = {
        [1] = {["BodyDepthScale"]=workspace.Yeet.TIMEOFDAY.Value,["BodyTypeScale"]={Value=1},["BodyHeightScale"]={Value=1},["BodyProportionScale"]={Value=1},["BodyWidthScale"]={Value=1},["HeadScale"]={Value=1}},--game.Players.Littleluke123952.Character.Humanoid,
        [2] = textbox.Text
    }
    
    workspace:WaitForChild("Size"):FireServer(unpack(args))
end)