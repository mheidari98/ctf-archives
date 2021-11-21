#!/bin/sh
timeout 60 qemu-system-x86_64  -m 512M  -kernel ./bzImage   -initrd  ./rootfs.img --append "loglevel=3 console=ttyS0 root=/dev/ram init=/init kaslr" -smp cores=2,threads=4 -cpu kvm64,+smep,+smap -monitor /dev/null -nographic