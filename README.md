# pxt-iot-lora-node
[![Build Status](https://travis-ci.org/PiSupply/pxt-iot-lora-node.svg?branch=master)](https://travis-ci.org/PiSupply/pxt-iot-lora-node)

## Blocks

### Initialise LoRa Radio
```sig
IoTLoRaNode.initialiseRadio(
"Dev Address",
"NWSK",
"AppKey",
spreadingFactors.Seven
)
```

### Data Adders
These blocks add Data to the payload, the payload is a string variable which gets the correct byte values for the specified sensor with these blocks.
Each block can specifiy the "channel" that it is on, this is so when the decoder decodes it the sensor is on the same "channel" each time.
Each sensor should be on its own unique channel between one to nine.
#### Add Digital Value
```sig
IoTLoRaNode.digitalValue(false, channels.One)
```

#### Add Analogue Value
```sig
IoTLoRaNode.analogueValue(0, channels.One)
```

#### Add Temperature Value
```sig
IoTLoRaNode.tempertureValue(0, channels.One)
```

#### Add Light Value
```sig
IoTLoRaNode.lightValue(0, channels.One)
```

### Transmit LoRa Data
```sig
IoTLoRaNode.loraTransmitPayload()
```

## TODO

- [X] Add a reference for your blocks here
- [X] Add "icon.png" image (300x200) in the root folder
- [X] Add "- beta" to the GitHub project description if you are still iterating it.
- [X] Turn on your automated build on https://travis-ci.org
- [X] Use "pxt bump" to create a tagged release on GitHub
- [ ] Get your package reviewed and approved https://makecode.microbit.org/packages/approval

Read more at https://makecode.microbit.org/packages/build-your-own

## License



## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
