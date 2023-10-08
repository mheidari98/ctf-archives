#ifndef __PROCESSOR_HEADER__
#define __PROCESSOR_HEADER__

#include <openssl/core.h>
#include <openssl/evp.h>
#include <openssl/param_build.h>
#include <openssl/bn.h>
#include <openssl/sha.h>
#include <openssl/rsa.h>
#include "jit.h"
#include "device.h"
#include "applet.h"
#include "snapshot.h"
#include "sandbox.h"

#define AUTHORITY_KEY_N "\xfd\xb3\x60\x3a\x75\x87\x62\x73\x6b\x0a\x2e\xba\x30\x13\xf9\x37\x28\x43\xf2\x3b\x93\xbf\x58\x3a\xcf\x73\x74\xa8\x5f\x42\x08\x78\x09\x0b\x98\x93\x63\x39\xf8\x2c\x1d\x24\xfd\x70\xce\x39\x8c\xac\x94\x12\x16\x92\x52\xd7\x91\xd4\xc2\x43\xa2\x57\xdb\x49\x84\x40\x3b\x88\x5a\x3a\x55\xd8\x02\xa2\x33\x72\x59\xbc\x68\xe8\x08\xb6\xf9\x9f\x14\x15\xed\x76\xf7\x14\xca\x28\x57\x11\xc2\x40\x4d\x73\x10\x4f\xcc\x6d\xce\x9a\x4c\x67\x35\x52\xf7\x8b\x5a\x4a\x03\x42\x82\x40\x78\x79\x2a\x83\xc6\x63\x5c\xe5\x80\xee\xf4\x8b\xa7\x2b\xd3\x29\xb3\xb4\xc2\xaf\xad\xe1\x09\xf5\x4c\x55\x68\x32\xf2\xf5\x2a\x4d\x75\x9b\xd0\x55\xc2\x75\x0b\xdd\x17\x14\x9f\x91\xbe\xa2\x8a\x0f\xfa\xda\x2b\x7a\xae\xbf\x77\x1f\xcb\x5c\xe3\x40\xf0\x61\xd6\x15\xef\x4a\x17\x2a\x59\x28\x9a\x63\xf1\xa4\x6a\xb9\x33\x28\xfb\x8b\xa6\x5e\x6d\xbd\x98\xed\x7a\x16\x11\xc6\x3b\x19\x55\x02\x17\x1d\x0d\x6f\x1b\x8f\x55\x72\x0c\x6a\xc4\x31\x41\x34\x02\x3c\x4c\xf7\x50\xc2\x1d\x11\xc8\x56\x86\xdd\x00\x1d\x0d\xb4\xd8\x51\xf7\x44\x1f\x44\x01\x57\x50\x63\x58\x5f\x1c\xdf\x0d\xea\xb4\xa7"

#define AUTHORITY_KEY_E "\x01\x00\x01\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00\x00"

#endif
