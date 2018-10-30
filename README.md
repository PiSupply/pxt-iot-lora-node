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
This block can add a digital value of either ```true``` or ```false```.

```sig
IoTLoRaNode.digitalValue(false, channels.One)
```
TTN will decode this value as a digital value of 1 or 0.

#### Add Analogue Value
This block can add an analogue value from `0` to `254`.

```sig
IoTLoRaNode.analogueValue(0, channels.One)
```
TTN Will decode this value as an analogue in with the decoded value displayed.

#### Add Temperature Value
This block will add an analogue value similar to the analogue value method. However once decoded will display in degrees C.

```sig
IoTLoRaNode.tempertureValue(0, channels.One)
```
TTN will decode this as a Degrees C value in the decoder.

#### Add Light Value
Similar to the Analogue & Temperature Values. This formats it as a light level value.
```sig
IoTLoRaNode.lightValue(0, channels.One)
```
TTN will decode this as a light level value in the decoder.

### Transmit LoRa Data
This block is then used to transmit the payload, when run it will transmit the entire payload in the buffer.

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
This library is released under the GNU GPL V3 License, you can view the full license in the LICENSE file.


## Meta

Tutorials: [Maker Zone Micro:bit Page](http://learn.pi-supply.com/make)

Questions? [Email us](mailto:sales@pi-supply.com)

Keywords: tinkerkit, GVS, Pi Supply

## Supported targets

* for PXT/microbit
(The metadata above is needed for package search.)
