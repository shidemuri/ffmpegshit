-- Discrete Fourier Transform
local complex = {}
function complex.new(a,b)
    local comp = {}
    comp.re=a
    comp.im=b
    return comp
end
function complex.add(self,c)
    self.re = self.re+c.re
    self.im = self.im+c.im
end
function complex.mult(self,c)
    return complex.new(self.re*c.re-self.im*c.im,self.re*c.im-self.im*c.re)
end

function dft(x)
    local X = {}
    for k=1,#x do
        local sum = complex.new(0,0)
        for n=1,#x do
            local phi = (math.pi*2*k*n)/#x
            local c = complex.new(math.cos(phi),-math.sin(phi))
            complex.add(sum,complex.mult(x[n],c))
        end
        X[k]={re=sum.re/#x,im=sum.im/#x,freq=k,amp=math.sqrt(sum.re*sum.re+sum.im*sum.im),phase=math.atan2(sum.im,sum.re)}
    end
    return X
end