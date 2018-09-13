# Format for encoding soundtracks in project neutrinolabs/soundtrack-creator

This document outlines the encoding format for soundtracks for storange in the Firestore database.

## General

Each soundtrack is a document containing multiple fields describing the soundtrack.

## Instruments

This soundtrack creator is inspired by Warframe's Octavia, so the three instrument categories correlate to those. The three instrument categories are Percussion, Bass, and Melody. The choices are stored in `/instruments/<percussion | bass | melody>` as a numerical ID representing the instrument chosen.

## Actual Song

The actual song will consist of 4 bars of 4 beats each in 16th notes, which gives a total of 64 notes. Each note can consist of up to 3 percussion notes, 4 bass notes, and 5 melody notes, giving a total of 12 boolean values. This gives a sequence of 64 chunks of 12 bits, which can be stored as a 96-byte sequence, which will be represented as a length 96 byte-string.