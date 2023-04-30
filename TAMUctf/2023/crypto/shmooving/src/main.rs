use rand::distributions::{Alphanumeric, DistString};
use rand::Rng;
use std::error::Error;

static SBOX: [u8; 256] = [
    0x63, 0x7C, 0x77, 0x7B, 0xF2, 0x6B, 0x6F, 0xC5, 0x30, 0x01, 0x67, 0x2B, 0xFE, 0xD7, 0xAB, 0x76,
    0xCA, 0x82, 0xC9, 0x7D, 0xFA, 0x59, 0x47, 0xF0, 0xAD, 0xD4, 0xA2, 0xAF, 0x9C, 0xA4, 0x72, 0xC0,
    0xB7, 0xFD, 0x93, 0x26, 0x36, 0x3F, 0xF7, 0xCC, 0x34, 0xA5, 0xE5, 0xF1, 0x71, 0xD8, 0x31, 0x15,
    0x04, 0xC7, 0x23, 0xC3, 0x18, 0x96, 0x05, 0x9A, 0x07, 0x12, 0x80, 0xE2, 0xEB, 0x27, 0xB2, 0x75,
    0x09, 0x83, 0x2C, 0x1A, 0x1B, 0x6E, 0x5A, 0xA0, 0x52, 0x3B, 0xD6, 0xB3, 0x29, 0xE3, 0x2F, 0x84,
    0x53, 0xD1, 0x00, 0xED, 0x20, 0xFC, 0xB1, 0x5B, 0x6A, 0xCB, 0xBE, 0x39, 0x4A, 0x4C, 0x58, 0xCF,
    0xD0, 0xEF, 0xAA, 0xFB, 0x43, 0x4D, 0x33, 0x85, 0x45, 0xF9, 0x02, 0x7F, 0x50, 0x3C, 0x9F, 0xA8,
    0x51, 0xA3, 0x40, 0x8F, 0x92, 0x9D, 0x38, 0xF5, 0xBC, 0xB6, 0xDA, 0x21, 0x10, 0xFF, 0xF3, 0xD2,
    0xCD, 0x0C, 0x13, 0xEC, 0x5F, 0x97, 0x44, 0x17, 0xC4, 0xA7, 0x7E, 0x3D, 0x64, 0x5D, 0x19, 0x73,
    0x60, 0x81, 0x4F, 0xDC, 0x22, 0x2A, 0x90, 0x88, 0x46, 0xEE, 0xB8, 0x14, 0xDE, 0x5E, 0x0B, 0xDB,
    0xE0, 0x32, 0x3A, 0x0A, 0x49, 0x06, 0x24, 0x5C, 0xC2, 0xD3, 0xAC, 0x62, 0x91, 0x95, 0xE4, 0x79,
    0xE7, 0xC8, 0x37, 0x6D, 0x8D, 0xD5, 0x4E, 0xA9, 0x6C, 0x56, 0xF4, 0xEA, 0x65, 0x7A, 0xAE, 0x08,
    0xBA, 0x78, 0x25, 0x2E, 0x1C, 0xA6, 0xB4, 0xC6, 0xE8, 0xDD, 0x74, 0x1F, 0x4B, 0xBD, 0x8B, 0x8A,
    0x70, 0x3E, 0xB5, 0x66, 0x48, 0x03, 0xF6, 0x0E, 0x61, 0x35, 0x57, 0xB9, 0x86, 0xC1, 0x1D, 0x9E,
    0xE1, 0xF8, 0x98, 0x11, 0x69, 0xD9, 0x8E, 0x94, 0x9B, 0x1E, 0x87, 0xE9, 0xCE, 0x55, 0x28, 0xDF,
    0x8C, 0xA1, 0x89, 0x0D, 0xBF, 0xE6, 0x42, 0x68, 0x41, 0x99, 0x2D, 0x0F, 0xB0, 0x54, 0xBB, 0x16,
];
static RCON: [u8; 11] = [
    0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36,
];

fn xtime(x: u8) -> u8 {
    (x << 1) ^ (((x >> 7) & 1) * 0x1b)
}
fn add_round_key(s: &mut [u8; 16], key: &[u8; 16]) {
    s.iter_mut().zip(key.iter()).for_each(|(s, k)| *s ^= k);
}
fn sub_bytes(s: &mut [u8; 16]) {
    s.iter_mut().for_each(|s| *s = SBOX[*s as usize]);
}
fn mix_columns(s: &mut [u8; 16]) {
    for s in s.chunks_exact_mut(4) {
        let t = s[0] ^ s[1] ^ s[2] ^ s[3];
        let old_s0 = s[0];
        s[0] ^= t ^ xtime(s[0] ^ s[1]);
        s[1] ^= t ^ xtime(s[1] ^ s[2]);
        s[2] ^= t ^ xtime(s[2] ^ s[3]);
        s[3] ^= t ^ xtime(s[3] ^ old_s0);
    }
}
fn shift_rows(s: &mut [u8; 16]) {
    for col in 0..4 {
        let (i0, i1, i2, i3) = (col, col + 4, col + 8, col + 12);
        for _ in 0..col {
            let t = s[i0];
            s[i0] = s[i1];
            s[i1] = s[i2];
            s[i2] = s[i3];
            s[i3] = t;
        }
    }
}
pub struct Aes128 {
    schedule: [[u8; 16]; 11],
}

impl Aes128 {
    pub fn new(key: &[u8; 16]) -> Self {
        let mut schedule = [[0u8; 16]; 11];

        schedule[0] = *key;

        // SAFETY: imagine checking invariants
        let w = unsafe { &mut *schedule.as_mut_ptr().cast::<[[u8; 4]; 44]>() };

        for i in 4..44 {
            let mut temp = w[i - 1];
            if i % 4 == 0 {
                temp.rotate_left(1);
                temp.iter_mut().for_each(|x| *x = SBOX[*x as usize]);
                temp[0] ^= RCON[i / 4];
            }
            temp.iter_mut()
                .zip(w[i - 4].iter())
                .for_each(|(t, w)| *t ^= *w);
            w[i] = temp;
        }

        Self { schedule }
    }
    fn blocks(blocks: &mut [u8]) -> impl Iterator<Item = &mut [u8; 16]> + '_ {
        assert_eq!(blocks.len() % 16, 0);
        blocks
            .chunks_exact_mut(16)
            .map(|block| block.try_into().unwrap())
    }
    pub fn encrypt(&self, plaintext: &mut [u8]) {
        for block in Self::blocks(plaintext) {
            add_round_key(block, &self.schedule[0]);
            for key in &self.schedule[1..10] {
                sub_bytes(block);
                shift_rows(block);
                // I never liked columns anyway
                // mix_columns(block);
                add_round_key(block, key);
            }
            sub_bytes(block);
            shift_rows(block);
            add_round_key(block, &self.schedule[10]);
        }
    }
}

type Result<T> = std::result::Result<T, Box<dyn Error>>;

fn get_line() -> Result<String> {
    let mut input = String::new();
    std::io::stdin().read_line(&mut input)?;
    input.pop();
    Ok(input)
}

fn main() -> Result<()> {
    let mut rng = rand::thread_rng();
    let cipher = Aes128::new(&rng.gen());
    let chall = Alphanumeric.sample_string(&mut rng, 32);
    let mut ciphertext = chall.clone().into_bytes();
    cipher.encrypt(&mut ciphertext);

    println!("Decrypt this for a flag:\n{}", hex::encode(&ciphertext));

    println!("I'll also encrypt whatever you want. Enter your blocks in hex:");
    let mut blocks = hex::decode(get_line()?)?;
    if blocks.len() > 2048 || blocks.len() % 16 != 0 {
        return Err("bad length".into());
    }
    cipher.encrypt(&mut blocks);
    println!("Here are your encrypted blocks:\n{}", hex::encode(&blocks));

    println!("What's your answer?");
    if get_line()? == chall {
        let flag = std::fs::read_to_string("flag.txt")?;
        println!("Nice work! Here's the flag:\n{flag}");
    } else {
        println!("That's not the right answer D:");
    }
    Ok(())
}
