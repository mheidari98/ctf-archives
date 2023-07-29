from random import randint
from Crypto.Util.number import inverse, bytes_to_long
from Crypto.Util.Padding import pad
from Crypto.Cipher import AES
from hashlib import sha256
import os

class PRNG:
    def __init__(self, mod):
        self.coeffs = [randint(1,mod) for _ in range(16)]
        self.mod = mod
        self.state = randint(1, mod)
    def next(self):
        self.state = sum(coeff * self.state**i for i,coeff in enumerate(self.coeffs)) % self.mod
        return self.state

q = 77897050769654696452572824710099972349639759246855689360228775736949644730457
p = 16158503035655503650357438344334975980222051334857742016065172713762327569433945446598600705761456731844358980460949009747059779575245460547544076193224141560315438683650498045875098875194826053398028819192033784138396109321309878080919047169238085235290822926018152521443787945770532904303776199561965192760957166694834171210342487393282284747428088017663161029038902829665513096354230157075129296432088558362971801859230928678799175576150822952201848806616643615613562842355410104862578550863465661734839271290328348967522998634183738667876030053003528149973545862146652611656961993385485831857222177076627368030677
g = 8986665761954289500303442250714013257267958541522625625218561169199279419042595142610100040988087502082590727136475698540201993746428470373168993292913039320311763660217801850784878564935450880018874371587199649965685742134884651107493812479234148805689664214460255588413695390568080942032263992785493208738282307168575867379095610792294961396770216272833435684440954774251862518243249608047971545524864083813237641522093309769070100469565960964654622352499351408269623653746705149014123772757153278180752939277436109738789404154406479625797746665884100327134640664657032784940498017583213619767216652249367376800156

x = randint(1, q - 1)
y = pow(g,x,p)

kPRNG = PRNG(q)

def hsh(msg):
    return bytes_to_long(sha256(msg).digest())

def sign(msg):
    k = kPRNG.next()
    r = pow(g,k,p) % q
    s = (inverse(k, q) * (hsh(msg) + x*r)) % q
    if r == 0 or s == 0:
        return sign(msg)
    return r,s

with open("quotes.txt") as f:
    for quote in f:
        quote = quote.strip().encode()
        print(sign(quote))

key = sha256(str(x).encode()).digest()
iv = os.urandom(16)
cipher = AES.new(key, AES.MODE_CBC, iv)
flag = open("flag.txt", "rb").read()
enc = cipher.encrypt(pad(flag,16))
print(enc.hex())
print(iv.hex())