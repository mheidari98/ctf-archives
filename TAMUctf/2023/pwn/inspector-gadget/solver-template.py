from pwn import *

p = remote("tamuctf.com", 443, ssl=True, sni="inspector-gadget")
p.interactive()
